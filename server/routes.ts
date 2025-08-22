import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import cookieParser from 'cookie-parser';
import { db } from './db.js';
import { 
  insertContactSchema, 
  insertUserSchema,
  insertPageSchema,
  contacts,
  users,
  pages,
  formSubmissions,
  auditLog
} from "@shared/schema";
import type { 
  InsertContact, 
  InsertUser,
  InsertPage
} from "@shared/schema";
import { sendContactEmail, type ContactFormData } from './email.js';
import { 
  authenticate, 
  requireAdmin, 
  requireEditor, 
  hashPassword, 
  comparePassword, 
  generateToken,
  type AuthUser,
  type AuthRequest 
} from './auth.js';
import { eq, desc } from 'drizzle-orm';

// Add cookie parser middleware
export async function registerRoutes(app: Express): Promise<Server> {
  app.use(cookieParser());
  // === AUTHENTICATION ROUTES ===
  
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        role: user.role,
      };

      const token = generateToken(authUser);
      
      // Set HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Log audit trail
      await db.insert(auditLog).values({
        userId: user.id,
        action: 'login',
        entityType: 'user',
        entityId: user.id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json({ 
        success: true, 
        user: authUser,
        token 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie('authToken');
    res.json({ success: true });
  });

  // Get current user
  app.get("/api/auth/user", authenticate, (req: AuthRequest, res) => {
    res.json({ user: req.user });
  });

  // === CMS ADMIN ROUTES ===
  
  // Create default admin user if none exists
  app.post("/api/admin/setup", async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      // Check if any admin users exist
      const existingAdmins = await db
        .select()
        .from(users)
        .where(eq(users.role, 'admin'))
        .limit(1);

      if (existingAdmins.length > 0) {
        return res.status(400).json({ error: 'Admin user already exists' });
      }

      const hashedPassword = await hashPassword(password);
      
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role: 'admin',
        })
        .returning();

      res.json({ 
        success: true, 
        message: 'Admin user created successfully',
        userId: newUser.id 
      });
    } catch (error) {
      console.error('Setup error:', error);
      res.status(500).json({ error: 'Failed to create admin user' });
    }
  });

  // Contact form submission endpoint (updated to use database)
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save to database instead of memory
      const [newContact] = await db
        .insert(contacts)
        .values(validatedData)
        .returning();

      // Also save to form submissions for CMS
      await db.insert(formSubmissions).values({
        formType: 'contact',
        data: validatedData,
      });
      
      // Send email notification
      try {
        const emailData: ContactFormData = {
          name: validatedData.fullName,
          email: validatedData.email,
          phone: validatedData.phone || 'غير محدد',
          service: validatedData.projectType || 'غير محدد',
          message: validatedData.details
        };
        
        const emailSent = await sendContactEmail(emailData);
        
        if (emailSent) {
          console.log(`تم إرسال إيميل بنجاح للطلب: ${newContact.id}`);
        } else {
          console.error(`فشل إرسال الإيميل للطلب: ${newContact.id}`);
        }
      } catch (emailError) {
        console.error('خطأ في إرسال الإيميل:', emailError);
      }
      
      res.json({ 
        success: true, 
        message: "تم استلام طلبكم بنجاح وسيتم التواصل معكم قريباً", 
        contactId: newContact.id 
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "خطأ في البيانات المرسلة",
          errors: error.errors,
        });
      }
      
      res.status(500).json({
        success: false,
        message: "حدث خطأ في معالجة طلبكم، يرجى المحاولة مرة أخرى",
      });
    }
  });

  // Get all contacts endpoint (for admin use)
  app.get("/api/admin/contacts", authenticate, requireEditor, async (req: AuthRequest, res) => {
    try {
      const allContacts = await db
        .select()
        .from(contacts)
        .orderBy(desc(contacts.createdAt));

      res.json(allContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });

  // Get all form submissions
  app.get("/api/admin/form-submissions", authenticate, requireEditor, async (req: AuthRequest, res) => {
    try {
      const submissions = await db
        .select()
        .from(formSubmissions)
        .orderBy(desc(formSubmissions.createdAt));

      res.json(submissions);
    } catch (error) {
      console.error('Error fetching form submissions:', error);
      res.status(500).json({ error: 'Failed to fetch form submissions' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

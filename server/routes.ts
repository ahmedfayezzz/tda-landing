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
  siteSettings,
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

  // === PAGES MANAGEMENT ===
  
  // Get all pages
  app.get("/api/admin/pages", authenticate, requireEditor, async (req: AuthRequest, res) => {
    try {
      const allPages = await db
        .select()
        .from(pages)
        .orderBy(desc(pages.updatedAt));

      res.json(allPages);
    } catch (error) {
      console.error('Error fetching pages:', error);
      res.status(500).json({ error: 'Failed to fetch pages' });
    }
  });

  // Create new page
  app.post("/api/admin/pages", authenticate, requireEditor, async (req: AuthRequest, res) => {
    try {
      const pageData = {
        ...req.body,
        createdBy: req.user!.id,
        updatedBy: req.user!.id,
      };

      const [newPage] = await db
        .insert(pages)
        .values(pageData)
        .returning();

      // Log audit trail
      await db.insert(auditLog).values({
        userId: req.user!.id,
        action: 'create',
        entityType: 'page',
        entityId: newPage.id,
        newData: newPage,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json(newPage);
    } catch (error) {
      console.error('Error creating page:', error);
      res.status(500).json({ error: 'Failed to create page' });
    }
  });

  // Update page
  app.put("/api/admin/pages/:id", authenticate, requireEditor, async (req: AuthRequest, res) => {
    try {
      const pageId = req.params.id;
      
      // Get old page data for audit
      const [oldPage] = await db
        .select()
        .from(pages)
        .where(eq(pages.id, pageId))
        .limit(1);

      if (!oldPage) {
        return res.status(404).json({ error: 'Page not found' });
      }

      const updatedData = {
        ...req.body,
        updatedBy: req.user!.id,
        updatedAt: new Date(),
      };

      const [updatedPage] = await db
        .update(pages)
        .set(updatedData)
        .where(eq(pages.id, pageId))
        .returning();

      // Log audit trail
      await db.insert(auditLog).values({
        userId: req.user!.id,
        action: 'update',
        entityType: 'page',
        entityId: pageId,
        oldData: oldPage,
        newData: updatedPage,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json(updatedPage);
    } catch (error) {
      console.error('Error updating page:', error);
      res.status(500).json({ error: 'Failed to update page' });
    }
  });

  // === SITE SETTINGS ===
  
  // Get site settings
  app.get("/api/admin/settings", authenticate, requireEditor, async (req: AuthRequest, res) => {
    try {
      const settings = await db
        .select()
        .from(siteSettings)
        .orderBy(siteSettings.key);

      // Convert to key-value object
      const settingsObj = settings.reduce((acc, setting) => {
        let value: any = setting.value;
        if (setting.type === 'number') {
          value = Number(setting.value);
        } else if (setting.type === 'boolean') {
          value = setting.value === 'true';
        } else if (setting.type === 'json') {
          try {
            value = JSON.parse(setting.value);
          } catch (e) {
            value = setting.value;
          }
        }
        acc[setting.key] = { value, type: setting.type };
        return acc;
      }, {} as any);

      res.json(settingsObj);
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  });

  // Update site setting
  app.put("/api/admin/settings/:key", authenticate, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const { key } = req.params;
      const { value, type = 'string' } = req.body;

      let stringValue = value;
      if (type === 'json') {
        stringValue = JSON.stringify(value);
      } else {
        stringValue = String(value);
      }

      const [updatedSetting] = await db
        .insert(siteSettings)
        .values({
          key,
          value: stringValue,
          type,
        })
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: {
            value: stringValue,
            type,
            updatedAt: new Date(),
          },
        })
        .returning();

      // Log audit trail
      await db.insert(auditLog).values({
        userId: req.user!.id,
        action: 'update',
        entityType: 'setting',
        entityId: key,
        newData: { key, value: stringValue, type },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json(updatedSetting);
    } catch (error) {
      console.error('Error updating setting:', error);
      res.status(500).json({ error: 'Failed to update setting' });
    }
  });

  // === USERS MANAGEMENT ===
  
  // Get all users (admin only)
  app.get("/api/admin/users", authenticate, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const allUsers = await db
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          role: users.role,
          isActive: users.isActive,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .from(users)
        .orderBy(desc(users.createdAt));

      res.json(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  // Create new user (admin only)
  app.post("/api/admin/users", authenticate, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const { email, password, firstName, lastName, role = 'editor' } = req.body;

      const hashedPassword = await hashPassword(password);

      const [newUser] = await db
        .insert(users)
        .values({
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role,
        })
        .returning({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          role: users.role,
          isActive: users.isActive,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        });

      // Log audit trail
      await db.insert(auditLog).values({
        userId: req.user!.id,
        action: 'create',
        entityType: 'user',
        entityId: newUser.id,
        newData: newUser,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

  // === INITIALIZATION ENDPOINTS ===
  
  // Initialize default pages
  app.post("/api/admin/init-pages", authenticate, requireAdmin, async (req: AuthRequest, res) => {
    try {
      // Always clear and recreate pages for simplicity
      await db.delete(pages);

      // Create default pages
      const defaultPages = [
        {
          title: 'الصفحة الرئيسية',
          slug: 'home',
          content: `شركة التطور والتسارع التقنية - نحو مستقبل تقني متقدم

نحن شركة سعودية رائدة في مجال التقنية والبرمجة، نقدم حلولاً متقدمة ومبتكرة لعملائنا في جميع أنحاء المملكة.

خدماتنا تشمل:
• تطوير البرمجيات والتطبيقات
• تصميم وتطوير المواقع الإلكترونية  
• الاستشارات التقنية والحلول المتكاملة
• الدعم الفني والصيانة المستمرة

نسعى لأن نكون شريكك التقني الموثوق في رحلة التحول الرقمي`,
          metaTitle: 'شركة التطور والتسارع التقنية - TDA Solutions',
          metaDescription: 'شركة سعودية رائدة في مجال التقنية والبرمجة، نقدم حلولاً متقدمة ومبتكرة في تطوير البرمجيات والمواقع الإلكترونية',
          isPublished: true,
          createdBy: req.user!.id,
          updatedBy: req.user!.id,
        },
        {
          title: 'من نحن',
          slug: 'about',
          content: `شركة التطور والتسارع التقنية

رؤيتنا: أن نكون الشريك التقني الأول للشركات في المملكة العربية السعودية

رسالتنا: تقديم حلول تقنية متطورة ومبتكرة تساهم في التطور الرقمي والتحول التقني

قيمنا:
• الجودة والتميز في العمل
• الابتكار والإبداع التقني  
• الشفافية والمصداقية
• الالتزام بالمواعيد والجودة

نحن فريق من المطورين والمصممين المحترفين نعمل معاً لتحقيق أهدافكم التقنية`,
          metaTitle: 'من نحن - شركة التطور والتسارع التقنية',
          metaDescription: 'تعرف على شركة TDA Solutions ورؤيتنا ورسالتنا في تقديم حلول تقنية متطورة في السوق السعودي',
          isPublished: true,
          createdBy: req.user!.id,
          updatedBy: req.user!.id,
        },
        {
          title: 'خدماتنا',
          slug: 'services',
          content: `خدماتنا التقنية المتخصصة

تطوير البرمجيات:
• تطوير التطبيقات المخصصة
• تطوير تطبيقات الويب التفاعلية
• تطوير تطبيقات الجوال (iOS & Android)
• تطوير أنظمة إدارة المحتوى

تصميم وتطوير المواقع:
• تصميم مواقع احترافية متجاوبة
• تطوير متاجر إلكترونية متكاملة
• تحسين محركات البحث (SEO)
• صيانة وتطوير المواقع الموجودة

الاستشارات التقنية:
• استشارات التحول الرقمي
• تحليل وتطوير الأعمال
• استشارات الأمن السيبراني
• تدريب تقني متخصص

الدعم والصيانة:
• دعم فني على مدار الساعة
• صيانة دورية للأنظمة
• تحديثات أمنية مستمرة
• خدمات الاستضافة والنسخ الاحتياطي`,
          metaTitle: 'خدماتنا - شركة التطور والتسارع التقنية',
          metaDescription: 'اكتشف خدماتنا المتخصصة في تطوير البرمجيات وتصميم المواقع والاستشارات التقنية والدعم الفني',
          isPublished: true,
          createdBy: req.user!.id,
          updatedBy: req.user!.id,
        },
        {
          title: 'تواصل معنا',
          slug: 'contact',
          content: `تواصل مع فريق TDA

نحن هنا لمساعدتك في تحقيق أهدافك التقنية

معلومات التواصل:
📧 البريد الإلكتروني: info@tda.sa
📞 الهاتف: +966 50 123 4567
📍 العنوان: الرياض، المملكة العربية السعودية

أوقات العمل:
الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً
الجمعة - السبت: مغلق

احصل على استشارة مجانية:
يسعدنا تقديم استشارة مجانية لمناقشة مشروعك التقني وتقديم أفضل الحلول المناسبة لاحتياجاتك.

لا تتردد في التواصل معنا عبر أي من القنوات المذكورة أعلاه أو من خلال نموذج التواصل في الموقع.`,
          metaTitle: 'تواصل معنا - شركة التطور والتسارع التقنية',
          metaDescription: 'تواصل مع فريق TDA Solutions للحصول على استشارة مجانية وحلول تقنية مخصصة تناسب احتياجاتك',
          isPublished: true,
          createdBy: req.user!.id,
          updatedBy: req.user!.id,
        }
      ];

      const createdPages = await db.insert(pages).values(defaultPages).returning();

      // Log audit trail
      for (const page of createdPages) {
        await db.insert(auditLog).values({
          userId: req.user!.id,
          action: 'create',
          entityType: 'page',
          entityId: page.id,
          newData: page,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        });
      }

      res.json({ message: 'Default pages created successfully', pages: createdPages });
    } catch (error) {
      console.error('Error creating default pages:', error);
      res.status(500).json({ error: 'Failed to create default pages' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

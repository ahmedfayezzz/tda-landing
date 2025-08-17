import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";

// In-memory storage for contacts
const contacts: Array<InsertContact & { id: string; createdAt: Date }> = [];

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      const newContact = {
        id: crypto.randomUUID(),
        ...validatedData,
        createdAt: new Date(),
      };
      
      contacts.push(newContact);
      
      // In a real application, you might want to:
      // - Send an email notification
      // - Save to database
      // - Send to CRM system
      
      res.json({ 
        success: true, 
        message: "تم استلام طلبكم بنجاح", 
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
  app.get("/api/contacts", async (req, res) => {
    res.json(contacts);
  });

  const httpServer = createServer(app);
  return httpServer;
}

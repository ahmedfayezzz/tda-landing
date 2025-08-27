import nodemailer from 'nodemailer';
import { db } from './db.js';
import { emailSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';

// دالة لجلب إعدادات البريد من قاعدة البيانات
async function getEmailSettings() {
  const [settings] = await db
    .select()
    .from(emailSettings)
    .where(eq(emailSettings.isActive, true))
    .limit(1);
  
  return settings;
}

// إنشاء transporter باستخدام إعدادات قاعدة البيانات
async function createTransporter() {
  const settings = await getEmailSettings();
  
  if (!settings) {
    throw new Error('لا توجد إعدادات بريد إلكتروني نشطة في قاعدة البيانات');
  }

  const config = {
    host: settings.smtpHost,
    port: settings.smtpPort || 465,
    secure: settings.smtpSecure || true,
    auth: {
      user: settings.smtpUsername,
      pass: settings.smtpPassword
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  return nodemailer.createTransport(config);
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// دالة مخصصة لاختبار إعدادات الإيميل
export async function sendTestEmail(testEmail: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('بدء اختبار إعدادات SMTP...');
    
    // إنشاء transporter باستخدام إعدادات قاعدة البيانات
    const transporter = await createTransporter();
    const settings = await getEmailSettings();
    
    // التحقق من الاتصال أولاً
    await transporter.verify();
    console.log('تم التحقق من إعدادات SMTP بنجاح');

    const mailOptions = {
      from: `"${settings?.fromName} - اختبار النظام" <${settings?.fromEmail}>`,
      to: testEmail,
      subject: 'اختبار إعدادات البريد الإلكتروني - TDA Solutions',
      html: `
        <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <h2 style="color: #2563eb;">✅ اختبار ناجح!</h2>
          <p>تهانينا! إعدادات البريد الإلكتروني تعمل بشكل صحيح.</p>
          
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">تفاصيل الاختبار:</h3>
            <ul>
              <li>خادم SMTP: ${settings?.smtpHost}</li>
              <li>المنفذ: ${settings?.smtpPort} (${settings?.smtpSecure ? 'SSL' : 'TLS'})</li>
              <li>البريد المرسل: ${settings?.fromEmail}</li>
              <li>تاريخ الاختبار: ${new Date().toLocaleString('ar-SA')}</li>
            </ul>
          </div>
          
          <p>يمكنك الآن استخدام نموذج التواصل في الموقع بثقة!</p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            شركة التطور والتسارع التقنية - TDA Solutions<br>
            <a href="https://tda.sa" style="color: #4A246D;">www.tda.sa</a>
          </p>
        </div>
      `,
      text: `
✅ اختبار ناجح!

إعدادات البريد الإلكتروني تعمل بشكل صحيح.

تفاصيل الاختبار:
- خادم SMTP: smtp.zoho.com  
- المنفذ: 465 (SSL)
- البريد المرسل: support@tda.sa
- تاريخ الاختبار: ${new Date().toLocaleString('ar-SA')}

يمكنك الآن استخدام نموذج التواصل في الموقع بثقة!

---
شركة التطور والتسارع التقنية - TDA Solutions
www.tda.sa
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('تم إرسال الإيميل التجريبي بنجاح:', result.messageId);
    return { success: true };
    
  } catch (error) {
    console.error('فشل في إرسال الإيميل التجريبي:', error instanceof Error ? error.message : error);
    
    // محاولة مع إعدادات مختلفة
    try {
      console.log('محاولة إعادة الإرسال بإعدادات مختلفة (Port 587)...');
      const alternativeTransporter = nodemailer.createTransport({
        host: settings?.smtpHost,
        port: 587,
        secure: false,
        auth: {
          user: settings?.smtpUsername,
          pass: settings?.smtpPassword
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const mailOptions = {
        from: `"${settings?.fromName} - اختبار النظام" <${settings?.fromEmail}>`,
        to: testEmail,
        subject: 'اختبار إعدادات البريد الإلكتروني - TDA Solutions',
        text: `
✅ اختبار ناجح!

إعدادات البريد الإلكتروني تعمل بشكل صحيح (Port 587).

تاريخ الاختبار: ${new Date().toLocaleString('ar-SA')}

---
شركة التطور والتسارع التقنية - TDA Solutions
        `
      };

      await alternativeTransporter.sendMail(mailOptions);
      console.log('نجح الإرسال بإعدادات Port 587');
      return { success: true };
      
    } catch (alternativeError) {
      console.error('فشل في الإرسال بالإعدادات البديلة:', alternativeError instanceof Error ? alternativeError.message : alternativeError);
      
      let errorMessage = 'خطأ غير معروف';
      if (error instanceof Error) {
        if (error.message.includes('535 Authentication Failed')) {
          errorMessage = 'فشل في المصادقة - تحقق من اسم المستخدم وكلمة المرور';
        } else if (error.message.includes('ECONNREFUSED')) {
          errorMessage = 'فشل في الاتصال بخادم SMTP - تحقق من إعدادات الشبكة';
        } else if (error.message.includes('ENOTFOUND')) {
          errorMessage = 'لم يتم العثور على خادم SMTP - تحقق من عنوان الخادم';
        } else {
          errorMessage = error.message;
        }
      }
      
      return { success: false, error: errorMessage };
    }
  }
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    // إنشاء transporter باستخدام إعدادات قاعدة البيانات
    const transporter = await createTransporter();
    const settings = await getEmailSettings();
    
    if (!settings) {
      console.error('لا توجد إعدادات بريد إلكتروني نشطة');
      return false;
    }
    
    // التحقق من الاتصال أولاً
    await transporter.verify();
    console.log('تم التحقق من إعدادات SMTP بنجاح');

    const mailOptions = {
      from: `"${settings.fromName}" <${settings.fromEmail}>`,
      to: settings.fromEmail, // إرسال إلى نفس الإيميل
      subject: `طلب تواصل جديد من ${data.name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A246D; border-bottom: 2px solid #4A246D; padding-bottom: 10px;">
            طلب تواصل جديد
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2C5282; margin-top: 0;">بيانات العميل:</h3>
            
            <p><strong>الاسم:</strong> ${data.name}</p>
            <p><strong>البريد الإلكتروني:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>رقم الهاتف:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            <p><strong>الخدمة المطلوبة:</strong> ${data.service}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-right: 4px solid #A8D8A0; margin: 20px 0;">
            <h3 style="color: #2C5282; margin-top: 0;">الرسالة:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 14px;">
            <p>تم إرسال هذه الرسالة من موقع TDA Solutions</p>
            <p><a href="https://tda.sa" style="color: #4A246D;">www.tda.sa</a></p>
          </div>
        </div>
      `,
      // نسخة نصية للإيميل
      text: `
طلب تواصل جديد

الاسم: ${data.name}
البريد الإلكتروني: ${data.email}
رقم الهاتف: ${data.phone}
الخدمة المطلوبة: ${data.service}

الرسالة:
${data.message}

---
تم إرسال هذه الرسالة من موقع TDA Solutions
www.tda.sa
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('تم إرسال الإيميل بنجاح:', result.messageId);
    return true;
  } catch (error) {
    console.error('خطأ في إرسال الإيميل:', error instanceof Error ? error.message : error);
    
    // إذا فشل Port 465، جرب Port 587
    if ((error as any)?.code === 'EAUTH' || (error as any)?.code === 'ECONNECTION') {
      try {
        console.log('محاولة إعادة الإرسال بإعدادات مختلفة...');
        const alternativeTransporter = nodemailer.createTransport({
          host: 'smtp.zoho.com',
          port: 587,
          secure: false,
          auth: {
            user: 'support@tda.sa',
            pass: 'S2!p6@TT$!'
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const mailOptions = {
          from: '"TDA Solutions" <support@tda.sa>',
          to: 'info@tda.sa',
          subject: `طلب تواصل جديد من ${data.name}`,
          text: `
طلب تواصل جديد

الاسم: ${data.name}
البريد الإلكتروني: ${data.email}
رقم الهاتف: ${data.phone}
الخدمة المطلوبة: ${data.service}

الرسالة:
${data.message}

---
تم إرسال هذه الرسالة من موقع TDA Solutions
          `
        };

        await alternativeTransporter.sendMail(mailOptions);
        console.log('تم إرسال الإيميل بالإعدادات البديلة');
        return true;
      } catch (altError) {
        console.error('فشل في الإرسال بالإعدادات البديلة:', altError);
        return false;
      }
    }
    
    return false;
  }
}
import nodemailer from 'nodemailer';

// إعداد SMTP لـ Zoho Mail - تجربة إعدادات مختلفة
const createTransporter = () => {
  // تجربة Port 465 مع SSL
  const config1 = {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: 'support@tda.sa',
      pass: 'S2!p6@TT$!'
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  // تجربة Port 587 مع TLS
  const config2 = {
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
      user: 'support@tda.sa',
      pass: 'S2!p6@TT$!'
    },
    tls: {
      rejectUnauthorized: false
    },
    requireTLS: true
  };

  // البدء بالتكوين الأول
  return nodemailer.createTransport(config1);
};

const transporter = createTransporter();

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    // التحقق من الاتصال أولاً
    await transporter.verify();
    console.log('تم التحقق من إعدادات SMTP بنجاح');

    const mailOptions = {
      from: '"TDA Solutions" <support@tda.sa>',
      to: 'info@tda.sa',
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
    console.error('خطأ في إرسال الإيميل:', error);
    
    // إذا فشل Port 465، جرب Port 587
    if (error.code === 'EAUTH' || error.code === 'ECONNECTION') {
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
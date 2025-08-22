import nodemailer from 'nodemailer';

// إعداد SMTP لـ Zoho Mail
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false, // false for TLS on port 587
  auth: {
    user: 'support@tda.sa',
    pass: 'S2!p6@TT$!'
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  },
  requireTLS: true,
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
  debug: true // للتشخيص
});

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    const mailOptions = {
      from: 'support@tda.sa',
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
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('خطأ في إرسال الإيميل:', error);
    return false;
  }
}
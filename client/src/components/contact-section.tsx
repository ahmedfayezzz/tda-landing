import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, slideInLeftVariants, slideInRightVariants, fadeUpVariants } from "@/hooks/use-scroll-animation";

export default function ContactSection() {
  const { toast } = useToast();
  const { ref: titleRef, controls: titleControls } = useScrollAnimation(0.3);
  const { ref: formRef, controls: formControls } = useScrollAnimation(0.2);
  const { ref: contactInfoRef, controls: contactInfoControls } = useScrollAnimation(0.2);
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      projectType: "",
      details: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم إرسال طلبكم بنجاح",
        description: "سنتواصل معكم في أقرب وقت ممكن",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={fadeUpVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl lg:text-5xl font-bold text-tda-dark mb-6" 
            data-testid="heading-contact"
          >
            تواصل معنا
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto" 
            data-testid="text-contact-description"
          >
            نحن هنا لمساعدتكم في تحويل أفكاركم إلى واقع رقمي. تواصلوا معنا اليوم لبدء مشروعكم
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <motion.div 
            ref={formRef}
            initial="hidden"
            animate={formControls}
            variants={slideInLeftVariants}
            className="bg-gray-50 p-6 lg:p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-tda-dark mb-6" data-testid="heading-start-project">
              ابدأ مشروعك معنا
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="أدخل اسمك الكامل" 
                            {...field} 
                            data-testid="input-fullname"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your@email.com" 
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+966 5X XXX XXXX" 
                            {...field}
                            value={field.value || ""}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع المشروع</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                          <FormControl>
                            <SelectTrigger data-testid="select-project-type">
                              <SelectValue placeholder="اختر نوع المشروع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web">تطوير موقع ويب</SelectItem>
                            <SelectItem value="mobile">تطبيق جوال</SelectItem>
                            <SelectItem value="design">تصميم UI/UX</SelectItem>
                            <SelectItem value="branding">هوية بصرية</SelectItem>
                            <SelectItem value="support">دعم فني</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تفاصيل المشروع *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="اكتب تفاصيل مشروعك وأهدافك..." 
                          rows={5}
                          {...field}
                          data-testid="textarea-details"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-tda-accent text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all font-semibold text-lg"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-project"
                  >
                    {contactMutation.isPending ? "جاري الإرسال..." : "إرسال طلب المشروع"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            ref={contactInfoRef}
            initial="hidden"
            animate={contactInfoControls}
            variants={slideInRightVariants}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-tda-dark mb-6" data-testid="heading-contact-info">
                معلومات التواصل
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-reverse space-x-4">
                  <div className="bg-tda-accent/10 p-3 rounded-full shrink-0">
                    <Mail className="text-tda-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-tda-dark mb-1">البريد الإلكتروني</h4>
                    <p className="text-gray-600" data-testid="text-email-info">info@tda.sa</p>
                    <p className="text-gray-600" data-testid="text-email-support">support@tda.sa</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-reverse space-x-4">
                  <div className="bg-tda-accent/10 p-3 rounded-full shrink-0">
                    <Phone className="text-tda-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-tda-dark mb-1">أرقام التواصل</h4>
                    <p className="text-gray-600" dir="ltr" data-testid="text-phone-main">+966 11 XXX XXXX</p>
                    <p className="text-gray-600" dir="ltr" data-testid="text-phone-mobile">+966 50 XXX XXXX</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-reverse space-x-4">
                  <div className="bg-tda-accent/10 p-3 rounded-full shrink-0">
                    <MapPin className="text-tda-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-tda-dark mb-1">العنوان</h4>
                    <p className="text-gray-600" data-testid="text-address-country">المملكة العربية السعودية</p>
                    <p className="text-gray-600" data-testid="text-address-city">الرياض - المكتب الرئيسي</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold text-tda-dark mb-4" data-testid="heading-social-media">
                تابعونا
              </h4>
              <div className="flex space-x-reverse space-x-4">
                <a 
                  href="#" 
                  className="bg-tda-accent/10 p-3 rounded-full hover:bg-tda-accent hover:text-white transition-all"
                  data-testid="link-linkedin"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-tda-accent/10 p-3 rounded-full hover:bg-tda-accent hover:text-white transition-all"
                  data-testid="link-twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-tda-accent/10 p-3 rounded-full hover:bg-tda-accent hover:text-white transition-all"
                  data-testid="link-instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="bg-tda-accent/10 p-3 rounded-full hover:bg-tda-accent hover:text-white transition-all"
                  data-testid="link-facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

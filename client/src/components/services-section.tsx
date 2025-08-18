import { Code, Smartphone, Database, Shield, Settings, BarChart3, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainerVariants, childVariants, fadeUpVariants } from "@/hooks/use-scroll-animation";

export default function ServicesSection() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation(0.3);
  const { ref: servicesRef, controls: servicesControls } = useScrollAnimation(0.2);

  const services = [
    {
      icon: Code,
      title: "تطوير البرمجيات",
      description: "تصميم وتطوير تطبيقات ويب مخصصة وتطبيقات الهواتف المحمولة متوافقة مع iOS و Android"
    },
    {
      icon: Lightbulb,
      title: "استشارات تقنية",
      description: "تحليل نظم المعلومات وتقديم استراتيجيات التحول الرقمي لتحقيق الكفاءة التشغيلية"
    },
    {
      icon: Database,
      title: "أنظمة إدارة المحتوى (CMS)",
      description: "تطوير أنظمة إدارة المحتوى لتسهيل عمليات إدارة المعلومات والبيانات"
    },
    {
      icon: Settings,
      title: "تكامل الأنظمة",
      description: "ربط الأنظمة الداخلية والخارجية لضمان تدفق البيانات بسلاسة وكفاءة"
    },
    {
      icon: BarChart3,
      title: "حلول البيانات والتحليل",
      description: "تحويل البيانات إلى رؤى استراتيجية وتطوير تقارير ولوحات معلومات لدعم اتخاذ القرارات"
    },
    {
      icon: Shield,
      title: "الأمن السيبراني",
      description: "تقييم المخاطر وتنفيذ الحلول الأمنية لحماية البيانات والأنظمة من التهديدات"
    },
    {
      icon: Smartphone,
      title: "حلول مراكز القيادة والتحليل",
      description: "تصميم وتنفيذ أنظمة لعرض وتحليل البيانات في الوقت الفعلي لاتخاذ قرارات مدعومة"
    },
    {
      icon: Users,
      title: "خدمات الصيانة والدعم الفني",
      description: "صيانة البرمجيات ودعم فني متواصل يشمل التدريب والإرشاد للمستخدمين"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
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
            data-testid="heading-services"
          >
            خدماتنا
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto" 
            data-testid="text-services-description"
          >
            نطاق واسع من الحلول التقنية المبتكرة التي تدعم المؤسسات في تحقيق أهدافها
          </motion.p>
        </motion.div>
        
        <motion.div 
          ref={servicesRef}
          initial="hidden"
          animate={servicesControls}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                key={index} 
                variants={childVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg group cursor-pointer"
                data-testid={`service-card-${index}`}
              >
                <motion.div 
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-tda-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-tda-accent group-hover:text-white transition-all"
                >
                  <IconComponent size={24} className="text-tda-accent group-hover:text-white" />
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 1 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-bold text-tda-dark mb-4"
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-600 leading-relaxed"
                >
                  {service.description}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
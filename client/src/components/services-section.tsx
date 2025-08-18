import { Code, Palette, Brush, Headset } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainerVariants, childVariants, fadeUpVariants } from "@/hooks/use-scroll-animation";

export default function ServicesSection() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation(0.3);
  const { ref: servicesRef, controls: servicesControls } = useScrollAnimation(0.2);

  const services = [
    {
      icon: Code,
      title: "تطوير تطبيقات الويب والجوال",
      description: "تطوير منصات ويب قوية وقابلة للتوسع وتطبيقات موبايل عالية الجودة مع الاهتمام بأدق التفاصيل"
    },
    {
      icon: Palette,
      title: "تصميم واجهات وتجربة المستخدم",
      description: "تصميم واجهات مستخدم بديهية وتجارب مستخدم جذابة لضمان تفاعلات سلسة ورضا المستخدم"
    },
    {
      icon: Brush,
      title: "إنشاء العلامات التجارية والهويات",
      description: "تأسيس هوية علامة تجارية قوية ولا تُنسى من تصميم الشعارات إلى إرشادات العلامة التجارية"
    },
    {
      icon: Headset,
      title: "الدعم الفني للمواقع",
      description: "خدمات دعم فني شاملة لضمان استمرارية عمل مواقعكم وتطبيقاتكم بأعلى كفاءة ممكنة"
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
            وكالة برمجيات تقود وتلهم - نقدم حلولاً متكاملة تلبي جميع احتياجاتكم التقنية
          </motion.p>
        </motion.div>
        
        <motion.div 
          ref={servicesRef}
          initial="hidden"
          animate={servicesControls}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                className="bg-white p-8 rounded-2xl shadow-lg group cursor-pointer"
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
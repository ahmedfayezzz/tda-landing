import { Lightbulb, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, slideInLeftVariants, slideInRightVariants, staggerContainerVariants, childVariants } from "@/hooks/use-scroll-animation";
import aboutImage from "@assets/Gemini_Generated_Image_qrp34kqrp34kqrp3_1755536051661.png";
import AnimatedLogoPattern from "./animated-logo-pattern";

export default function AboutSection() {
  const { ref: contentRef, controls: contentControls } = useScrollAnimation(0.3);
  const { ref: imageRef, controls: imageControls } = useScrollAnimation(0.3);
  const { ref: featuresRef, controls: featuresControls } = useScrollAnimation(0.2);

  const features = [
    {
      icon: Lightbulb,
      title: "رؤية مبتكرة",
      description: "نحول الأفكار الطموحة إلى واقع رقمي ملموس بأحدث التقنيات"
    },
    {
      icon: Users,
      title: "فريق متخصص", 
      description: "مواهب مختارة بعناية ومطلعة على أحدث التوجهات التقنية العالمية"
    },
    {
      icon: Award,
      title: "جودة استثنائية",
      description: "نلتزم بأعلى معايير الجودة في كل مشروع نقوم بتنفيذه"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <AnimatedLogoPattern opacity={0.03} />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            ref={contentRef}
            initial="hidden"
            animate={contentControls}
            variants={slideInLeftVariants}
            className="space-y-8"
          >
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl lg:text-5xl font-bold text-tda-dark mb-6" 
                data-testid="heading-about-company"
              >
                عن شركة التطور والتسارع التقنية
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 leading-relaxed" 
                data-testid="text-company-description"
              >
                شركة سعودية رائدة في مجال التقنية نقدم أكثر من مجرد حلول برمجية. نحن صُنّاع الابتكار الذين نمزج بين الشغف والتفوق لإبداع حلول رقمية مصممة خصيصًا لتفوق توقعات عملائنا.
              </motion.p>
            </div>
            
            <motion.div 
              ref={featuresRef}
              initial="hidden"
              animate={featuresControls}
              variants={staggerContainerVariants}
              className="space-y-6"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={childVariants}
                  whileHover={{ x: 10, transition: { duration: 0.3 } }}
                  className="flex items-start space-x-reverse space-x-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-tda-accent/10 p-3 rounded-full shrink-0"
                  >
                    <feature.icon className="text-tda-accent" size={20} />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-tda-dark mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            ref={imageRef}
            initial="hidden"
            animate={imageControls}
            variants={slideInRightVariants}
            className="relative"
          >
            <motion.img 
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              src={aboutImage} 
              alt="Saudi technology team working on innovative solutions" 
              className="rounded-2xl shadow-lg"
            />
            
            {/* Stats overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 left-8 right-8 bg-white p-6 rounded-xl shadow-xl"
            >
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={staggerContainerVariants}
                className="grid grid-cols-3 gap-4 text-center"
              >
                <motion.div variants={childVariants}>
                  <motion.p 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-2xl font-bold text-tda-accent" 
                    data-testid="stat-completed-projects"
                  >
                    200+
                  </motion.p>
                  <p className="text-sm text-gray-600">مشروع مكتمل</p>
                </motion.div>
                <motion.div variants={childVariants}>
                  <motion.p 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl font-bold text-tda-accent" 
                    data-testid="stat-satisfied-clients"
                  >
                    50+
                  </motion.p>
                  <p className="text-sm text-gray-600">عميل راضي</p>
                </motion.div>
                <motion.div variants={childVariants}>
                  <motion.p 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-2xl font-bold text-tda-accent" 
                    data-testid="stat-years-experience"
                  >
                    5+
                  </motion.p>
                  <p className="text-sm text-gray-600">سنوات خبرة</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
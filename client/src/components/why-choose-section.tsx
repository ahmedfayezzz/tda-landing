import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainerVariants, childVariants, fadeUpVariants } from "@/hooks/use-scroll-animation";

export default function WhyChooseSection() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation(0.3);
  const { ref: leftColumnRef, controls: leftColumnControls } = useScrollAnimation(0.2);
  const { ref: rightColumnRef, controls: rightColumnControls } = useScrollAnimation(0.2);

  const features = [
    {
      number: 1,
      title: "نحلل ونتبع الأرقام وليس الافتراضات",
      description: "نعتمد على الأرقام لتحليل احتياجاتكم بدقة، ونستخدم البيانات لمساعدتكم في تحقيق أهدافكم بأفضل طريقة ممكنة"
    },
    {
      number: 2,
      title: "المرونة والبساطة",
      description: "نؤمن بالمرونة والعمل كفريق واحد مرن للوصول لأهدافكم والنجاح المشترك"
    },
    {
      number: 3,
      title: "جودة استثنائية",
      description: "نفخر بفريق من المواهب المختارة بعناية، مرتبطين بالمجتمعات التقنية العالمية ومطلعين على أحدث التوجهات"
    },
    {
      number: 4,
      title: "منهجية عمل احترافية",
      description: "نقدم مخرجات عمل محددة ومنهجية تعتمد على أفضل الممارسات في إدارة المشاريع لتقديم الحلول بأعلى جودة"
    }
  ];

  return (
    <section className="py-20 bg-white">
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
            data-testid="heading-why-choose"
          >
            لماذا TDA؟
          </motion.h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div 
            ref={leftColumnRef}
            initial="hidden"
            animate={leftColumnControls}
            variants={staggerContainerVariants}
            className="space-y-12"
          >
            {features.slice(0, 2).map((feature, index) => (
              <motion.div 
                key={feature.number} 
                variants={childVariants}
                whileHover={{ 
                  x: 10, 
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                className="flex items-start space-x-reverse space-x-6" 
                data-testid={`feature-${feature.number}`}
              >
                <motion.div 
                  initial={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-tda-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0"
                >
                  {feature.number}
                </motion.div>
                <div>
                  <motion.h3 
                    initial={{ opacity: 1 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold text-tda-dark mb-3"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-600 leading-relaxed"
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            ref={rightColumnRef}
            initial="hidden"
            animate={rightColumnControls}
            variants={staggerContainerVariants}
            className="space-y-12"
          >
            {features.slice(2, 4).map((feature, index) => (
              <motion.div 
                key={feature.number} 
                variants={childVariants}
                whileHover={{ 
                  x: 10, 
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                className="flex items-start space-x-reverse space-x-6" 
                data-testid={`feature-${feature.number}`}
              >
                <motion.div 
                  initial={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-tda-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0"
                >
                  {feature.number}
                </motion.div>
                <div>
                  <motion.h3 
                    initial={{ opacity: 1 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold text-tda-dark mb-3"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-600 leading-relaxed"
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
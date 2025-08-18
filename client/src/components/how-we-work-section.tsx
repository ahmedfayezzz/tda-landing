import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainerVariants, childVariants, fadeUpVariants } from "@/hooks/use-scroll-animation";

export default function HowWeWorkSection() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation(0.3);
  const { ref: stepsRef, controls: stepsControls } = useScrollAnimation(0.2);

  const steps = [
    {
      number: 1,
      title: "فهم احتياجاتكم",
      description: "نبدأ بفهم عميق لاحتياجاتكم وأهدافكم لضمان تحقيق رؤية واضحة",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 2,
      title: "التخطيط الاستراتيجي",
      description: "نضع خطة عمل مدروسة تشمل الخطوات الأساسية لتحقيق أهدافكم بنجاح",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 3,
      title: "التصميم والتطوير",
      description: "نقوم بتصميم وتطوير حلول مبتكرة وفق أحدث المعايير لضمان جودة عالية",
      image: "https://images.unsplash.com/photo-1600880292154-2651d81ff0e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 4,
      title: "الاختبار والتحسين",
      description: "نجري اختبارات شاملة للمنتج ونحسن أي جوانب لضمان الأداء الأمثل",
      image: "https://images.unsplash.com/photo-1600880292533-bb5739e737ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 5,
      title: "التسليم والدعم",
      description: "نقدم الحل النهائي ونتأكد من تقديم الدعم المستمر لضمان نجاح طويل الأمد",
      image: "https://images.unsplash.com/photo-1600880292593-2e5cd1b8d6b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    }
  ];

  return (
    <section id="work" className="py-20 bg-gray-50">
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
            data-testid="heading-how-we-work"
          >
            كيف نعمل
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto" 
            data-testid="text-work-description"
          >
            منهجية عمل مدروسة تضمن تحقيق أهدافكم بأعلى جودة وفي الوقت المحدد
          </motion.p>
        </motion.div>
        
        <motion.div 
          ref={stepsRef}
          initial="hidden"
          animate={stepsControls}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={step.number} 
              variants={childVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              className="text-center group cursor-pointer" 
              data-testid={`work-step-${step.number}`}
            >
              <div className="relative mb-6">
                <motion.div
                  initial={{ scale: 1, rotateY: 0 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-xl"
                >
                  <motion.img 
                    src={step.image} 
                    alt={step.title}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tda-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
                <motion.div 
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-tda-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg"
                >
                  {step.number}
                </motion.div>
              </div>
              <motion.h3 
                initial={{ opacity: 1 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-bold text-tda-dark mb-2"
              >
                {step.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, y: -2 }}
                transition={{ duration: 0.2 }}
                className="text-gray-600 text-sm"
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
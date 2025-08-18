import { motion } from "framer-motion";
import { useScrollAnimation, staggerContainerVariants, childVariants, fadeUpVariants } from "@/hooks/use-scroll-animation";
import AnimatedLogoPattern from "./animated-logo-pattern";

export default function PortfolioSection() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation(0.3);
  const { ref: portfolioRef, controls: portfolioControls } = useScrollAnimation(0.2);

  const projects = [
    {
      title: "منصة التجارة الإلكترونية",
      description: "منصة متكاملة للتجارة الإلكترونية مع نظام إدارة متطور ومتجر عصري",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "تطبيق الخدمات الذكية",
      description: "تطبيق جوال متطور لإدارة الخدمات مع واجهة مستخدم بديهية وسهلة",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
      technologies: ["Flutter", "Firebase", "UI/UX"]
    },
    {
      title: "موقع شركة عالمية",
      description: "موقع إلكتروني متطور لشركة عالمية بتصميم عصري ومحتوى تفاعلي",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
      technologies: ["WordPress", "PHP", "MySQL"]
    },
    {
      title: "هوية بصرية متكاملة",
      description: "تصميم هوية بصرية شاملة تتضمن الشعار والألوان ودليل الاستخدام",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
      technologies: ["Branding", "Logo Design", "Guidelines"]
    },
    {
      title: "لوحة تحكم تحليلية",
      description: "نظام تحليل البيانات المتقدم مع لوحات تحكم تفاعلية ومرئية",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
      technologies: ["Vue.js", "Python", "PostgreSQL"]
    },
    {
      title: "منصة تعليمية تفاعلية",
      description: "منصة تعليم إلكتروني متطورة مع أدوات تفاعلية ونظام إدارة التعلم",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxواG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
      technologies: ["Angular", "Laravel", "LMS"]
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-white relative overflow-hidden">
      <AnimatedLogoPattern opacity={0.08} />
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
            data-testid="heading-portfolio"
          >
            أعمالنا
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto" 
            data-testid="text-portfolio-description"
          >
            مجموعة مختارة من مشاريعنا المتميزة التي تعكس خبرتنا وابتكارنا
          </motion.p>
        </motion.div>
        
        <motion.div 
          ref={portfolioRef}
          initial="hidden"
          animate={portfolioControls}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={childVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              className="bg-gray-50 rounded-2xl overflow-hidden group cursor-pointer"
              data-testid={`portfolio-project-${index}`}
            >
              <div className="relative overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <motion.div 
                initial={{ opacity: 1 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="p-4 lg:p-6"
              >
                <motion.h3 
                  initial={{ opacity: 1 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-bold text-tda-dark mb-2"
                >
                  {project.title}
                </motion.h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="bg-tda-accent/10 text-tda-accent px-3 py-1 rounded-full text-sm"
                      data-testid={`technology-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-tda-accent text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all font-semibold"
            data-testid="button-view-more-projects"
          >
            عرض المزيد من الأعمال
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
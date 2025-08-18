import { motion } from 'framer-motion';
import { useScrollAnimation, slideInLeftVariants, slideInRightVariants } from '@/hooks/use-scroll-animation';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const { ref: contentRef, controls: contentControls } = useScrollAnimation(0.3, true);
  const { ref: imageRef, controls: imageControls } = useScrollAnimation(0.3, true);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-tda-dark via-tda-medium to-gray-800"></div>
      <div className="absolute inset-0 gradient-overlay"></div>
      
      {/* Animated floating geometric shapes */}
      <motion.div 
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.0, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-20 left-20 w-32 h-32 bg-tda-accent/10 rounded-full animate-float"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0, rotate: 45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-20 right-20 w-24 h-24 bg-tda-accent/20 rounded-lg animate-float" 
        style={{animationDelay: '2s'}}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            ref={contentRef}
            initial="hidden"
            animate={contentControls}
            variants={slideInLeftVariants}
            className="text-white space-y-8"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl lg:text-6xl font-bold leading-tight"
            >
              ننشئ، <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-tda-accent"
              >
                نبتكر
              </motion.span>، <br/>
              نتواصل، <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-tda-accent"
              >
                نطور
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl text-gray-300 leading-relaxed"
            >
              شركة التطور والتسارع التقنية - نمزج التقنية بالإبداع لنخلق منتجات وبرمجيات استثنائية تحول أفكارك إلى واقع رقمي مبهر
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button 
                onClick={() => scrollToSection('contact')} 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-tda-accent text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all font-semibold text-center shadow-lg"
                data-testid="button-start-project"
              >
                ابدأ مشروعك الآن
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('services')} 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-tda-dark transition-all font-semibold text-center"
                data-testid="button-explore-services"
              >
                استكشف خدماتنا
              </motion.button>
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
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" 
              alt="Saudi technology professionals workspace" 
              className="rounded-2xl shadow-2xl"
            />
            <motion.div 
              initial={{ opacity: 0, x: -60, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-reverse space-x-4">
                <motion.div 
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  className="bg-tda-accent/10 p-3 rounded-full"
                >
                  <svg className="w-6 h-6 text-tda-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7V10C2 16 6 21.5 12 23C18 21.5 22 16 22 10V7L12 2Z"/>
                  </svg>
                </motion.div>
                <div>
                  <p className="font-semibold text-tda-dark" data-testid="text-projects-completed">200+ مشروع مكتمل</p>
                  <p className="text-gray-600 text-sm" data-testid="text-satisfied-clients">عملاء راضون حول العالم</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

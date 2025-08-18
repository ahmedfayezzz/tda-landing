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
      
      {/* Animated floating geometric shapes - Hidden on mobile for better performance */}
      <motion.div 
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.0, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-10 left-4 sm:top-20 sm:left-20 w-16 h-16 sm:w-32 sm:h-32 bg-tda-accent/10 rounded-full animate-float hidden sm:block"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0, rotate: 45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-10 right-4 sm:bottom-20 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-tda-accent/20 rounded-lg animate-float hidden sm:block" 
        style={{animationDelay: '2s'}}
      ></motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen lg:min-h-0">
          <motion.div 
            ref={contentRef}
            initial="hidden"
            animate={contentControls}
            variants={slideInLeftVariants}
            className="text-white space-y-6 lg:space-y-8 text-center lg:text-right pt-20 lg:pt-0"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
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
              className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              شركة التطور والتسارع التقنية - نمزج التقنية بالإبداع لنخلق منتجات وبرمجيات استثنائية تحول أفكارك إلى واقع رقمي مبهر
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button 
                onClick={() => scrollToSection('contact')} 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-tda-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-opacity-90 transition-all font-semibold text-center shadow-lg text-sm sm:text-base"
                data-testid="button-start-project"
              >
                ابدأ مشروعك الآن
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('services')} 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white hover:text-tda-dark transition-all font-semibold text-center text-sm sm:text-base"
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
              src="/attached_assets/Gemini_Generated_Image_fqxrkfqxrkfqxrkf_1755533943852.png" 
              alt="Digital innovation and technology connectivity" 
              className="rounded-2xl shadow-2xl w-full h-auto"
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

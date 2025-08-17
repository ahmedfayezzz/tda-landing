export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-tda-dark via-tda-medium to-gray-800"></div>
      <div className="absolute inset-0 gradient-overlay"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-tda-accent/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-tda-accent/20 rounded-lg animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 animate-fadeInUp">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              ننشئ، <span className="text-tda-accent">نبتكر</span>، <br/>
              نتواصل، <span className="text-tda-accent">نطور</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              شركة التطور والتسارع التقنية - نمزج التقنية بالإبداع لنخلق منتجات وبرمجيات استثنائية تحول أفكارك إلى واقع رقمي مبهر
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contact')} 
                className="bg-tda-accent text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all font-semibold text-center shadow-lg"
                data-testid="button-start-project"
              >
                ابدأ مشروعك الآن
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-tda-dark transition-all font-semibold text-center"
                data-testid="button-explore-services"
              >
                استكشف خدماتنا
              </button>
            </div>
          </div>
          
          <div className="relative animate-slideInRight">
            <img 
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional technology workspace" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="bg-tda-accent/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-tda-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7V10C2 16 6 21.5 12 23C18 21.5 22 16 22 10V7L12 2Z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-tda-dark" data-testid="text-projects-completed">200+ مشروع مكتمل</p>
                  <p className="text-gray-600 text-sm" data-testid="text-satisfied-clients">عملاء راضون حول العالم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

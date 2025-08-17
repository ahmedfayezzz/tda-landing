import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-reverse space-x-4">
            <img 
              src="https://static.wixstatic.com/media/74190f_a7ae83195775488e864a0274516bb03a~mv2.png/v1/fill/w_48,h_57,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/74190f_a7ae83195775488e864a0274516bb03a~mv2.png" 
              alt="TDA Solutions Logo" 
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold text-tda-dark">TDA Solutions</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-tda-text hover:text-tda-accent transition-colors font-medium"
              data-testid="nav-home"
            >
              الرئيسية
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-tda-text hover:text-tda-accent transition-colors font-medium"
              data-testid="nav-about"
            >
              من نحن
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-tda-text hover:text-tda-accent transition-colors font-medium"
              data-testid="nav-services"
            >
              خدماتنا
            </button>
            <button 
              onClick={() => scrollToSection('work')} 
              className="text-tda-text hover:text-tda-accent transition-colors font-medium"
              data-testid="nav-work"
            >
              كيف نعمل
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="text-tda-text hover:text-tda-accent transition-colors font-medium"
              data-testid="nav-portfolio"
            >
              أعمالنا
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-tda-accent text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all font-medium"
              data-testid="nav-contact"
            >
              تواصل معنا
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-tda-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('home')} 
              className="block w-full text-right text-tda-text font-medium"
              data-testid="mobile-nav-home"
            >
              الرئيسية
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-right text-tda-text font-medium"
              data-testid="mobile-nav-about"
            >
              من نحن
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-right text-tda-text font-medium"
              data-testid="mobile-nav-services"
            >
              خدماتنا
            </button>
            <button 
              onClick={() => scrollToSection('work')} 
              className="block w-full text-right text-tda-text font-medium"
              data-testid="mobile-nav-work"
            >
              كيف نعمل
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="block w-full text-right text-tda-text font-medium"
              data-testid="mobile-nav-portfolio"
            >
              أعمالنا
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-tda-accent text-white px-4 py-2 rounded-full text-center font-medium w-full"
              data-testid="mobile-nav-contact"
            >
              تواصل معنا
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

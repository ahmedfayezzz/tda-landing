import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import WhyChooseSection from "@/components/why-choose-section";
import HowWeWorkSection from "@/components/how-we-work-section";
import PortfolioSection from "@/components/portfolio-section";
import TechnologySection from "@/components/technology-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { AdminModeToggle } from "@/components/inline-editor";

export default function Home() {
  return (
    <div className="font-cairo bg-tda-light text-tda-text" dir="rtl">
      <AdminModeToggle />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <HowWeWorkSection />
      <PortfolioSection />
      <TechnologySection />
      <ContactSection />
      <Footer />
    </div>
  );
}

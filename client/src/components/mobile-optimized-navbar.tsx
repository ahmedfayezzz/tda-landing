import React from "react";
import { motion } from "framer-motion";
import MobileMenu from "./mobile-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileOptimizedNavbarProps {
  scrollToSection: (id: string) => void;
}

export default function MobileOptimizedNavbar({ scrollToSection }: MobileOptimizedNavbarProps) {
  const isMobile = useIsMobile();

  const desktopMenuItems = [
    { label: "الرئيسية", id: "home" },
    { label: "من نحن", id: "about" },
    { label: "خدماتنا", id: "services" },
    { label: "أعمالنا", id: "portfolio" },
    { label: "كيف نعمل", id: "work" },
    { label: "تواصل معنا", id: "contact" }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 bg-tda-dark/80 backdrop-blur-md border-b border-tda-accent/20 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-white font-bold text-xl lg:text-2xl"
          >
            <span className="text-tda-accent">TDA</span> Solutions
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-reverse space-x-8">
            {desktopMenuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2, color: "#f59e0b" }}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-tda-accent transition-colors font-medium"
                data-testid={`nav-item-${item.id}`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu */}
          <MobileMenu scrollToSection={scrollToSection} />
        </div>
      </div>
    </motion.nav>
  );
}
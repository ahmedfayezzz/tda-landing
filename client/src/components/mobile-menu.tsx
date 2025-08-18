import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  scrollToSection: (id: string) => void;
}

export default function MobileMenu({ scrollToSection }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "الرئيسية", id: "home" },
    { label: "من نحن", id: "about" },
    { label: "خدماتنا", id: "services" },
    { label: "أعمالنا", id: "portfolio" },
    { label: "كيف نعمل", id: "work" },
    { label: "تواصل معنا", id: "contact" }
  ];

  const handleMenuClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-tda-accent"
        data-testid="mobile-menu-toggle"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-tda-dark/95 backdrop-blur-md border-t border-tda-accent/20 z-50"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleMenuClick(item.id)}
                    className="block w-full text-right text-white hover:text-tda-accent transition-colors py-2 text-lg font-medium"
                    data-testid={`mobile-menu-item-${item.id}`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
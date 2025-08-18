import React from "react";
import { motion } from "framer-motion";

interface MobileOptimizedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: "small" | "medium" | "large";
  dataTestId?: string;
}

export default function MobileOptimizedCard({
  children,
  className = "",
  hoverable = true,
  padding = "medium",
  dataTestId
}: MobileOptimizedCardProps) {
  const paddingClasses = {
    small: "p-4 lg:p-6",
    medium: "p-6 lg:p-8", 
    large: "p-8 lg:p-10"
  };

  const hoverProps = hoverable ? {
    whileHover: { 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  } : {};

  return (
    <motion.div
      {...hoverProps}
      className={`
        bg-white 
        rounded-2xl 
        shadow-lg 
        ${paddingClasses[padding]}
        ${hoverable ? 'cursor-pointer group' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      data-testid={dataTestId}
    >
      {children}
    </motion.div>
  );
}
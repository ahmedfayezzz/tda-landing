import React from "react";
import { motion } from "framer-motion";

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption";
  className?: string;
  animate?: boolean;
  delay?: number;
}

const textVariants = {
  h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold",
  h2: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold",
  h3: "text-xl sm:text-2xl md:text-3xl font-bold",
  h4: "text-lg sm:text-xl md:text-2xl font-bold",
  body: "text-base sm:text-lg lg:text-xl",
  caption: "text-sm sm:text-base"
};

export default function MobileResponsiveText({
  children,
  variant = "body",
  className = "",
  animate = false,
  delay = 0
}: ResponsiveTextProps) {
  const baseClasses = `${textVariants[variant]} ${className}`;

  if (!animate) {
    return <div className={baseClasses}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className={baseClasses}
    >
      {children}
    </motion.div>
  );
}
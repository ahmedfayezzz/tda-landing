import React from "react";
import { motion } from "framer-motion";

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: {
    mobile?: string;
    tablet?: string; 
    desktop?: string;
  };
  className?: string;
}

export default function MobileResponsiveGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: "gap-4", tablet: "gap-6", desktop: "gap-8" },
  className = ""
}: ResponsiveGridProps) {
  const gridClasses = `
    grid
    grid-cols-${columns.mobile || 1}
    sm:grid-cols-${columns.tablet || 2}
    lg:grid-cols-${columns.desktop || 3}
    ${gap.mobile || "gap-4"}
    sm:${gap.tablet || "gap-6"}
    lg:${gap.desktop || "gap-8"}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}
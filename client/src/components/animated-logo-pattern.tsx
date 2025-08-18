import { motion } from "framer-motion";

interface AnimatedLogoPatternProps {
  className?: string;
  opacity?: number;
}

export default function AnimatedLogoPattern({ className = "", opacity = 0.05 }: AnimatedLogoPatternProps) {
  const logoPattern = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {logoPattern.map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i % 4) * 25}%`,
            top: `${10 + Math.floor(i / 4) * 40}%`,
          }}
          initial={{ 
            rotate: 0,
            scale: 0.3,
            opacity: 0 
          }}
          animate={{ 
            rotate: [0, 360],
            scale: [0.3, 0.8, 0.3],
            opacity: [0, opacity * 20, 0]
          }}
          transition={{
            duration: 20 + (i * 2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        >
          {/* نمط هندسي بسيط للشعار */}
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-tda-primary">
            {/* شكل هندسي مبسط */}
            <rect x="20" y="10" width="20" height="4" fill="currentColor" opacity="0.6" />
            <rect x="28" y="14" width="4" height="20" fill="currentColor" opacity="0.6" />
            <path d="M10 50 L10 30 L20 30 Q30 30 30 40 Q30 50 20 50 L10 50" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M35 50 L40 30 L45 50 M37.5 40 L42.5 40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
            <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.3" />
            <circle cx="45" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
            <circle cx="50" cy="45" r="1.5" fill="currentColor" opacity="0.3" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
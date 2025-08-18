import { motion } from "framer-motion";

interface AnimatedLogoPatternProps {
  className?: string;
  opacity?: number;
}

export default function AnimatedLogoPattern({ className = "", opacity = 0.05 }: AnimatedLogoPatternProps) {
  const logoPattern = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {logoPattern.map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${(i * 200) % 100}%`,
            top: `${Math.floor(i / 4) * 33}%`,
          }}
          initial={{ 
            rotate: 0,
            scale: 0.5,
            opacity: 0 
          }}
          animate={{ 
            rotate: [0, 180, 360],
            scale: [0.5, 1, 0.5],
            opacity: [0, opacity, 0]
          }}
          transition={{
            duration: 15 + (i * 1.5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2
          }}
        >
          {/* نمط الشعار المبسط - TDA */}
          <svg width="80" height="80" viewBox="0 0 120 120" fill="none" className="text-tda-primary">
            {/* الحرف T */}
            <path d="M30 20 L90 20 M60 20 L60 80" stroke="currentColor" strokeWidth="3" opacity={opacity * 3} />
            {/* الحرف D */}
            <path d="M30 100 L30 40 L50 40 Q70 40 70 60 Q70 80 50 80 L30 80" stroke="currentColor" strokeWidth="3" opacity={opacity * 3} />
            {/* الحرف A */}
            <path d="M75 100 L85 60 L95 100 M80 80 L90 80" stroke="currentColor" strokeWidth="3" opacity={opacity * 3} />
            {/* نقاط زخرفية */}
            <circle cx="20" cy="30" r="2" fill="currentColor" opacity={opacity * 2} />
            <circle cx="100" cy="50" r="2" fill="currentColor" opacity={opacity * 2} />
            <circle cx="50" cy="100" r="2" fill="currentColor" opacity={opacity * 2} />
            <circle cx="80" cy="30" r="2" fill="currentColor" opacity={opacity * 2} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
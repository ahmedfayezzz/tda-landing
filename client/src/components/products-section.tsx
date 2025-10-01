import { motion } from "framer-motion";
import { useScrollAnimation, fadeUpVariants, slideInLeftVariants, slideInRightVariants } from "@/hooks/use-scroll-animation";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsSection() {
  const { ref: titleRef, controls: titleControls } = useScrollAnimation(0.3);
  const { ref: productRef, controls: productControls } = useScrollAnimation(0.2);

  const products = [
    {
      name: "أفق للفعاليات",
      tagline: "منصة احترافية متكاملة لإدارة الفعاليات",
      description: "أفق للفعاليات هي منصة احترافية متكاملة لإدارة الفعاليات والمؤتمرات وورش العمل. تساعدك على تنظيم التسجيل، إصدار الدعوات الذكية، متابعة الحضور، وتحليل بيانات المشاركين—all في مكان واحد.",
      subDescription: "صُممت لتوفير الوقت وتقليل الأخطاء، وتقديم تجربة سلسة واحترافية للمشاركين والمنظمين على حد سواء.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      features: [
        "تسجيل ذكي وسريع مع تأكيد تلقائي عبر البريد الإلكتروني",
        "دعوات احترافية مع QR Codes مخصّصة لكل مشارك",
        "إدارة حضور لحظية عبر مسح الأكواد وتتبع مباشر",
        "لوحة تحكم للمنظمين لمتابعة الجلسات والمشاركين بسهولة",
        "تحليلات وتقارير تساعد على تحسين التجربة واتخاذ قرارات أفضل",
        "دعم متعدد اللغات وتجربة سلسة للمستخدمين"
      ],
      whyChooseUs: [
        "أتمتة كاملة لعملية التسجيل والحضور",
        "واجهة سهلة الاستخدام بدون تدريب معقد",
        "تقارير دقيقة تساعدك على قياس نجاح فعالياتك",
        "دعم عربي محلي مع تحديثات مستمرة"
      ],
      link: "#contact"
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={fadeUpVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl lg:text-5xl font-bold text-tda-dark mb-6" 
            data-testid="heading-products"
          >
            منتجاتنا
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto" 
            data-testid="text-products-description"
          >
            حلول برمجية متكاملة صُممت خصيصاً لتلبية احتياجات السوق السعودي والعربي
          </motion.p>
        </motion.div>

        {products.map((product, index) => (
          <motion.div
            key={index}
            ref={productRef}
            initial="hidden"
            animate={productControls}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-auto"
                    data-testid={`product-image-${index}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tda-dark/20 to-transparent"></div>
                </div>
              </motion.div>

              {/* Product Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-2 bg-tda-accent/10 text-tda-accent px-4 py-2 rounded-full mb-4">
                    <Sparkles size={18} />
                    <span className="text-sm font-semibold">منتج مميز</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-tda-dark mb-3" data-testid={`product-name-${index}`}>
                    {product.name}
                  </h3>
                  <p className="text-lg text-tda-accent font-semibold mb-4" data-testid={`product-tagline-${index}`}>
                    {product.tagline}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3" data-testid={`product-description-${index}`}>
                    {product.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed" data-testid={`product-subdescription-${index}`}>
                    {product.subDescription}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-xl font-bold text-tda-dark mb-4 flex items-center gap-2">
                    <Sparkles className="text-tda-accent" size={20} />
                    أبرز المميزات
                  </h4>
                  <div className="space-y-3">
                    {product.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        className="flex items-start gap-3"
                        data-testid={`product-feature-${index}-${featureIndex}`}
                      >
                        <CheckCircle2 className="text-tda-accent shrink-0 mt-1" size={20} />
                        <p className="text-gray-700">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-tda-accent/5 p-6 rounded-xl border-r-4 border-tda-accent">
                  <h4 className="text-xl font-bold text-tda-dark mb-4">🎯 لماذا تختارنا؟</h4>
                  <div className="space-y-2">
                    {product.whyChooseUs.map((reason, reasonIndex) => (
                      <motion.div
                        key={reasonIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: reasonIndex * 0.1 }}
                        className="flex items-start gap-3"
                        data-testid={`product-reason-${index}-${reasonIndex}`}
                      >
                        <span className="text-tda-accent font-bold">✅</span>
                        <p className="text-gray-700">{reason}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    asChild
                    className="w-full md:w-auto bg-tda-accent text-white px-8 py-6 rounded-lg hover:bg-opacity-90 transition-all font-semibold text-lg"
                    data-testid={`product-cta-${index}`}
                  >
                    <a href={product.link}>
                      اطلب استشارة مجانية
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

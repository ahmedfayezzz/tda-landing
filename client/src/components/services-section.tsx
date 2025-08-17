import { Code, Palette, Brush, Headset } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "تطوير تطبيقات الويب والجوال",
      description: "تطوير منصات ويب قوية وقابلة للتوسع وتطبيقات موبايل عالية الجودة مع الاهتمام بأدق التفاصيل"
    },
    {
      icon: Palette,
      title: "تصميم واجهات وتجربة المستخدم",
      description: "تصميم واجهات مستخدم بديهية وتجارب مستخدم جذابة لضمان تفاعلات سلسة ورضا المستخدم"
    },
    {
      icon: Brush,
      title: "إنشاء العلامات التجارية والهويات",
      description: "تأسيس هوية علامة تجارية قوية ولا تُنسى من تصميم الشعارات إلى إرشادات العلامة التجارية"
    },
    {
      icon: Headset,
      title: "الدعم الفني للمواقع",
      description: "خدمات دعم فني شاملة لضمان استمرارية عمل مواقعكم وتطبيقاتكم بأعلى كفاءة ممكنة"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-tda-dark mb-6" data-testid="heading-services">
            خدماتنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-services-description">
            وكالة برمجيات تقود وتلهم - نقدم حلولاً متكاملة تلبي جميع احتياجاتكم التقنية
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg card-hover group" data-testid={`service-card-${index}`}>
                <div className="bg-tda-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-tda-accent group-hover:text-white transition-all">
                  <IconComponent size={24} className="text-tda-accent group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-tda-dark mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

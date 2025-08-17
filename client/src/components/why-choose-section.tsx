export default function WhyChooseSection() {
  const features = [
    {
      number: 1,
      title: "نحلل ونتبع الأرقام وليس الافتراضات",
      description: "نعتمد على الأرقام لتحليل احتياجاتكم بدقة، ونستخدم البيانات لمساعدتكم في تحقيق أهدافكم بأفضل طريقة ممكنة"
    },
    {
      number: 2,
      title: "المرونة والبساطة",
      description: "نؤمن بالمرونة والعمل كفريق واحد مرن للوصول لأهدافكم والنجاح المشترك"
    },
    {
      number: 3,
      title: "جودة استثنائية",
      description: "نفخر بفريق من المواهب المختارة بعناية، مرتبطين بالمجتمعات التقنية العالمية ومطلعين على أحدث التوجهات"
    },
    {
      number: 4,
      title: "منهجية عمل احترافية",
      description: "نقدم مخرجات عمل محددة ومنهجية تعتمد على أفضل الممارسات في إدارة المشاريع لتقديم الحلول بأعلى جودة"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-tda-dark mb-6" data-testid="heading-why-choose">
            لماذا TDA؟
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            {features.slice(0, 2).map((feature, index) => (
              <div key={feature.number} className="flex items-start space-x-reverse space-x-6" data-testid={`feature-${feature.number}`}>
                <div className="bg-tda-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                  {feature.number}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-tda-dark mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-12">
            {features.slice(2, 4).map((feature, index) => (
              <div key={feature.number} className="flex items-start space-x-reverse space-x-6" data-testid={`feature-${feature.number}`}>
                <div className="bg-tda-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                  {feature.number}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-tda-dark mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HowWeWorkSection() {
  const steps = [
    {
      number: 1,
      title: "فهم احتياجاتكم",
      description: "نبدأ بفهم عميق لاحتياجاتكم وأهدافكم لضمان تحقيق رؤية واضحة",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 2,
      title: "التخطيط الاستراتيجي",
      description: "نضع خطة عمل مدروسة تشمل الخطوات الأساسية لتحقيق أهدافكم بنجاح",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 3,
      title: "التصميم والتطوير",
      description: "نقوم بتصميم وتطوير حلول مبتكرة وفق أحدث المعايير لضمان جودة عالية",
      image: "https://images.unsplash.com/photo-1600880292154-2651d81ff0e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 4,
      title: "الاختبار والتحسين",
      description: "نجري اختبارات شاملة للمنتج ونحسن أي جوانب لضمان الأداء الأمثل",
      image: "https://images.unsplash.com/photo-1600880292533-bb5739e737ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    },
    {
      number: 5,
      title: "التسليم والدعم",
      description: "نقدم الحل النهائي ونتأكد من تقديم الدعم المستمر لضمان نجاح طويل الأمد",
      image: "https://images.unsplash.com/photo-1600880292593-2e5cd1b8d6b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300"
    }
  ];

  return (
    <section id="work" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-tda-dark mb-6" data-testid="heading-how-we-work">
            كيف نعمل
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-work-description">
            منهجية عمل مدروسة تضمن تحقيق أهدافكم بأعلى جودة وفي الوقت المحدد
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center group" data-testid={`work-step-${step.number}`}>
              <div className="relative mb-6">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-48 object-cover rounded-xl group-hover:shadow-lg transition-all"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-tda-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-lg font-bold text-tda-dark mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

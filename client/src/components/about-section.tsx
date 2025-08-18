import { Lightbulb, Users, Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-tda-dark mb-6" data-testid="heading-about-company">
                عن شركة التطور والتسارع التقنية
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed" data-testid="text-company-description">
                شركة سعودية رائدة في مجال التقنية نقدم أكثر من مجرد حلول برمجية. نحن صُنّاع الابتكار الذين نمزج بين الشغف والتفوق لإبداع حلول رقمية مصممة خصيصًا لتفوق توقعات عملائنا.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-reverse space-x-4">
                <div className="bg-tda-accent/10 p-3 rounded-full shrink-0">
                  <Lightbulb className="text-tda-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-tda-dark mb-2">رؤية مبتكرة</h3>
                  <p className="text-gray-600">نحول الأفكار الطموحة إلى واقع رقمي ملموس بأحدث التقنيات</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-reverse space-x-4">
                <div className="bg-tda-accent/10 p-3 rounded-full shrink-0">
                  <Users className="text-tda-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-tda-dark mb-2">فريق متخصص</h3>
                  <p className="text-gray-600">مواهب مختارة بعناية ومطلعة على أحدث التوجهات التقنية العالمية</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-reverse space-x-4">
                <div className="bg-tda-accent/10 p-3 rounded-full shrink-0">
                  <Award className="text-tda-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-tda-dark mb-2">جودة استثنائية</h3>
                  <p className="text-gray-600">نلتزم بأعلى معايير الجودة في كل مشروع نقوم بتنفيذه</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" 
              alt="Saudi business team collaboration" 
              className="rounded-2xl shadow-lg"
            />
            
            {/* Stats overlay */}
            <div className="absolute -bottom-8 left-8 right-8 bg-white p-6 rounded-xl shadow-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-tda-accent" data-testid="stat-completed-projects">200+</p>
                  <p className="text-sm text-gray-600">مشروع مكتمل</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-tda-accent" data-testid="stat-satisfied-clients">50+</p>
                  <p className="text-sm text-gray-600">عميل راضي</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-tda-accent" data-testid="stat-years-experience">5+</p>
                  <p className="text-sm text-gray-600">سنوات خبرة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

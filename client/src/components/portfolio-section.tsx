export default function PortfolioSection() {
  const projects = [
    {
      title: "منصة التجارة الإلكترونية",
      description: "منصة متكاملة للتجارة الإلكترونية مع نظام إدارة متطور ومتجر عصري",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "تطبيق الخدمات الذكية",
      description: "تطبيق جوال متطور لإدارة الخدمات مع واجهة مستخدم بديهية وسهلة",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["Flutter", "Firebase", "UI/UX"]
    },
    {
      title: "موقع شركة عالمية",
      description: "موقع إلكتروني متطور لشركة عالمية بتصميم عصري ومحتوى تفاعلي",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["WordPress", "PHP", "MySQL"]
    },
    {
      title: "هوية بصرية متكاملة",
      description: "تصميم هوية بصرية شاملة تتضمن الشعار والألوان ودليل الاستخدام",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["Branding", "Logo Design", "Guidelines"]
    },
    {
      title: "لوحة تحكم تحليلية",
      description: "نظام تحليل البيانات المتقدم مع لوحات تحكم تفاعلية ومرئية",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["Vue.js", "Python", "PostgreSQL"]
    },
    {
      title: "منصة تعليمية تفاعلية",
      description: "منصة تعليم إلكتروني متطورة مع أدوات تفاعلية ونظام إدارة التعلم",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      technologies: ["Angular", "Laravel", "LMS"]
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-tda-dark mb-6" data-testid="heading-portfolio">
            أعمالنا
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-portfolio-description">
            مجموعة مختارة من مشاريعنا المتميزة التي تعكس خبرتنا وابتكارنا
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden card-hover group" data-testid={`portfolio-project-${index}`}>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-tda-dark mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-tda-accent/10 text-tda-accent px-3 py-1 rounded-full text-sm"
                      data-testid={`technology-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            className="bg-tda-accent text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all font-semibold"
            data-testid="button-view-more-projects"
          >
            عرض المزيد من الأعمال
          </button>
        </div>
      </div>
    </section>
  );
}

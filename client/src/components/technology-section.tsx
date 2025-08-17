export default function TechnologySection() {
  const technologies = [
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    },
    {
      name: "Flutter",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
    },
    {
      name: "Vue.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
    },
    {
      name: "Angular",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg"
    },
    {
      name: "Laravel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg"
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    },
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-tda-dark mb-6" data-testid="heading-technologies">
            تقنياتنا البرمجية
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-technologies-description">
            نستخدم أحدث التقنيات والأدوات العالمية لضمان تقديم حلول متطورة وموثوقة
          </p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-8 items-center justify-center">
          {technologies.map((tech, index) => (
            <div key={index} className="flex justify-center" data-testid={`technology-icon-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-12 h-12 tech-icon"
                title={tech.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

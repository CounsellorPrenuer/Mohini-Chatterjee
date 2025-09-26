import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Users, GraduationCap, Building } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Compass,
      title: "📘 Career Guidance",
      items: [
        "Career assessments using psychometric tools",
        "Personalized counselling sessions",
        "Course and career path guidance",
        "Career transition support"
      ],
      gradient: "bg-primary/20"
    },
    {
      icon: Users,
      title: "🎤 Workshops & Seminars",
      items: [
        "Career awareness sessions",
        "Corporate wellbeing workshops",
        "Soft skills development",
        "Mental health awareness"
      ],
      gradient: "bg-secondary/20"
    },
    {
      icon: GraduationCap,
      title: "🎓 Admission Guidance",
      items: [
        "Higher education guidance",
        "Stream selection & course mapping",
        "SOP & interview preparation",
        "Mentorship until admission"
      ],
      gradient: "bg-accent/20"
    },
    {
      icon: Building,
      title: "🌍 Corporate Solutions",
      items: [
        "Employee engagement programs",
        "Leadership development training",
        "Career transition support",
        "Customized corporate workshops"
      ],
      gradient: "bg-gradient-to-r from-primary/20 to-secondary/20"
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-6">Services We Offer</h2>
          <p className="text-xl text-muted-foreground">Comprehensive solutions for all your career development needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="card-hover animate-fadeInUp bg-card border-border" 
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`service-card-${index}`}
              >
                <CardHeader>
                  <div className={`w-16 h-16 ${service.gradient} rounded-full flex items-center justify-center mb-4`}>
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Who We Serve Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold gradient-text mb-6">Who We Serve</h3>
            <p className="text-xl text-muted-foreground">Supporting every stakeholder in the career journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { emoji: "🎯", title: "Students", desc: "Stream & course selection, academic success strategies" },
              { emoji: "👨‍👩‍👧", title: "Parents", desc: "Empowering you to guide children's education & careers" },
              { emoji: "🏫", title: "Schools & Colleges", desc: "Seminars, workshops, career readiness programs" },
              { emoji: "🏢", title: "Corporates", desc: "Employee wellbeing, leadership, and career growth sessions" },
              { emoji: "💼", title: "Professionals", desc: "Career pivots, leadership coaching, and personal branding" }
            ].map((audience, index) => (
              <Card 
                key={index} 
                className="text-center p-6 card-hover animate-fadeInUp" 
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                data-testid={`audience-card-${index}`}
              >
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{audience.emoji}</div>
                  <h4 className="font-bold mb-2">{audience.title}</h4>
                  <p className="text-sm text-muted-foreground">{audience.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

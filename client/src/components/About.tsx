import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Brain, HandHeart, Star, GraduationCap, School, Users, Heart } from "lucide-react";
import mohiniImage from "@assets/WhatsApp Image 2024-12-12 at 10.53.11 PM(1)(1) - Mohini Chatterjee_1759732058376.png";

export default function About() {
  const missionPoints = [
    "Helping students choose the right stream, course, and career",
    "Supporting parents in guiding their children wisely",
    "Empowering professionals to grow, pivot, or re-align careers",
    "Collaborating with schools, colleges & corporates for structured wellbeing"
  ];

  const specializations = [
    { icon: GraduationCap, text: "Career Guidance" },
    { icon: School, text: "Admission Counselling" },
    { icon: Users, text: "Leadership Development" },
    { icon: Heart, text: "Psychological Wellbeing" }
  ];

  return (
    <section id="about" className="py-8 md:py-10 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">About Aakaar – Who We Are</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            At Aakaar, we believe every individual has a unique shape — a potential waiting to unfold.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-12 md:mb-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Our Mission</h3>
            <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
              Our mission is to bridge psychology with career science to help people make confident life and career decisions.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
              We don't just guide — we transform confusion into clarity by:
            </p>
            <div className="space-y-3 md:space-y-4">
              {missionPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            {/* Key Statistics */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 md:p-8 text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-sm md:text-base text-muted-foreground">Years of Experience</p>
              </div>
              <div className="bg-gradient-to-br from-secondary/15 to-secondary/5 rounded-2xl p-6 md:p-8 text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">7000+</div>
                <p className="text-sm md:text-base text-muted-foreground">Students Guided</p>
              </div>
            </div>
            
            {/* Core Values */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 md:p-8">
              <h4 className="text-xl md:text-2xl font-semibold mb-6 text-center text-primary">Our Core Values</h4>
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold">Clarity First</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Transforming confusion into clear direction</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold">Psychology-Based</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Evidence-based counselling approach</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <HandHeart className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold">Personalized Care</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Every journey is unique and valued</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold">Empowerment</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Building confidence for life decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Ms. Mohini Chatterjee */}
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-6 lg:gap-8 items-center">
              <div className="flex items-center justify-center">
                <img
                  src={mohiniImage}
                  alt="Ms. Mohini Chatterjee - Founder"
                  className="w-40 ml-4 sm:mt-4 sm:w-48 md:mt-4 md:w-56 lg:mt-4 lg:w-64 h-auto object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="p-6 lg:py-8 lg:pr-8">
                <blockquote className="text-xl md:text-2xl font-medium italic text-primary mb-4">
                  "Helping individuals and organizations find clarity, purpose, and success has been my life's work."
                </blockquote>
                <h3 className="text-2xl md:text-3xl font-bold mb-5">Ms. Mohini Chatterjee</h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="font-semibold text-primary">Educational Background:</h4>
                    <p className="text-muted-foreground text-sm md:text-base">Clinical Psychology + Human Resource Development</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Professional Role:</h4>
                    <p className="text-muted-foreground text-sm md:text-base">Psychological Consultant | Career Coach | Mentor | Speaker</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Experience:</h4>
                    <p className="text-muted-foreground text-sm md:text-base">15+ years in counselling, training, and leadership development</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specializations.map((spec, index) => {
                    const IconComponent = spec.icon;
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{spec.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

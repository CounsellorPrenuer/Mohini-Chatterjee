import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import mohiniImage from "@assets/WhatsApp Image 2024-12-12 at 10.53.11 PM(1)(1) - Mohini Chatterjee_1758871553313.png";

export default function About() {
  const missionPoints = [
    "Helping students choose the right stream, course, and career",
    "Supporting parents in guiding their children wisely",
    "Empowering professionals to grow, pivot, or re-align careers",
    "Collaborating with schools, colleges & corporates for structured wellbeing"
  ];

  const specializations = [
    { icon: "🎓", text: "Career Guidance" },
    { icon: "🏫", text: "Admission Counselling" },
    { icon: "👥", text: "Leadership Development" },
    { icon: "🧠", text: "Psychological Wellbeing" }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-6">About Aakaar – Who We Are</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At Aakaar, we believe every individual has a unique shape — a potential waiting to unfold.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-fadeInUp">
            <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Our mission is to bridge psychology with career science to help people make confident life and career decisions.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              We don't just guide — we transform confusion into clarity by:
            </p>
            <div className="space-y-4">
              {missionPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fadeInUp-delay-1">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Team Collaboration</h4>
                  <p className="text-muted-foreground">Working together towards career clarity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Ms. Mohini Chatterjee */}
        <Card className="p-8 md:p-12 shadow-lg animate-fadeInUp-delay-2">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={mohiniImage}
                  alt="Ms. Mohini Chatterjee - Founder"
                  className="w-full max-w-md rounded-2xl shadow-lg mx-auto"
                />
              </div>
              <div>
                <blockquote className="text-2xl font-medium gradient-text mb-6">
                  "Helping individuals and organizations find clarity, purpose, and success has been my life's work."
                </blockquote>
                <h3 className="text-3xl font-bold mb-6">Ms. Mohini Chatterjee</h3>
                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="font-semibold text-primary">Educational Background:</h4>
                    <p className="text-muted-foreground">Clinical Psychology + Human Resource Development</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Professional Role:</h4>
                    <p className="text-muted-foreground">Psychological Consultant | Career Coach | Mentor | Speaker</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Experience:</h4>
                    <p className="text-muted-foreground">10+ years in counselling, training, and leadership development</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specializations.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-lg">{spec.icon}</span>
                      <span className="text-sm font-medium">{spec.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

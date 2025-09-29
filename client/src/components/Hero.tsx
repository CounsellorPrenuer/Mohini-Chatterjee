import { Button } from "@/components/ui/button";
import { Brain, Target, TrendingUp, Users, Lightbulb, Star, Compass, Heart } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-16 gradient-bg min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Redefining Career Journeys with{" "}
              <span className="text-accent-foreground">Psychology, Purpose & Clarity</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              Guiding students, parents, professionals, schools, colleges, and corporates through career choices, personal growth, and future-proof success in a rapidly changing world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all transform hover:scale-105 text-lg font-semibold px-8 py-4"
                data-testid="button-discovery-call"
              >
Book a Free Discovery Call
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => scrollToSection("services")}
                className="bg-card text-foreground hover:bg-card/90 transition-all transform hover:scale-105 text-lg font-semibold px-8 py-4"
                data-testid="button-explore-services"
              >
Explore Our Services
              </Button>
            </div>
          </div>
          <div className="relative animate-fadeInUp-delay-2">
            {/* Aakaar Shape Animation - Central Element */}
            <div className="relative w-80 h-80 mx-auto">
              {/* Main Aakaar Shape */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/30 animate-float">
                <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-accent/30 to-secondary/30 backdrop-blur-sm">
                  <div className="absolute inset-8 rounded-full bg-gradient-to-bl from-primary/40 to-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white text-4xl font-bold mb-2">AAKAAR</div>
                      <div className="text-white/70 text-sm font-medium tracking-wider">SHAPE YOUR FUTURE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Career Elements */}
              <div className="absolute top-4 left-4 animate-bounce-slow">
                <div className="w-12 h-12 bg-accent/80 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="absolute top-12 right-8 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <div className="w-10 h-10 bg-secondary/80 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="absolute bottom-16 left-8 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                <div className="w-14 h-14 bg-primary/80 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>

              <div className="absolute bottom-4 right-4 animate-bounce-slow" style={{ animationDelay: '1.5s' }}>
                <div className="w-11 h-11 bg-white/80 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="absolute top-1/2 left-0 animate-bounce-slow" style={{ animationDelay: '2s' }}>
                <div className="w-9 h-9 bg-accent/70 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="absolute top-1/3 right-0 animate-bounce-slow" style={{ animationDelay: '2.5s' }}>
                <div className="w-8 h-8 bg-secondary/70 rounded-full flex items-center justify-center">
                  <Compass className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Orbiting Elements */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <Star className="w-6 h-6 text-accent animate-pulse" />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                <Heart className="w-6 h-6 text-secondary animate-pulse" />
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-accent/30 rounded-full animate-pulse-slow"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-secondary/30 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -left-12 w-16 h-16 bg-primary/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

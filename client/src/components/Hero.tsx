import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Target, TrendingUp, Users, Lightbulb, Star, Compass, Heart, Zap, ArrowRight } from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = document.getElementById('home');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const hero = document.getElementById('home');
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="gradient-bg flex items-center relative overflow-hidden mt-24 min-h-[calc(100vh-6rem)]">
      <div className="absolute inset-0 bg-black/10"></div>
      {/* Mouse Follow Glow Effect */}
      <div 
        className="absolute pointer-events-none transition-opacity duration-300 opacity-60"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,133,179,0.4) 0%, rgba(249,0,191,0.2) 30%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white animate-fadeInUp">
            {/* Decreased text sizes here */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight animate-glow break-words">
              Redefining Career Journeys with{" "}
              <span className="text-accent animate-shimmer break-words">Psychology, Purpose & Clarity</span>
            </h1>
            {/* Decreased text sizes here */}
            <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-white/90 leading-relaxed break-words">
              Guiding students, parents, professionals, schools, colleges, and corporates through career choices, personal growth, and future-proof success in a rapidly changing world.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {/* Decreased button size here */}
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto bg-pink-700 text-white hover:bg-accent/90 button-glow font-semibold"
                data-testid="button-discovery-call"
              >
                Book a Free Discovery Call
              </Button>
              {/* Decreased button size here */}
              <Button
                variant="secondary"
                onClick={() => scrollToSection("services")}
                className="w-full sm:w-auto bg-white/90 text-primary hover:bg-white button-glow font-semibold"
                data-testid="button-explore-services"
              >
                Explore Our Services
              </Button>
            </div>
          </div>
          <div className="relative animate-fadeInUp-delay-2 order-first lg:order-last mb-8 lg:mb-0">
            {/* Aakaar Shape Animation - Central Element */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto interactive-hover">
              {/* Main Aakaar Shape */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/30 animate-float">
                <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-accent/30 to-secondary/30 backdrop-blur-sm">
                  <div className="absolute inset-8 rounded-full bg-gradient-to-bl from-primary/40 to-white/10 flex items-center justify-center">
                    {/* Career Path Network Visualization */}
                    <div className="relative w-full h-full flex items-center justify-center" role="img" aria-label="Career guidance network visualization">
                      {/* Central Hub */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center z-10">
                        <Brain className="w-8 h-8 text-primary" />
                      </div>

                      {/* Connected Career Elements */}
                      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-12 bg-accent/90 rounded-full flex items-center justify-center">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="absolute top-1/2 left-[80%] transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-10 h-10 bg-secondary/90 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-11 h-11 bg-primary/90 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="absolute top-1/2 left-[20%] transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-9 h-9 bg-accent/80 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Connection Lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <line x1="50" y1="50" x2="50" y2="20" stroke="white" strokeWidth="0.5" opacity="0.6" />
                          <line x1="50" y1="50" x2="80" y2="50" stroke="white" strokeWidth="0.5" opacity="0.6" />
                          <line x1="50" y1="50" x2="50" y2="80" stroke="white" strokeWidth="0.5" opacity="0.6" />
                          <line x1="50" y1="50" x2="20" y2="50" stroke="white" strokeWidth="0.5" opacity="0.6" />
                          <line x1="50" y1="50" x2="70" y2="30" stroke="white" strokeWidth="0.3" opacity="0.4" />
                          <line x1="50" y1="50" x2="30" y2="70" stroke="white" strokeWidth="0.3" opacity="0.4" />
                        </svg>
                      </div>

                      {/* Transformation Arrows */}
                      <div className="absolute top-6 right-6 pointer-events-none">
                        <ArrowRight className="w-4 h-4 text-white/60 animate-pulse" />
                      </div>
                      <div className="absolute bottom-6 left-6 pointer-events-none">
                        <Zap className="w-4 h-4 text-accent/80 animate-pulse" />
                      </div>
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
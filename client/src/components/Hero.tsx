import { Button } from "@/components/ui/button";
import { Award, Users } from "lucide-react";
import profileImage from "@assets/WhatsApp Image 2024-12-12 at 10.53.11 PM(1)(1) - Mohini Chatterjee_1758871553313.png";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-16 gradient-bg min-h-[85vh] flex items-center relative overflow-hidden beam-bg">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div className="text-white animate-fadeInUp">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight animate-glow">
              Welcome to <span className="text-pink-500">Aakaar</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4 leading-tight">
              Redefining Career Journeys with{" "}
              <span className="text-accent-foreground animate-shimmer">Psychology, Purpose & Clarity</span>
            </h2>
            
            {/* Experience Stats */}
            <div className="flex flex-wrap gap-4 mb-4 md:mb-5">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Award className="w-5 h-5 text-pink-500" />
                <span className="text-sm md:text-base font-semibold">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Users className="w-5 h-5 text-pink-500" />
                <span className="text-sm md:text-base font-semibold">7000+ Students Counselled</span>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg mb-5 md:mb-6 text-white/90 leading-relaxed">
              Guiding students, parents, professionals, schools, colleges, and corporates through career choices, personal growth, and future-proof success.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base font-semibold px-5 md:px-6 py-2.5 md:py-3 animate-glow"
                data-testid="button-discovery-call"
              >
Book a Free Discovery Call
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => scrollToSection("services")}
                className="w-full sm:w-auto bg-card text-foreground hover:bg-card/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base font-semibold px-5 md:px-6 py-2.5 md:py-3 interactive-hover"
                data-testid="button-explore-services"
              >
Explore Our Services
              </Button>
            </div>
          </div>
          <div className="relative animate-fadeInUp-delay-2 order-first lg:order-last mb-6 lg:mb-0 flex justify-center">
            {/* Profile Image */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
              {/* Decorative Background Circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 animate-pulse-slow"></div>
              
              {/* Main Profile Image Container */}
              <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img 
                  src={profileImage} 
                  alt="Mohini Chatterjee - Career Consultant" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Accent Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-pink-500/50 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

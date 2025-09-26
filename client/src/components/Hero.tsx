import { Button } from "@/components/ui/button";
import mohiniImage from "@assets/WhatsApp Image 2024-12-12 at 10.53.11 PM(1)(1) - Mohini Chatterjee_1758871553313.png";

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
              ✨ Redefining Career Journeys with{" "}
              <span className="text-accent-foreground">Psychology, Purpose & Clarity</span> ✨
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
                🎯 Book a Free Discovery Call
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => scrollToSection("services")}
                className="bg-card text-foreground hover:bg-card/90 transition-all transform hover:scale-105 text-lg font-semibold px-8 py-4"
                data-testid="button-explore-services"
              >
                📘 Explore Our Services
              </Button>
            </div>
          </div>
          <div className="relative animate-fadeInUp-delay-2">
            <div className="animate-float">
              <img
                src={mohiniImage}
                alt="Ms. Mohini Chatterjee - Psychological Consultant"
                className="w-80 h-80 rounded-full object-cover border-8 border-white/20 shadow-2xl mx-auto"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full animate-pulse-slow"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

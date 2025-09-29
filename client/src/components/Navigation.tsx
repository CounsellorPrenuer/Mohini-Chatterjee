import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import aakarLogo from "@assets/Aakaar-logo - Mohini Chatterjee_1758871615977.png";

export default function Navigation() {
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/95 backdrop-blur-sm border-b border-border beam-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 interactive-hover">
            <img 
              src={aakarLogo} 
              alt="Aakaar Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain animate-glow"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 interactive-hover relative overflow-hidden"
              data-testid="nav-home"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 interactive-hover relative overflow-hidden"
              data-testid="nav-about"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 interactive-hover relative overflow-hidden"
              data-testid="nav-services"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 interactive-hover relative overflow-hidden"
              data-testid="nav-testimonials"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 interactive-hover relative overflow-hidden"
              data-testid="nav-blog"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 interactive-hover relative overflow-hidden"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-book-call"
            >
              Book Free Call
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("home")}
                className="text-foreground hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-foreground hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-foreground hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-testimonials"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="text-foreground hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-blog"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

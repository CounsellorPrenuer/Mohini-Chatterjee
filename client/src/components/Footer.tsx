import aakarLogo from "@assets/Aakaar-logo - Mohini Chatterjee_1758871615977.png";

export default function Footer() {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Career Guidance", href: "#services" },
        { name: "Admission Counselling", href: "#services" },
        { name: "Workshops", href: "#services" },
        { name: "Corporate Solutions", href: "#services" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Approach", href: "#about" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Blog", href: "#blog" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Refund Policy", href: "#" }
      ]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith("#")) {
      const element = document.getElementById(sectionId.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={aakarLogo} 
                alt="Aakaar Logo" 
                className="w-28 h-28 object-contain"
              />
            </div>
            <p className="text-background/80 mb-4">Shaping Lives Through Career Clarity</p>
            <p className="text-sm text-background/60">Powered by Mentoria's Career Discovery Platform</p>
            
            {/* Statistics */}
            <div className="mt-6 space-y-1 text-sm text-background/80">
              <p>3,50,000+ Students and Professionals Mentored</p>
              <p>240+ Corporate Partners</p>
              <p>350+ Schools and College Partners</p>
              <p>1000+ Hours of Career Webinars</p>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2 text-background/80">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="transition-colors text-left"
                      data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © 2025 Aakaar.com | Designed for Growth & Transformation
            </p>
            <p className="text-background/60 text-sm text-center md:text-right">
              Made with ❤️ by Mentoria | In partnership with Mentoria for enhanced career guidance services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Package as PackageIcon } from "lucide-react";
import type { ServicePackage } from "@shared/schema";
import PaymentDialog from "@/components/PaymentDialog";

export default function ServicePackages() {
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const { data: packages = [], isLoading } = useQuery<ServicePackage[]>({
    queryKey: ["/api/service-packages"],
  });

  const handleSelectPackage = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setIsPaymentDialogOpen(true);
  };

  if (isLoading) {
    return (
      <section id="service-packages" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-6">Our Service Packages</h2>
            <p className="text-xl text-muted-foreground">Choose the perfect package for your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-8">
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-20 bg-muted rounded mb-4"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) {
    return null;
  }

  return (
    <>
      <section id="service-packages" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-6 animate-glow">Our Service Packages</h2>
            <p className="text-xl text-muted-foreground animate-slideInRight">
              Choose the perfect package tailored to your career development needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.id} 
                className="card-hover animate-fadeInUp overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`package-card-${index}`}
              >
                <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <PackageIcon className="w-8 h-8 text-primary" />
                    </div>
                    {pkg.category && (
                      <Badge variant="secondary" className="mt-2">
                        {pkg.category}
                      </Badge>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold" data-testid={`package-name-${index}`}>
                    {pkg.name}
                  </CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary" data-testid={`package-price-${index}`}>
                      ₹{(pkg.price / 100).toLocaleString()}
                    </span>
                    {pkg.duration && (
                      <span className="text-muted-foreground">/ {pkg.duration}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground" data-testid={`package-description-${index}`}>
                    {pkg.description}
                  </p>
                  
                  {pkg.features && pkg.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">What's Included:</h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full gradient-bg"
                    onClick={() => handleSelectPackage(pkg)}
                    data-testid={`button-book-package-${index}`}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PaymentDialog 
        isOpen={isPaymentDialogOpen}
        onClose={() => {
          setIsPaymentDialogOpen(false);
          setSelectedPackage(null);
        }}
        selectedPackage={selectedPackage}
      />
    </>
  );
}

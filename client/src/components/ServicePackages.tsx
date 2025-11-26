import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Package as PackageIcon } from "lucide-react";
import type { ServicePackage } from "@shared/schema";
import PaymentDialog from "@/components/PaymentDialog";

const categories = [
  { value: "all", label: "All Packages" },
  { value: "8th-9th-students", label: "8th-9th Students" },
  { value: "10th-12th-students", label: "10th-12th Students" },
  { value: "college-graduates", label: "College Graduates" },
  { value: "working-professionals", label: "Working Professionals" },
];

export default function ServicePackages() {
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: packages = [], isLoading } = useQuery<ServicePackage[]>({
    queryKey: ["/api/service-packages"],
  });

  const handleSelectPackage = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setIsPaymentDialogOpen(true);
  };

  const filteredPackages = selectedCategory === "all" 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  const getCategoryLabel = (categoryValue: string) => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  if (isLoading) {
    return (
      <section id="service-packages" className="py-8 md:py-10 bg-card">
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
      <section id="service-packages" className="py-8 md:py-10 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold gradient-text mb-3 animate-glow">Our Service Packages</h2>
            <p className="text-lg text-muted-foreground animate-slideInRight">
              Choose the perfect package tailored to your career development needs
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                variant={selectedCategory === category.value ? "default" : "outline"}
                className={selectedCategory === category.value ? "gradient-bg" : ""}
                data-testid={`filter-${category.value}`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {filteredPackages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No packages available in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPackages.map((pkg, index) => (
                <Card 
                  key={pkg.id} 
                  className="card-hover animate-fadeInUp overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`package-card-${index}`}
                >
                <div className="h-20 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center mx-auto">
                      <PackageIcon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl font-bold flex-1 break-words" data-testid={`package-name-${index}`}>
                      {pkg.name}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0 text-xs" data-testid={`package-category-${index}`}>
                      {getCategoryLabel(pkg.category)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <p className="text-sm text-muted-foreground break-words" data-testid={`package-description-${index}`}>
                    {pkg.description}
                  </p>
                  
                  {pkg.features && pkg.features.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="font-semibold text-xs break-words">What's Included:</h4>
                      <ul className="space-y-1.5">
                        {pkg.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-1.5 text-xs">
                            <Check className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="break-words flex-1">{feature}</span>
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
          )}
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

import { useState } from "react";
import PricingTabs from "@/components/PricingTabs";
import CustomPlans from "@/components/CustomPlans";
import BookingModal from "@/components/booking-modal";
import { useCms } from "@/hooks/useCms";
import type { CustomPlan, StandardPlan } from "@/lib/sanity";

type SelectedPlan = {
  planId: string;
  title: string;
  category: string;
  price: number;
};

export default function ServicePackages() {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const { data } = useCms();

  const standardPlans = data?.standardPlans ?? [];
  const customPlans = data?.customPlans ?? [];

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

          <PricingTabs
            plans={standardPlans}
            onBuyClick={(plan: StandardPlan, category: string) =>
              setSelectedPlan({ planId: plan.planId, title: plan.title, category, price: plan.price })
            }
          />
          <CustomPlans
            plans={customPlans}
            onBuyClick={(plan: CustomPlan) =>
              setSelectedPlan({ planId: plan.planId, title: plan.title, category: "Custom Mentorship", price: plan.price })
            }
          />
        </div>
      </section>

      {selectedPlan && (
        <BookingModal
          open
          onOpenChange={(open) => !open && setSelectedPlan(null)}
          {...selectedPlan}
        />
      )}
    </>
  );
}

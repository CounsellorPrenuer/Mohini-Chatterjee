import { useEffect, useRef } from "react";
import { useCounter } from "@/hooks/use-counter";

interface StatisticProps {
  end: number;
  label: string;
  suffix?: string;
}

function Statistic({ end, label, suffix = "" }: StatisticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(end, ref);

  return (
    <div ref={ref} className="p-6 text-center">
      <div className="stats-counter" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {count}{suffix}
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="py-8 md:py-10 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Statistic end={10} label="+ Years of Expertise" />
          <Statistic end={5000} label="+ Individuals Impacted" />
          <Statistic end={100} label="+ Seminars Delivered" />
          <Statistic end={95} label="% Client Satisfaction" suffix="%" />
        </div>
      </div>
    </section>
  );
}

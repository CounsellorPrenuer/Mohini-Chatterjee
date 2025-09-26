import { useState, useEffect, useRef } from "react";

export function useCounter(end: number, observerRef: React.RefObject<HTMLElement>) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            startCounting();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [observerRef, hasStarted]);

  const startCounting = () => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const increment = end / steps;
    const stepDuration = duration / steps;

    let currentCount = 0;
    
    intervalRef.current = setInterval(() => {
      currentCount += increment;
      
      if (currentCount >= end) {
        setCount(end);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        setCount(Math.floor(currentCount));
      }
    }, stepDuration);
  };

  return count;
}

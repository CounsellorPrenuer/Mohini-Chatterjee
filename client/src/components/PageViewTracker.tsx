import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function PageViewTracker() {
  const [location] = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location);
  }, [location, trackPageView]);

  // This component doesn't render anything
  return null;
}
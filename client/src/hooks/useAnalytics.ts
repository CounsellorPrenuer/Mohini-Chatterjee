import { useEffect, useRef } from 'react';
import { apiRequest } from '@/lib/queryClient';

// Generate a unique session ID that persists during the browser session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('aakaar_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('aakaar_session_id', sessionId);
  }
  return sessionId;
};

// Detect device type
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Detect browser and OS
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = 'unknown';
  let osName = 'unknown';
  
  // Detect browser
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browserName = 'Chrome';
  else if (userAgent.includes('Firefox')) browserName = 'Firefox';
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browserName = 'Safari';
  else if (userAgent.includes('Edge')) browserName = 'Edge';
  
  // Detect OS
  if (userAgent.includes('Windows')) osName = 'Windows';
  else if (userAgent.includes('Mac')) osName = 'macOS';
  else if (userAgent.includes('Linux')) osName = 'Linux';
  else if (userAgent.includes('Android')) osName = 'Android';
  else if (userAgent.includes('iOS')) osName = 'iOS';
  
  return { browserName, osName };
};

// Extract UTM parameters from URL
const getUtmParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
  };
};

interface AnalyticsSession {
  sessionId: string;
  referrer?: string;
  deviceType: string;
  browserName: string;
  osName: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export const useAnalytics = () => {
  const sessionRef = useRef<AnalyticsSession | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const pageStartTimeRef = useRef<number>(Date.now());
  const currentPathRef = useRef<string>('/');
  const heartbeatIntervalRef = useRef<NodeJS.Timeout>();

  // Initialize session and set up tracking
  useEffect(() => {
    const initSession = async () => {
      try {
        const sessionId = getSessionId();
        const { browserName, osName } = getBrowserInfo();
        const utmParams = getUtmParams();
        
        const sessionData = {
          sessionId,
          referrer: document.referrer || undefined,
          deviceType: getDeviceType(),
          browserName,
          osName,
          ...utmParams,
        };

        sessionRef.current = sessionData;
        startTimeRef.current = Date.now();
        
        // Track initial session with backend
        await apiRequest('POST', '/api/analytics/session', sessionData);
        
        // Set up session duration tracking
        const updateSessionDuration = async () => {
          if (!sessionRef.current) return;
          
          const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
          try {
            await apiRequest('POST', '/api/analytics/session', {
              sessionId: sessionRef.current.sessionId,
              duration,
            });
          } catch (error) {
            console.error('Session duration update error:', error);
          }
        };
        
        // Update session duration every 30 seconds
        heartbeatIntervalRef.current = setInterval(updateSessionDuration, 30000);
        
        // Update on page visibility change
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'hidden') {
            updateSessionDuration();
          }
        };
        
        // Update on page unload
        const handleBeforeUnload = () => {
          updateSessionDuration();
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        // Cleanup function
        return () => {
          if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
          }
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          window.removeEventListener('beforeunload', handleBeforeUnload);
          updateSessionDuration(); // Final update
        };
      } catch (error) {
        console.error('Analytics session error:', error);
      }
    };

    const cleanup = initSession();
    return () => {
      if (cleanup instanceof Promise) {
        cleanup.then(fn => fn?.());
      }
    };
  }, []);

  // Track page view with time on page measurement
  const trackPageView = async (path: string, title?: string) => {
    if (!sessionRef.current) return;

    // Update time on page for previous page
    if (currentPathRef.current !== path && currentPathRef.current !== '/') {
      const timeOnPage = Math.floor((Date.now() - pageStartTimeRef.current) / 1000);
      try {
        await apiRequest('POST', '/api/analytics/pageview', {
          sessionId: sessionRef.current.sessionId,
          path: currentPathRef.current,
          timeOnPage,
          exitPage: true,
        });
      } catch (error) {
        console.error('Exit page tracking error:', error);
      }
    }

    // Track new page view
    try {
      currentPathRef.current = path;
      pageStartTimeRef.current = Date.now();
      
      await apiRequest('POST', '/api/analytics/pageview', {
        sessionId: sessionRef.current.sessionId,
        path,
        title: title || document.title,
      });
    } catch (error) {
      console.error('Analytics page view error:', error);
    }
  };

  // Track custom event
  const trackEvent = async (eventType: string, eventName: string, metadata?: any, value?: number) => {
    if (!sessionRef.current) return;

    try {
      await apiRequest('POST', '/api/analytics/event', {
        sessionId: sessionRef.current.sessionId,
        eventType,
        eventName,
        path: window.location.pathname,
        metadata,
        value: value || 0,
      });
    } catch (error) {
      console.error('Analytics event error:', error);
    }
  };

  // Track form submission
  const trackFormSubmit = (formName: string, formData?: any) => {
    trackEvent('form_submit', formName, formData);
  };

  // Track button click
  const trackButtonClick = (buttonName: string, metadata?: any) => {
    trackEvent('button_click', buttonName, metadata);
  };

  // Track scroll depth
  const trackScrollDepth = (depth: number) => {
    trackEvent('scroll', 'depth', { depth });
  };

  return {
    trackPageView,
    trackEvent,
    trackFormSubmit,
    trackButtonClick,
    trackScrollDepth,
    sessionId: sessionRef.current?.sessionId,
  };
};

export default useAnalytics;
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart3, 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Globe,
  Smartphone,
  Monitor,
  Tablet 
} from "lucide-react";

interface AnalyticsSummary {
  totalSessions: number;
  totalPageViews: number;
  totalEvents: number;
  avgSessionDuration: number;
  topPages: Array<{ path: string; views: number }>;
  topReferrers: Array<{ referrer: string; sessions: number }>;
  deviceBreakdown: Array<{ deviceType: string; count: number }>;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${Math.round(seconds % 60)}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function getDeviceIcon(deviceType: string) {
  switch (deviceType.toLowerCase()) {
    case 'mobile':
      return <Smartphone className="h-4 w-4" />;
    case 'tablet':
      return <Tablet className="h-4 w-4" />;
    case 'desktop':
      return <Monitor className="h-4 w-4" />;
    default:
      return <Monitor className="h-4 w-4" />;
  }
}

export default function AnalyticsDashboard() {
  const { data: analytics, isLoading, error } = useQuery<AnalyticsSummary>({
    queryKey: ['/api/admin/analytics/summary'],
  });

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          <p>Failed to load analytics data.</p>
          <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <div className="text-center text-muted-foreground">
          <p>No analytics data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" data-testid="analytics-dashboard">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold gradient-text">Analytics Overview</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card data-testid="metric-sessions">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Sessions</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">{analytics.totalSessions.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>

        <Card data-testid="metric-pageviews">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Page Views</CardDescription>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">{analytics.totalPageViews.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>

        <Card data-testid="metric-events">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Events</CardDescription>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">{analytics.totalEvents.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>

        <Card data-testid="metric-duration">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Avg. Session</CardDescription>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">{formatDuration(analytics.avgSessionDuration)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card data-testid="top-pages">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Top Pages</span>
            </CardTitle>
            <CardDescription>Most visited pages on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topPages.length > 0 ? (
                analytics.topPages.map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="font-medium text-sm">
                        {page.path === '/' ? 'Home' : page.path}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {page.views.toLocaleString()} views
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground text-sm">No page view data yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card data-testid="top-referrers">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Top Referrers</span>
            </CardTitle>
            <CardDescription>Traffic sources bringing visitors to your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topReferrers.length > 0 ? (
                analytics.topReferrers.map((referrer, index) => (
                  <div key={referrer.referrer} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="font-medium text-sm truncate" title={referrer.referrer}>
                        {new URL(referrer.referrer).hostname}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {referrer.sessions.toLocaleString()} sessions
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground text-sm">No referrer data yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card data-testid="device-breakdown" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="h-5 w-5" />
              <span>Device Breakdown</span>
            </CardTitle>
            <CardDescription>How visitors access your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analytics.deviceBreakdown.length > 0 ? (
                analytics.deviceBreakdown.map((device) => (
                  <div key={device.deviceType} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getDeviceIcon(device.deviceType)}
                      <span className="font-medium capitalize">{device.deviceType}</span>
                    </div>
                    <span className="text-lg font-semibold">{device.count.toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-muted-foreground text-sm">
                  No device data yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
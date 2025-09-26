import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/admin/Dashboard";
import BlogManager from "@/components/admin/BlogManager";
import TestimonialManager from "@/components/admin/TestimonialManager";
import ContactManager from "@/components/admin/ContactManager";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import LoginForm from "@/components/admin/LoginForm";
import { useLocation } from "wouter";
import { ArrowLeft, Settings, BarChart3, FileText, MessageSquare, Mail, LogOut, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Check authentication status
  const { data: authData, isLoading: authLoading, refetch: refetchAuth } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('POST', '/api/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear(); // Clear all queries on logout
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of the admin dashboard.",
      });
      refetchAuth();
    },
    onError: (error: any) => {
      toast({
        title: "Logout failed",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    },
  });

  const handleLoginSuccess = () => {
    refetchAuth();
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authData?.authenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              data-testid="button-back-home"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Website
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl font-bold gradient-text">Aakaar Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Welcome, {authData?.username}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {logoutMutation.isPending ? "Signing out..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen">
          <nav className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
              <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent p-0 space-y-1">
                <TabsTrigger
                  value="dashboard"
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="tab-dashboard"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="blog"
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="tab-blog"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Blog Posts
                </TabsTrigger>
                <TabsTrigger
                  value="testimonials"
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="tab-testimonials"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Testimonials
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="tab-analytics"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="contacts"
                  className="w-full justify-start px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="tab-contacts"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Forms
                </TabsTrigger>
              </TabsList>

              {/* Main Content */}
              <div className="flex-1">
                <TabsContent value="dashboard" className="mt-0">
                  <Dashboard />
                </TabsContent>
                <TabsContent value="blog" className="mt-0">
                  <BlogManager />
                </TabsContent>
                <TabsContent value="testimonials" className="mt-0">
                  <TestimonialManager />
                </TabsContent>
                <TabsContent value="analytics" className="mt-0">
                  <AnalyticsDashboard />
                </TabsContent>
                <TabsContent value="contacts" className="mt-0">
                  <ContactManager />
                </TabsContent>
              </div>
            </Tabs>
          </nav>
        </div>

        {/* Content area handled by Tabs */}
        <div className="flex-1" />
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/admin/Dashboard";
import BlogManager from "@/components/admin/BlogManager";
import TestimonialManager from "@/components/admin/TestimonialManager";
import ContactManager from "@/components/admin/ContactManager";
import { useLocation } from "wouter";
import { ArrowLeft, Settings, BarChart3, FileText, MessageSquare, Mail } from "lucide-react";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

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
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Admin Panel</span>
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

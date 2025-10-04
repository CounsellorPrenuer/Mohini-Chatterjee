import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Mail, 
  TrendingUp,
  Calendar,
  Plus 
} from "lucide-react";
import type { BlogPost, Testimonial, Contact } from "@shared/schema";

export default function Dashboard() {
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog-posts"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
  });

  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const stats = [
    {
      title: "Contact Forms",
      value: contacts.length.toString(),
      change: `${contacts.filter(c => c.status === 'new').length} new this month`,
      icon: Mail,
      color: "text-secondary"
    },
    {
      title: "Blog Posts",
      value: blogPosts.length.toString(),
      change: `${blogPosts.filter(p => p.status === 'published').length} published`,
      icon: FileText,
      color: "text-accent"
    },
    {
      title: "Testimonials",
      value: testimonials.length.toString(),
      change: `${testimonials.filter(t => t.status === 'approved').length} approved`,
      icon: MessageSquare,
      color: "text-foreground"
    }
  ];

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} data-testid={`stat-card-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

  
      {/* Recent Contacts */}
      {contacts.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Contact Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.slice(0, 5).map((contact, index) => (
                <div key={contact.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                    <p className="text-xs text-muted-foreground">{contact.service}</p>
                  </div>
                  <Badge variant={contact.status === 'new' ? 'default' : 'secondary'}>
                    {contact.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

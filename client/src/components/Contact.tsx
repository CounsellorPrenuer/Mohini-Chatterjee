import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { insertContactSchema } from "@shared/schema";

const contactFormSchema = insertContactSchema.extend({
  phone: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { trackFormSubmit, trackButtonClick } = useAnalytics();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const submitContact = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: (data, variables) => {
      // Track successful form submission for conversion analytics
      trackFormSubmit('contact_form', {
        service: variables.service,
        hasPhone: !!variables.phone,
        messageLength: variables.message?.length || 0,
      });
      
      toast({
        title: "Thank you for your interest!",
        description: "We will get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit contact form. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitContact.mutate(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "9826912569",
      color: "bg-primary"
    },
    {
      icon: Mail,
      title: "Email",
      value: "mhn.chatterjee@gmail.com",
      color: "bg-secondary"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Bhopal, Madhya Pradesh (Available online & in-person by appointment)",
      color: "bg-accent"
    }
  ];

  return (
    <section id="contact" className="py-8 md:py-10 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 break-words">Let's Start Your Journey</h2>
          <p className="text-lg md:text-xl text-muted-foreground break-words">"Let's build your future together – one decision at a time."</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-fadeInUp">
            <h3 className="text-xl md:text-2xl font-bold mb-8 break-words">Get in Touch</h3>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold break-words">{info.title}</h4>
                      <p className="text-muted-foreground break-words">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button
                  variant="default"
                  size="icon"
                  className="bg-primary hover:bg-primary/80"
                  asChild
                >
                  <a 
                    href="https://www.linkedin.com/in/mohini-chatterjee-84709a16/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="link-linkedin"
                    onClick={() => trackButtonClick('linkedin_link', { source: 'contact_page' })}
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="bg-secondary hover:bg-secondary/80"
                  data-testid="link-facebook"
                  onClick={() => trackButtonClick('facebook_link', { source: 'contact_page' })}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="bg-accent hover:bg-accent/80"
                  data-testid="link-instagram"
                  onClick={() => trackButtonClick('instagram_link', { source: 'contact_page' })}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <Card className="animate-fadeInUp-delay-1">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            {...field} 
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email" 
                            {...field} 
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Enter your phone number" 
                            {...field} 
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interested In *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Career Guidance">Career Guidance</SelectItem>
                            <SelectItem value="Admission Counselling">Admission Counselling</SelectItem>
                            <SelectItem value="Corporate Workshop">Corporate Workshop</SelectItem>
                            <SelectItem value="Personal Coaching">Personal Coaching</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your needs" 
                            className="min-h-[100px]" 
                            {...field} 
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                    disabled={submitContact.isPending}
                    data-testid="button-submit-contact"
                  >
                    {submitContact.isPending ? "Sending..." : "Book My Free Career Discovery Call →"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

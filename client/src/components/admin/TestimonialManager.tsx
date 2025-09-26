import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { insertTestimonialSchema, type Testimonial } from "@shared/schema";

const testimonialFormSchema = insertTestimonialSchema;
type TestimonialFormData = z.infer<typeof testimonialFormSchema>;

export default function TestimonialManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
  });

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      role: "",
      content: "",
      rating: 5,
      imageUrl: "",
      status: "pending",
    },
  });

  const createTestimonial = useMutation({
    mutationFn: async (data: TestimonialFormData) => {
      return await apiRequest("POST", "/api/admin/testimonials", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Testimonial created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create testimonial",
        variant: "destructive",
      });
    },
  });

  const updateTestimonial = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TestimonialFormData> }) => {
      return await apiRequest("PUT", `/api/admin/testimonials/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Testimonial updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setIsDialogOpen(false);
      setEditingTestimonial(null);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      });
    },
  });

  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/testimonials/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TestimonialFormData) => {
    if (editingTestimonial) {
      updateTestimonial.mutate({ id: editingTestimonial.id, data });
    } else {
      createTestimonial.mutate(data);
    }
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    form.reset({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating,
      imageUrl: testimonial.imageUrl || "",
      status: testimonial.status,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingTestimonial(null);
    form.reset();
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div className="p-8 w-full">Loading...</div>;
  }

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold gradient-text">Testimonials Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} data-testid="button-create-testimonial">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter client name" {...field} data-testid="input-testimonial-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Student, Professional" {...field} data-testid="input-testimonial-role" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Testimonial Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter the testimonial content" 
                          className="min-h-[120px]"
                          {...field} 
                          data-testid="textarea-testimonial-content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger data-testid="select-testimonial-rating">
                              <SelectValue placeholder="Rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Star</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="5">5 Stars</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-testimonial-status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Profile image URL" {...field} value={field.value || ""} data-testid="input-testimonial-image" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createTestimonial.isPending || updateTestimonial.isPending}
                    data-testid="button-save-testimonial"
                  >
                    {createTestimonial.isPending || updateTestimonial.isPending 
                      ? "Saving..." 
                      : editingTestimonial ? "Update Testimonial" : "Add Testimonial"
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(testimonial)}
                    data-testid={`button-edit-testimonial-${testimonial.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTestimonial.mutate(testimonial.id)}
                    className="text-destructive hover:text-destructive"
                    data-testid={`button-delete-testimonial-${testimonial.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground italic text-sm mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex justify-between items-center">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Badge 
                  variant={
                    testimonial.status === 'approved' ? 'default' : 
                    testimonial.status === 'rejected' ? 'destructive' : 'secondary'
                  }
                >
                  {testimonial.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No testimonials found. Add your first testimonial!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

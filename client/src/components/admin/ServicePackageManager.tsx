import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Package, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertServicePackageSchema, type ServicePackage } from "@shared/schema";
import { z } from "zod";

const servicePackageFormSchema = insertServicePackageSchema.extend({
  features: z.array(z.string()).min(1, "At least one feature is required"),
  price: z.coerce.number().min(1, "Price must be at least ₹1"),
});

type ServicePackageFormData = z.infer<typeof servicePackageFormSchema>;

export default function ServicePackageManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<ServicePackage | null>(null);
  const [featuresInput, setFeaturesInput] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: packages = [], isLoading } = useQuery<ServicePackage[]>({
    queryKey: ["/api/admin/service-packages"],
  });

  const form = useForm<ServicePackageFormData>({
    resolver: zodResolver(servicePackageFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      duration: "",
      features: [],
      category: "",
      isActive: true,
    },
  });

  const createPackage = useMutation({
    mutationFn: async (data: ServicePackageFormData) => {
      return await apiRequest("POST", "/api/admin/service-packages", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Service package created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/service-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/service-packages"] });
      setIsDialogOpen(false);
      form.reset();
      setFeaturesInput("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create service package",
        variant: "destructive",
      });
    },
  });

  const updatePackage = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ServicePackageFormData> }) => {
      return await apiRequest("PUT", `/api/admin/service-packages/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Service package updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/service-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/service-packages"] });
      setIsDialogOpen(false);
      setEditingPackage(null);
      form.reset();
      setFeaturesInput("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update service package",
        variant: "destructive",
      });
    },
  });

  const deletePackage = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/service-packages/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Service package deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/service-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/service-packages"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete service package",
        variant: "destructive",
      });
    },
  });

  const seedPackages = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/admin/service-packages/seed");
    },
    onSuccess: (data: any) => {
      toast({
        title: "Seed Completed",
        description: data.message || "Service packages seeded successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/service-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/service-packages"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to seed service packages",
        variant: "destructive",
      });
    },
  });

  const reseedPackages = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/admin/service-packages/reseed");
    },
    onSuccess: (data: any) => {
      toast({
        title: "Reseed Completed",
        description: data.message || "Service packages reseeded successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/service-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/service-packages"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reseed service packages",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ServicePackageFormData) => {
    // Parse features from comma-separated string
    const features = featuresInput.split(',').map(f => f.trim()).filter(f => f.length > 0);
    // Convert rupees to paise for storage (₹50 becomes 5000 paise)
    const priceInPaise = Math.round(data.price * 100);
    const packageData = { ...data, price: priceInPaise, features };

    if (editingPackage) {
      updatePackage.mutate({ id: editingPackage.id, data: packageData });
    } else {
      createPackage.mutate(packageData);
    }
  };

  const handleEdit = (pkg: ServicePackage) => {
    setEditingPackage(pkg);
    // Convert paise to rupees for display (5000 paise becomes ₹50)
    const priceInRupees = pkg.price / 100;
    form.reset({
      name: pkg.name,
      description: pkg.description,
      price: priceInRupees,
      duration: pkg.duration || "",
      features: pkg.features,
      category: pkg.category,
      isActive: pkg.isActive,
    });
    setFeaturesInput(pkg.features.join(", "));
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service package?")) {
      deletePackage.mutate(id);
    }
  };

  const formatPrice = (priceInPaise: number) => {
    return `₹${(priceInPaise / 100).toFixed(2)}`;
  };

  if (isLoading) {
    return <div className="p-8 w-full">Loading...</div>;
  }

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Service Package Management</h2>
        <p className="text-muted-foreground">Create and manage your service offerings</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Packages</p>
                <p className="text-3xl font-bold">{packages.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Packages</p>
                <p className="text-3xl font-bold">{packages.filter(p => p.isActive).length}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Price</p>
                <p className="text-3xl font-bold">
                  {packages.length > 0 
                    ? formatPrice(packages.reduce((sum, p) => sum + p.price, 0) / packages.length)
                    : "$0.00"
                  }
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Package Button */}
      <div className="mb-6 flex gap-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPackage(null);
              form.reset();
              setFeaturesInput("");
            }} data-testid="button-add-package">
              <Plus className="h-4 w-4 mr-2" />
              Add Service Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPackage ? "Edit Service Package" : "Add New Service Package"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Career Assessment Package" data-testid="input-package-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="8th-9th-students">8th-9th Students</SelectItem>
                            <SelectItem value="10th-12th-students">10th-12th Students</SelectItem>
                            <SelectItem value="college-graduates">College Graduates</SelectItem>
                            <SelectItem value="working-professionals">Working Professionals</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Comprehensive career assessment including personality tests, skills evaluation, and career path recommendations..."
                          rows={4}
                          data-testid="textarea-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number" 
                            min="1" 
                            step="0.01"
                            placeholder="50" 
                            data-testid="input-price"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground mt-1">
                          Enter amount in rupees. Example: 50 for ₹50, 100 for ₹100
                        </p>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="2 hours" data-testid="input-duration" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Features (comma-separated)</label>
                  <Textarea
                    value={featuresInput}
                    onChange={(e) => {
                      setFeaturesInput(e.target.value);
                      const features = e.target.value.split(',').map(f => f.trim()).filter(f => f.length > 0);
                      form.setValue('features', features);
                    }}
                    placeholder="Personality assessment, Skills evaluation, Career recommendations, Follow-up session"
                    rows={3}
                    className="mt-2"
                    data-testid="textarea-features"
                  />
                  {form.formState.errors.features && (
                    <p className="text-sm font-medium text-destructive mt-2">
                      {form.formState.errors.features.message}
                    </p>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Package</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Make this package available for booking
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-active"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createPackage.isPending || updatePackage.isPending}
                    data-testid="button-save-package"
                  >
                    {editingPackage ? "Update Package" : "Create Package"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Button 
          variant="outline" 
          onClick={() => {
            if (confirm("This will add default service packages to the database. Existing packages won't be duplicated. Continue?")) {
              seedPackages.mutate();
            }
          }}
          disabled={seedPackages.isPending}
          data-testid="button-seed-packages"
        >
          <Package className="h-4 w-4 mr-2" />
          {seedPackages.isPending ? "Seeding..." : "Seed Default Packages"}
        </Button>
        <Button 
          variant="destructive" 
          onClick={() => {
            if (confirm("⚠️ WARNING: This will DELETE ALL existing packages and replace them with the default packages. This action cannot be undone. Continue?")) {
              reseedPackages.mutate();
            }
          }}
          disabled={reseedPackages.isPending}
          data-testid="button-reseed-packages"
        >
          <Package className="h-4 w-4 mr-2" />
          {reseedPackages.isPending ? "Reseeding..." : "Reseed Packages"}
        </Button>
      </div>

      {/* Packages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{pkg.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatPrice(pkg.price)}
                  </TableCell>
                  <TableCell>{pkg.duration || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={pkg.isActive ? "default" : "secondary"}>
                      {pkg.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(pkg)}
                        data-testid={`button-edit-package-${pkg.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(pkg.id)}
                        data-testid={`button-delete-package-${pkg.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {packages.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No service packages found. Add your first package!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
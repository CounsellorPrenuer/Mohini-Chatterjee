import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Eye, Mail, Phone, Calendar } from "lucide-react";
import type { Contact } from "@shared/schema";

export default function ContactManager() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/admin/contacts"],
  });

  const updateContactStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PUT", `/api/admin/contacts/${id}/status`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Contact status updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update contact status",
        variant: "destructive",
      });
    },
  });

  const viewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewDialogOpen(true);
  };

  const handleStatusChange = (contactId: string, newStatus: string) => {
    updateContactStatus.mutate({ id: contactId, status: newStatus });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'responded': return 'secondary';
      case 'closed': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'responded': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return <div className="p-8 w-full">Loading...</div>;
  }

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Contact Form Submissions</h2>
        <p className="text-muted-foreground">Manage and respond to client inquiries</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                <p className="text-3xl font-bold">{contacts.length}</p>
              </div>
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Inquiries</p>
                <p className="text-3xl font-bold text-blue-600">
                  {contacts.filter(c => c.status === 'new').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-3xl font-bold text-green-600">
                  {contacts.length > 0 
                    ? Math.round((contacts.filter(c => c.status === 'responded').length / contacts.length) * 100)
                    : 0
                  }%
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Contact Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.service}</TableCell>
                  <TableCell>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={contact.status}
                      onValueChange={(value) => handleStatusChange(contact.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <Badge variant={getStatusBadgeVariant(contact.status)}>
                          {contact.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="responded">Responded</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewContact(contact)}
                        data-testid={`button-view-contact-${contact.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        data-testid={`button-email-contact-${contact.id}`}
                      >
                        <a href={`mailto:${contact.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                      {contact.phone && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          data-testid={`button-call-contact-${contact.id}`}
                        >
                          <a href={`tel:${contact.phone}`}>
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {contacts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No contact submissions found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Contact Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">NAME</h4>
                  <p className="text-lg font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">STATUS</h4>
                  <Badge variant={getStatusBadgeVariant(selectedContact.status)}>
                    {selectedContact.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">EMAIL</h4>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">PHONE</h4>
                  <p className="font-medium">{selectedContact.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">SERVICE INTERESTED</h4>
                  <p className="font-medium">{selectedContact.service}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">SUBMITTED ON</h4>
                  <p className="font-medium">
                    {new Date(selectedContact.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">MESSAGE</h4>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button asChild>
                  <a href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.service} Inquiry&body=Hi ${selectedContact.name},%0A%0AThank you for your interest in our ${selectedContact.service} service.%0A%0A`}>
                    Reply via Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

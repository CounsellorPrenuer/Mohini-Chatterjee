import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ServicePackage } from "@shared/schema";
import { z } from "zod";
import { Loader2, CreditCard } from "lucide-react";

const paymentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string()
    .transform(val => val.replace(/[\s\-\(\)]/g, '').replace(/^\+91/, ''))
    .pipe(z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number")),
});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: ServicePackage | null;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentDialog({ isOpen, onClose, selectedPackage }: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { toast } = useToast();

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          setScriptLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setScriptLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          setScriptLoaded(false);
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async (data: PaymentFormData) => {
    if (!selectedPackage) {
      toast({
        title: "Error",
        description: "Please select a package",
        variant: "destructive",
      });
      return;
    }

    if (!scriptLoaded) {
      toast({
        title: "Error",
        description: "Payment system is loading. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderResponse = await apiRequest("POST", "/api/payments/create-order", {
        amount: selectedPackage.price,
        packageId: selectedPackage.id,
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
      }) as any;

      console.log("Order Response from server:", orderResponse);
      console.log("Amount to be charged:", orderResponse.amount, "paise =", orderResponse.amount / 100, "rupees");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: "Aakaar Career Consulting",
        description: selectedPackage.name,
        order_id: orderResponse.orderId,
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#ec4899",
        },
        handler: async (response: any) => {
          try {
            const verifyResponse = await apiRequest("POST", "/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId: orderResponse.paymentId,
            });

            toast({
              title: "Payment Successful!",
              description: "Your booking has been confirmed. We'll contact you shortly.",
            });

            form.reset();
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support with your payment details.",
              variant: "destructive",
            });
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
            });
          },
        },
      };

      // Close the modal before opening Razorpay
      form.reset();
      onClose();

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Complete Your Booking</DialogTitle>
        </DialogHeader>

        {selectedPackage && (
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-lg">{selectedPackage.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedPackage.description}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} data-testid="input-payment-name" />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-payment-email" />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="10-digit mobile number" {...field} data-testid="input-payment-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isProcessing}
                className="flex-1"
                data-testid="button-cancel-payment"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing || !scriptLoaded}
                className="flex-1 gradient-bg"
                data-testid="button-proceed-payment"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Pay
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

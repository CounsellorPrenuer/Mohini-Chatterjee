import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <section id="testimonials" className="py-8 md:py-10 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-6">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">Real stories of transformation and success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-8">
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-20 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback testimonials if none exist in database
  const fallbackTestimonials = [
    {
      id: "1",
      name: "Ananya Gupta",
      role: "Class 12 Student",
      content: "Before meeting Ms. Mohini, I was completely confused about whether to take up Science or Commerce. The psychometric assessment gave me so much clarity. Today, I'm confidently preparing for my dream career in law.",
      rating: 5,
      imageUrl: null,
      status: "approved",
      createdAt: new Date()
    },
    {
      id: "2",
      name: "Rahul Mehta",
      role: "Engineering Graduate",
      content: "I had finished my degree but wasn't sure about my next step. Ms. Mohini helped me identify my strengths and guided me toward higher studies abroad. The admission guidance were spot-on.",
      rating: 5,
      imageUrl: null,
      status: "approved",
      createdAt: new Date()
    },
    {
      id: "3",
      name: "Mrs. Priya Nair",
      role: "Parent",
      content: "As a parent, I wanted my child to choose a career path based on strengths, not peer pressure. Ms. Mohini's session gave us a roadmap and removed all the stress around decision-making.",
      rating: 5,
      imageUrl: null,
      status: "approved",
      createdAt: new Date()
    },
    {
      id: "4",
      name: "Amit Sharma",
      role: "IT Professional",
      content: "I was stuck in the same role for years. Through career coaching, I discovered transferable skills and redesigned my resume. Within 3 months, I got a promotion into a leadership role.",
      rating: 5,
      imageUrl: null,
      status: "approved",
      createdAt: new Date()
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-6">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">Real stories of transformation and success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTestimonials.slice(0, 4).map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="card-hover animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold" data-testid={`testimonial-name-${index}`}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`testimonial-role-${index}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic text-sm mb-4" data-testid={`testimonial-content-${index}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

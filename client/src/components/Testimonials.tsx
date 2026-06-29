import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useCms } from "@/hooks/useCms";
import { imageUrl } from "@/lib/sanity";

export default function Testimonials() {
  const { data } = useCms();
  const testimonials = data?.testimonials ?? [];

  return (
    <section id="testimonials" className="py-8 md:py-10 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-6">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">Real stories of transformation and success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial._id}
              className="card-hover animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-8">
                {testimonial.image && (
                  <img
                    src={imageUrl(testimonial.image, 200)}
                    alt={testimonial.image.alt || testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mb-4 mx-auto"
                    loading="lazy"
                  />
                )}
                <div className="flex justify-center mb-4">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic line-clamp-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="text-center">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

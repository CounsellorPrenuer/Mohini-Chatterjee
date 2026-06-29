import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, X } from "lucide-react";
import { useCms } from "@/hooks/useCms";
import { imageUrl, type BlogPost } from "@/lib/sanity";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const { data } = useCms();

  const posts = data?.blogPosts ?? [];

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    document.body.style.overflow = "auto";
  };

  const displayPosts = showAllPosts ? posts : posts.slice(0, 3);

  return (
    <>
      <section id="blog" className="py-8 md:py-10 bg-muted/30 beam-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4 md:mb-6 animate-glow">Latest from Our Blog</h2>
            <p className="text-lg md:text-xl text-muted-foreground animate-slideInRight">Insights on career planning, psychology, and personal growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayPosts.map((post, index) => (
              <Card
                key={post._id}
                className="card-hover animate-fadeInUp overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`blog-card-${index}`}
              >
                {post.image ? (
                  <img
                    src={imageUrl(post.image, 600)}
                    alt={post.image.alt || post.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-bold line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 p-0"
                    onClick={() => openModal(post)}
                    data-testid={`button-read-more-${index}`}
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {!showAllPosts && posts.length > 3 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAllPosts(true)}
                className="gradient-border"
                data-testid="button-view-all-articles"
              >
                View All Articles
              </Button>
            </div>
          )}

          {showAllPosts && posts.length > 3 && (
            <div className="text-center mt-12">
              <Button
                variant="ghost"
                onClick={() => setShowAllPosts(false)}
                className="text-muted-foreground hover:text-foreground"
                data-testid="button-show-less"
              >
                Show Less
              </Button>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal}></div>
          <div className="relative bg-card rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto m-4 w-full">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold gradient-text pr-8">{selectedPost.title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground"
                  data-testid="button-close-modal"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {selectedPost.image && (
                <img
                  src={imageUrl(selectedPost.image, 900)}
                  alt={selectedPost.image.alt || selectedPost.title}
                  className="w-full max-h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className="prose prose-lg max-w-none" data-testid="blog-modal-content">
                {selectedPost.body?.length ? (
                  <PortableText value={selectedPost.body as never} />
                ) : (
                  <p>{selectedPost.excerpt}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

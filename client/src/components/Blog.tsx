import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  // Fallback blog posts if none exist in database
  const fallbackPosts = [
    {
      id: "1",
      title: "5 Common Career Myths Students Believe – And The Truth Behind Them",
      content: `<p>Many students navigate their career decisions based on outdated beliefs and misconceptions. Here are five of the most common myths and the reality behind them:</p>
      
      <h3>Myth 1: "Follow Your Passion" is Always the Right Advice</h3>
      <p>While passion is important, it's not the only factor. Skills, market demand, and personal values should also guide your decisions.</p>
      
      <h3>Myth 2: A Degree Guarantees Success</h3>
      <p>Education is crucial, but practical skills, networking, and continuous learning are equally important in today's job market.</p>
      
      <h3>Myth 3: Career Changes Are Career Failures</h3>
      <p>Career pivots are increasingly common and often lead to greater satisfaction and success when done thoughtfully.</p>`,
      excerpt: "Debunking popular misconceptions that often lead students astray in their career planning journey...",
      category: "Career Planning",
      status: "published",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "2",
      title: "How Psychology Can Transform Your Career Decisions",
      content: `<p>Understanding the psychological factors that influence our career choices can lead to more fulfilling professional lives. Here's how psychology plays a crucial role:</p>
      
      <h3>Self-Awareness and Career Clarity</h3>
      <p>Psychological assessments help identify your core values, motivations, and working styles, leading to better career alignment.</p>
      
      <h3>Overcoming Decision-Making Biases</h3>
      <p>We all have cognitive biases that can cloud our judgment. Understanding these helps make more objective career decisions.</p>`,
      excerpt: "Understanding the psychological factors that influence career choices and how to leverage them for better outcomes...",
      category: "Psychology",
      status: "published",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "3",
      title: "The Rise of Soft Skills in the AI Era",
      content: `<p>As artificial intelligence automates many technical tasks, human-centric skills become more valuable than ever:</p>
      
      <h3>Emotional Intelligence</h3>
      <p>The ability to understand and manage emotions, both your own and others', is crucial for leadership and teamwork.</p>
      
      <h3>Creative Problem-Solving</h3>
      <p>While AI can process data, human creativity in solving complex, nuanced problems remains irreplaceable.</p>`,
      excerpt: "Why emotional intelligence, creativity, and communication are becoming more valuable than ever...",
      category: "Future Skills",
      status: "published",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-6">Latest from Our Blog</h2>
            <p className="text-xl text-muted-foreground">Insights on career planning, psychology, and personal growth</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-16 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="blog" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-6">Latest from Our Blog</h2>
            <p className="text-xl text-muted-foreground">Insights on career planning, psychology, and personal growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.slice(0, 3).map((post, index) => (
              <Card 
                key={post.id} 
                className="card-hover animate-fadeInUp overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`blog-card-${index}`}
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📚</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.category}</p>
                  </div>
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-xl font-bold line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
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
        </div>
      </section>

      {/* Blog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal}></div>
          <div className="relative bg-card rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto m-4 w-full">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {selectedPost?.category}
                  </Badge>
                  <h2 className="text-3xl font-bold gradient-text">
                    {selectedPost?.title}
                  </h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground"
                  data-testid="button-close-modal"
                >
                  ✕
                </Button>
              </div>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost?.content || "" }}
                data-testid="blog-modal-content"
              />
              <div className="flex space-x-4 mt-8 pt-6 border-t border-border">
                <span className="text-sm text-muted-foreground">Share:</span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

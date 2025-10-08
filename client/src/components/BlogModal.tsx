import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Share2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}

export default function BlogModal({ isOpen, onClose, post }: BlogModalProps) {
  if (!isOpen || !post) return null;

  const sharePost = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    
    let shareUrl = "";
    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-card rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto m-4 w-full">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-start mb-6 gap-4">
            <div className="min-w-0 flex-1">
              <Badge variant="secondary" className="mb-2">
                {post.category}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold gradient-text break-words">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-2 break-words">
                Published on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground flex-shrink-0"
              data-testid="button-close-modal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div 
            className="prose prose-sm sm:prose-lg max-w-none mb-8 break-words overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
            data-testid="blog-modal-content"
          />
          
          <div className="flex items-center space-x-4 pt-6 border-t border-border">
            <Share2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Share:</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => sharePost("linkedin")}
              className="text-primary hover:text-primary/80"
              data-testid="button-share-linkedin"
            >
              LinkedIn
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => sharePost("twitter")}
              className="text-primary hover:text-primary/80"
              data-testid="button-share-twitter"
            >
              Twitter
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => sharePost("facebook")}
              className="text-primary hover:text-primary/80"
              data-testid="button-share-facebook"
            >
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface ReviewFormProps {
  onSubmit: (review: { name: string; rating: number; comments: string }) => void;
  isSubmitting?: boolean;
}

const ReviewForm = ({ onSubmit, isSubmitting }: ReviewFormProps) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && rating > 0 && comments.trim()) {
      onSubmit({ name: name.trim(), rating, comments: comments.trim() });
    }
  };

  const isValid = name.trim() && rating > 0 && comments.trim();

  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Share Your Experience</h3>
        <p className="text-muted-foreground">
          Help us improve by sharing your feedback about your child's learning journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Your Name</label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
                disabled={isSubmitting}
              >
                <Star
                  className={`h-10 w-10 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-secondary text-secondary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Your Comments</label>
          <Textarea
            placeholder="Tell us about your child's experience with our program..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-32 resize-none"
            disabled={isSubmitting}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full h-12 bg-gradient-success text-lg font-semibold"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;

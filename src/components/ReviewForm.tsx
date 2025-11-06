import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "@heroicons/react/24/solid";

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
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Your Experience</h3>
        <p className="text-gray-600 text-sm">
          Help us improve by sharing your feedback about your child's learning journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Your Name</label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 text-sm rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors duration-200"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform duration-200 hover:scale-110 focus:scale-110"
                disabled={isSubmitting}
              >
                <StarIcon
                  className={`h-6 w-6 transition-colors duration-200 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 hover:text-yellow-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Your Comments</label>
          <Textarea
            placeholder="Tell us about your child's experience with our program..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-24 resize-none text-sm rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors duration-200"
            disabled={isSubmitting}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full h-10 bg-black hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;

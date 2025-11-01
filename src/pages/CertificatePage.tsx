import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Child } from "@/data/mockData";
import ReviewForm from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { Download, Award, ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";

const CertificatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const child = location.state?.child as Child | undefined;
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if no child data
  if (!child) {
    navigate("/");
    return null;
  }

  const handleReviewSubmit = async (review: { name: string; rating: number; comments: string }) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Review submitted:", review);
    setHasSubmittedReview(true);
    setIsSubmitting(false);
    
    toast.success("Thank you for your feedback!", {
      description: "Your review has been submitted successfully."
    });
  };

  const handleDownload = () => {
    toast.success("Certificate download started", {
      description: "Your certificate is being prepared for download."
    });
    // In a real app, trigger actual PDF download
  };

  const handleExit = () => {
    if (!hasSubmittedReview) {
      toast.error("Please submit your review first", {
        description: "We value your feedback before you exit."
      });
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleExit}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Search</span>
            </button>
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              <span className="font-bold">Certificate</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Certificate Section */}
        <div className="mb-8 space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Congratulations, {child.name}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Successfully completed {child.program}
            </p>
          </div>

          {/* Certificate Display */}
          <div className="bg-card rounded-xl p-8 md:p-12 shadow-card border-4 border-primary/20">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-gradient-success flex items-center justify-center">
                  <Award className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Certificate of Achievement
                </h2>
                <p className="text-xl text-muted-foreground">This is to certify that</p>
              </div>

              <div className="py-6 border-t-2 border-b-2 border-primary/20">
                <p className="text-3xl md:text-4xl font-bold text-primary">{child.name}</p>
              </div>

              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">
                  has successfully completed the
                </p>
                <p className="text-2xl font-bold text-foreground">{child.program}</p>
              </div>

              <div className="pt-6">
                <p className="text-muted-foreground">Completed in {child.completionDate}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-gradient-hero shadow-button text-lg px-8"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Certificate
            </Button>
          </div>
        </div>

        {/* Welcome Letter */}
        <div className="bg-muted rounded-xl p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Welcome Letter</h3>
              <p className="text-muted-foreground">A message from our team</p>
            </div>
          </div>
          
          <div className="prose prose-sm md:prose-base max-w-none text-foreground space-y-4">
            <p>Dear Parent/Guardian,</p>
            
            <p>
              Congratulations! We are thrilled to celebrate {child.name}'s successful completion 
              of the {child.program}. This achievement represents dedication, hard work, and 
              a commitment to learning that will serve them well throughout their educational journey.
            </p>
            
            <p>
              Throughout this program, {child.name} has demonstrated exceptional growth and 
              enthusiasm for learning. We've watched them develop new skills, overcome challenges, 
              and build confidence in their abilities.
            </p>
            
            <p>
              We hope this is just the beginning of a lifelong love of learning. Thank you for 
              trusting us with your child's education and for your continued support.
            </p>
            
            <p className="font-semibold">
              Warm regards,<br />
              The EduAchieve Team
            </p>
          </div>
        </div>

        {/* Review Form */}
        {!hasSubmittedReview ? (
          <ReviewForm onSubmit={handleReviewSubmit} isSubmitting={isSubmitting} />
        ) : (
          <div className="bg-success/10 border-2 border-success rounded-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-success flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-6">
              Your review has been submitted. You can now exit or download the certificate again.
            </p>
            <Button
              onClick={() => navigate("/")}
              size="lg"
              className="bg-gradient-hero"
            >
              Return to Search
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CertificatePage;

import { Child } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Award, Calendar, User } from "lucide-react";

interface ResultCardProps {
  child: Child;
  onViewCertificate: (child: Child) => void;
}

const ResultCard = ({ child, onViewCertificate }: ResultCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow border border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{child.name}</h3>
              <p className="text-sm text-muted-foreground">Age {child.age}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="h-4 w-4" />
              <span className="text-sm">{child.program}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Completed {child.completionDate}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onViewCertificate(child)}
          className="bg-gradient-hero shadow-button hover:opacity-90 transition-opacity"
        >
          View Certificate
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, Phone, Shield } from "lucide-react";

interface PhoneVerificationProps {
  isOpen: boolean;
  childName: string;
  onVerify: (phone: string) => Promise<boolean>;
  onClose: () => void;
}

const PhoneVerification = ({ isOpen, childName, onVerify, onClose }: PhoneVerificationProps) => {
  const [phone, setPhone] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }

    setIsVerifying(true);
    const isValid = await onVerify(phone);
    setIsVerifying(false);

    if (!isValid) {
      setError("Invalid phone number. Please enter the number used during registration.");
      setPhone("");
    }
  };

  const handleClose = () => {
    setPhone("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Verify Your Identity</DialogTitle>
          <DialogDescription className="text-center">
            To view <span className="font-semibold text-foreground">{childName}'s</span> certificate, please enter the phone number you used during registration.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="tel"
                placeholder="08123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 pl-12 text-base"
                disabled={isVerifying}
              />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isVerifying}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-hero"
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneVerification;

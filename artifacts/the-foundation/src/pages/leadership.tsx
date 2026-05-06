import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "wouter";

export default function Leadership() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // Check session storage on mount
  useEffect(() => {
    if (sessionStorage.getItem("foundation_leadership_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Founders") {
      setIsAuthenticated(true);
      setError(false);
      sessionStorage.setItem("foundation_leadership_auth", "true");
    } else {
      setError(true);
      setTimeout(() => setError(false), 500); // Reset shake state
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background that blurs/unblurs */}
      <div 
        className={`absolute inset-0 bg-white transition-all duration-1000 ease-in-out ${!isAuthenticated ? "filter blur-md scale-105" : "filter blur-none scale-100"}`}
        style={{
          backgroundImage: "radial-gradient(circle at center, var(--color-background) 0%, white 100%)",
          opacity: isAuthenticated ? 1 : 0.8
        }}
      />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="relative z-10 bg-white p-8 rounded-lg shadow-lg border border-border max-w-sm w-full mx-4"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-primary mb-2">Leadership</h2>
                <p className="text-sm text-muted-foreground">Please enter the access code to continue.</p>
              </div>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <motion.div
                  animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Input
                    type="password"
                    placeholder="Access Code"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full text-center ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    autoFocus
                  />
                </motion.div>
                {error && <p className="text-xs text-destructive">Incorrect code. Please try again.</p>}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Enter
                </Button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20"
          >
            <div className="space-y-12 bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-border/50 shadow-sm">
              <div className="space-y-6 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-serif text-primary">Why you were approached.</h1>
                <p className="text-lg text-foreground leading-relaxed">
                  We do not mass-recruit. We are building markets properly, starting with individuals who have a track record of stability, professionalism, and influence. 
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  The Foundation is not for everyone. It is for those who recognize that sustainable growth comes from better structure, not louder marketing.
                </p>
              </div>

              <div className="h-px w-full bg-border/60" />

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif text-primary">Building Properly</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We are establishing a quiet, robust presence. Our focus is on long-term viability. When you join at the leadership level, you are helping to set the standard for what professional real estate looks like in your market.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif text-primary">The Invitation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    This is an invitation to start a conversation. No pressure. Review the model, understand the tools, and see if it aligns with how you want to operate your business.
                  </p>
                  <div className="pt-4">
                    <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors">
                      Start a Conversation
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border border-border/50 flex items-start gap-4 mt-8">
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Confidential Inquiry</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you have specific questions about the structure or transition process, our digital assistant S2 is available for immediate, confidential answers.
                  </p>
                  <Link href="/s2" className="text-sm text-secondary font-medium hover:underline">
                    Ask S2 confidentially &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

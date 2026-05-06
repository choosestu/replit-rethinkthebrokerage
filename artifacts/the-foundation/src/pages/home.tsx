import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex-1 w-full">
      {/* Hero */}
      <section className="w-full min-h-[70vh] flex flex-col justify-center items-center px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-background to-background" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
        >
          <span className="text-secondary font-medium tracking-wide uppercase text-sm mb-6">Powered by LPT Realty</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-primary leading-[1.1] mb-8">
            A quiet, grounded platform that already works.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            For real estate agents who want to reduce costs, use better tools, and build more consistent businesses. No pressure. No hype. Just structure.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/realtors" className="px-8 py-4 bg-primary text-primary-foreground rounded text-base font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto">
              For Realtors
            </Link>
            <Link href="/leadership" className="px-8 py-4 bg-white border border-border text-foreground rounded text-base font-medium hover:bg-muted/50 transition-colors w-full sm:w-auto">
              For Leadership
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Core Philosophy */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-primary">A place you can explore safely and come back to when you are ready.</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                The Foundation is not a sales funnel. We believe that as agents improve, their work becomes more consistent, results improve, and business stabilizes. 
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                You do not need to recruit to succeed here. You need to improve. Everything else follows naturally.
              </p>
            </div>
            <div className="bg-background rounded-lg p-10 border border-border/50 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-primary">Better Tools</h3>
                <p className="text-sm text-muted-foreground">Access practical, day-to-day tools that streamline your workflow without the noise.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-primary">Lower Costs</h3>
                <p className="text-sm text-muted-foreground">Keep more of what you earn with transparent, grounded fee structures.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-primary">Consistent Growth</h3>
                <p className="text-sm text-muted-foreground">Build a stable business on solid fundamentals, not high-pressure tactics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S2 Callout */}
      <section className="w-full py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h2 className="text-3xl font-serif mb-6 text-white">Meet S2.</h2>
          <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed">
            Your digital assistant for LPT Realty questions, onboarding, CRM usage, clause writing guidance, and day-to-day workflow. Available whenever you need clarity.
          </p>
          <Link href="/s2" className="inline-block px-8 py-4 bg-accent text-accent-foreground font-medium rounded hover:bg-accent/90 transition-colors">
            Ask S2 a Question
          </Link>
        </div>
      </section>
    </div>
  );
}

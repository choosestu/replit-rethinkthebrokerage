import { Link } from "wouter";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Prepare",
    body: [
      "Before anything else, get clear on where you are. Pull together your current agreements, understand your notice requirements, and review what you own versus what stays at your current brokerage.",
      "This stage is about information, not action. Know your obligations before you make any moves.",
    ],
    note: "S2 can help you understand what to look for in your current agreement and what questions to ask.",
  },
  {
    number: "02",
    title: "Exit",
    body: [
      "Once you have clarity, you can give proper notice and manage your existing pipeline. Deal timing matters here. Coordinate so that active transactions are handled cleanly, with minimal disruption to your clients.",
      "Your reputation travels with you. A clean exit protects it.",
    ],
    note: "S2 can walk you through common exit scenarios and what to communicate to clients.",
  },
  {
    number: "03",
    title: "Onboard",
    body: [
      "Getting set up at LPT Realty is straightforward. You will complete your registration, get access to the tools, and work through the initial setup. There is a clear process and support at each step.",
      "This is where you get your systems in place before business resumes at full pace.",
    ],
    note: "S2 can answer onboarding questions as they come up, any time of day.",
  },
  {
    number: "04",
    title: "Launch",
    body: [
      "With your setup complete, you resume business with better tools, a cleaner cost structure, and a clearer picture of how your business is running. The goal is to be operational and effective as quickly as possible.",
      "The transition is not the hard part. The consistency that comes after is what matters.",
    ],
    note: "S2 is available for day-to-day workflow questions as you settle in.",
  },
];

export default function Transition() {
  return (
    <div className="flex-1 w-full">
      {/* Header */}
      <section className="w-full py-20 border-b border-border bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-secondary text-sm font-medium tracking-wide uppercase">Transition</span>
            <h1 className="text-4xl md:text-5xl font-serif text-primary mt-4 mb-6 leading-tight">
              Moving brokerages is manageable.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              It is not as complicated as it feels from the outside. There are four stages. Each one is straightforward when you know what to expect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-10"
              >
                <div className="flex flex-col items-start">
                  <span className="text-5xl font-serif text-accent/50 leading-none">{step.number}</span>
                  <span className="text-lg font-serif text-primary mt-2">{step.title}</span>
                </div>
                <div className="space-y-4">
                  {step.body.map((p, j) => (
                    <p key={j} className="text-base text-foreground leading-relaxed">{p}</p>
                  ))}
                  <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-lg p-4 mt-4">
                    <div className="w-1 h-full bg-secondary rounded-full shrink-0 mt-0.5 self-stretch min-h-4" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.note}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S2 and CTA */}
      <section className="w-full py-20 bg-white border-t border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-4">S2 is available at every step.</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Whether you are in the preparation stage or two weeks into your onboarding, S2 can answer your specific questions in real time. No waiting.
              </p>
              <Link href="/s2" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors text-sm">
                Talk to S2
              </Link>
            </div>
            <div>
              <h2 className="text-3xl font-serif text-primary mb-4">Want to talk it through?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you have questions that need a real conversation, reach out. We are available to walk through your specific situation without any pressure.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded font-medium hover:bg-muted/50 transition-colors text-sm">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

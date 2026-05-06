import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

function Calculator() {
  const [dealsPerYear, setDealsPerYear] = useState(12);
  const [commissionSplit, setCommissionSplit] = useState(80);
  const [annualCap, setAnnualCap] = useState(25000);
  const [monthlyFees, setMonthlyFees] = useState(200);
  const [transactionFees, setTransactionFees] = useState(200);
  const [franchiseFee, setFranchiseFee] = useState(5);

  const avgCommission = 10000;
  const grossCommission = dealsPerYear * avgCommission;
  const splitPct = (100 - commissionSplit) / 100;

  const currentBrokerageFromSplit = Math.min(grossCommission * splitPct, annualCap);
  const currentTransactionCosts = dealsPerYear * transactionFees;
  const currentMonthlyTotal = monthlyFees * 12;
  const currentFranchise = grossCommission * (franchiseFee / 100);
  const currentTotalCost = currentBrokerageFromSplit + currentTransactionCosts + currentMonthlyTotal + currentFranchise;

  const lptCap = 15000;
  const lptTransactionFee = 100;
  const lptMonthly = 0;
  const lptFranchise = 0;
  const lptSplitPct = 0;
  const lptFromSplit = Math.min(grossCommission * lptSplitPct, lptCap);
  const lptTransactionCosts = dealsPerYear * lptTransactionFee;
  const lptTotalCost = lptFromSplit + lptTransactionCosts + lptMonthly + lptFranchise;

  const savings = Math.max(0, currentTotalCost - lptTotalCost);

  const fmt = (n: number) =>
    n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

  return (
    <div className="bg-white border border-border rounded-lg p-6 md:p-8">
      <h3 className="text-2xl font-serif text-primary mb-2">Cost Comparison</h3>
      <p className="text-sm text-muted-foreground mb-8">
        Based on an average commission of $10,000 per deal. Adjust the inputs to reflect your business.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-5">
          <h4 className="text-sm font-medium text-foreground uppercase tracking-wider border-b border-border pb-3">Your Numbers</h4>
          
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Deals per year</label>
            <input
              type="number"
              value={dealsPerYear}
              onChange={(e) => setDealsPerYear(Number(e.target.value))}
              min={1}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Commission split (your %) at current brokerage</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={commissionSplit}
                onChange={(e) => setCommissionSplit(Number(e.target.value))}
                min={0}
                max={100}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Annual cap ($)</label>
            <input
              type="number"
              value={annualCap}
              onChange={(e) => setAnnualCap(Number(e.target.value))}
              min={0}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Monthly fees ($)</label>
            <input
              type="number"
              value={monthlyFees}
              onChange={(e) => setMonthlyFees(Number(e.target.value))}
              min={0}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Transaction fee per deal ($)</label>
            <input
              type="number"
              value={transactionFees}
              onChange={(e) => setTransactionFees(Number(e.target.value))}
              min={0}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Franchise / royalty fee (%)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={franchiseFee}
                onChange={(e) => setFranchiseFee(Number(e.target.value))}
                min={0}
                max={100}
                step={0.1}
                className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="space-y-5">
          <h4 className="text-sm font-medium text-foreground uppercase tracking-wider border-b border-border pb-3">Estimated Results</h4>

          <div className="space-y-4">
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Current brokerage total cost</div>
              <div className="text-2xl font-serif text-foreground">{fmt(currentTotalCost)}</div>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between"><span>Split / cap</span><span>{fmt(currentBrokerageFromSplit)}</span></div>
                <div className="flex justify-between"><span>Monthly fees</span><span>{fmt(currentMonthlyTotal)}</span></div>
                <div className="flex justify-between"><span>Transaction fees</span><span>{fmt(currentTransactionCosts)}</span></div>
                <div className="flex justify-between"><span>Franchise fees</span><span>{fmt(currentFranchise)}</span></div>
              </div>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Estimated LPT Realty cost</div>
              <div className="text-2xl font-serif text-foreground">{fmt(lptTotalCost)}</div>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between"><span>Cap (100% after)</span><span>$15,000</span></div>
                <div className="flex justify-between"><span>Monthly fees</span><span>$0</span></div>
                <div className="flex justify-between"><span>Transaction fees</span><span>{fmt(lptTransactionCosts)}</span></div>
                <div className="flex justify-between"><span>Franchise fees</span><span>$0</span></div>
              </div>
            </div>

            <div className={`rounded-lg p-4 border ${savings > 0 ? "bg-primary/5 border-primary/20" : "bg-background border-border/50"}`}>
              <div className="text-sm text-muted-foreground mb-1">Estimated annual savings</div>
              <div className={`text-3xl font-serif ${savings > 0 ? "text-primary" : "text-foreground"}`}>
                {fmt(savings)}
              </div>
              {savings > 0 && (
                <div className="text-xs text-muted-foreground mt-1">per year, based on your inputs</div>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            These are estimates based on publicly available LPT Realty plan information. Actual results vary. Speak with us for a precise breakdown.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Realtors() {
  return (
    <div className="flex-1 w-full">
      {/* Hero */}
      <section className="w-full py-20 border-b border-border bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-secondary text-sm font-medium tracking-wide uppercase">For Realtors</span>
            <h1 className="text-4xl md:text-5xl font-serif text-primary mt-4 mb-6 leading-tight">
              Better structure. Lower cost. More consistent work.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This is for agents who want to run a tighter, more stable business. Not agents looking to be recruited. If you improve how you work, everything else follows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Explanation */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-8">
          <h2 className="text-3xl font-serif text-primary">The idea is simple.</h2>
          <p className="text-base text-foreground leading-relaxed">
            Most agents spend more than they need to. They pay fees that compound, splits that cap too high, and royalties that take a percentage off every deal. At the same time, many agents have access to tools they do not actually use.
          </p>
          <p className="text-base text-foreground leading-relaxed">
            The Foundation is built on a different premise. Keep more of what you earn. Use better tools properly. Work with more consistency. When you do those three things, your business stabilizes. Your results become more predictable. The people around you notice.
          </p>
          <p className="text-base text-foreground leading-relaxed">
            You do not need to recruit. You need to improve. Conversations happen when your business is clearly working.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-4">
            {[
              { title: "Save money", body: "Transparent cost structure. Know exactly what you pay per deal, per year, with no surprises." },
              { title: "Use better tools", body: "Access to a proper CRM, clause libraries, transaction coordination, and AI assistance built for real estate." },
              { title: "Build consistency", body: "Stable processes lead to stable results. Stop rebuilding from scratch every quarter." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-border rounded-lg p-6">
                <h3 className="text-xl font-serif text-primary mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="w-full py-20 bg-background border-y border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-10">
            <h2 className="text-3xl font-serif text-primary mb-3">See what you could save.</h2>
            <p className="text-base text-muted-foreground">
              Enter your current numbers. The comparison uses LPT Realty's structure as the alternative.
            </p>
          </div>
          <Calculator />
        </div>
      </section>

      {/* Tools Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-serif text-primary mb-6">Tools that actually get used.</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-10">
            LPT Realty provides agents with access to a practical set of tools. The difference at The Foundation is that we focus on real usage, not just access. Having a CRM does not help if it sits empty.
          </p>

          <div className="space-y-6">
            {[
              { tool: "CRM", desc: "A proper client and pipeline management system. Keep track of your contacts, follow-ups, and deals in one place." },
              { tool: "Clause Writing", desc: "Access to guidance on Ontario-specific clauses for common scenarios. Less time searching, more time advising." },
              { tool: "Transaction Coordination", desc: "Structured support for moving deals from accepted offer to close." },
              { tool: "Ontario Paperwork", desc: "OREA forms, RECO basics, and compliance guidance built into your workflow." },
              { tool: "S2 AI Assistant", desc: "Ask S2 a question any time. It handles day-to-day workflow questions, LPT onboarding questions, and more." },
            ].map((item) => (
              <div key={item.tool} className="flex gap-4 items-start py-4 border-b border-border last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                <div>
                  <span className="font-medium text-foreground">{item.tool}. </span>
                  <span className="text-muted-foreground text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-serif mb-4">Ready to take a closer look?</h2>
          <p className="text-primary-foreground/80 mb-10 leading-relaxed">
            No commitments. No pressure. If it makes sense for your business, we can talk through what a transition would look like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-accent text-accent-foreground font-medium rounded hover:bg-accent/90 transition-colors">
              Start a Conversation
            </Link>
            <Link href="/s2" className="px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-medium rounded hover:bg-white/10 transition-colors">
              Ask S2 a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

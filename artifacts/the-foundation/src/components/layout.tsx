import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Link } from "wouter";
import { MessageSquare } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-background font-sans text-foreground selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
      <footer className="w-full py-8 border-t border-border mt-auto bg-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} The Foundation. Powered by LPT Realty.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Floating S2 Button */}
      <Link href="/s2" className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center group" aria-label="Open S2 Assistant">
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-white text-foreground px-3 py-1.5 rounded shadow-sm text-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ask S2
        </span>
      </Link>
    </div>
  );
}

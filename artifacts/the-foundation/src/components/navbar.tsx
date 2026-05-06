import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/leadership", label: "Leadership" },
    { href: "/realtors", label: "Realtors" },
    { href: "/transition", label: "Transition" },
    { href: "/s2", label: "S2" },
  ];

  return (
    <nav className="w-full bg-background border-b border-border/40 sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-semibold tracking-tight text-primary flex items-center gap-2">
          The Foundation
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-medium px-5 py-2.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border px-4 py-4 flex flex-col gap-4 shadow-sm absolute w-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-base font-medium py-2",
                location === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border mt-2">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block text-center w-full text-sm font-medium px-4 py-3 bg-primary text-primary-foreground rounded"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useSubmitContact } from "@workspace/api-client-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitContact = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    submitContact.mutate(
      { name, email, message },
      {
        onSuccess: () => {
          setSubmitted(true);
          setName("");
          setEmail("");
          setMessage("");
        },
      }
    );
  };

  return (
    <div className="flex-1 w-full">
      <section className="w-full py-20 border-b border-border bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-secondary text-sm font-medium tracking-wide uppercase">Contact</span>
            <h1 className="text-4xl md:text-5xl font-serif text-primary mt-4 mb-4 leading-tight">
              Get in touch.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No pressure. Just a conversation when you are ready.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-border rounded-lg p-8 text-center"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-4 h-4 rounded-full bg-primary" />
              </div>
              <h2 className="text-2xl font-serif text-primary mb-2">Message received.</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Thank you. We will be in touch shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-secondary hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none leading-relaxed"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <button
                type="submit"
                disabled={submitContact.isPending || !name.trim() || !email.trim() || !message.trim()}
                className="w-full py-3 px-6 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitContact.isPending ? "Sending..." : "Send Message"}
              </button>

              {submitContact.isError && (
                <p className="text-sm text-destructive text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

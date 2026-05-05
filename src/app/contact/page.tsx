"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toast.success("Message sent. I will get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send message");
      }
    } catch {
      toast.error("Connection failed");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="soft-grid relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="grain-overlay pointer-events-none absolute inset-0" />
        <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-32">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-bold text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={16} />
            Back to portal
          </Link>

          <div className="grid gap-8 border-t border-[var(--border)] pt-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(360px,0.58fr)]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[var(--primary)]">Contact</p>
              <h1 className="section-heading font-heading font-extrabold">
                Send the messy brief.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-[var(--muted-foreground)]">
                Project idea, collaboration, feedback, or just a quick hello. Keep it rough, I can help shape it.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-5">
                  <Mail className="text-[var(--primary)]" size={22} />
                  <p className="mt-4 text-sm font-bold">Email</p>
                  <a href="mailto:d.dexpiee@gmail.com" className="mt-1 block text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                    d.dexpiee@gmail.com
                  </a>
                </div>
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-5">
                  <MapPin className="text-[var(--secondary)]" size={22} />
                  <p className="mt-4 text-sm font-bold">Base</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">Jakarta, Indonesia</p>
                </div>
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-5">
                  <Clock className="text-[var(--accent)]" size={22} />
                  <p className="mt-4 text-sm font-bold">Reply</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">Usually within a day</p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-2xl shadow-black/10 md:p-7"
            >
              <div className="grid gap-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-[var(--foreground)]">Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)]"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-[var(--foreground)]">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)]"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-[var(--foreground)]">Message</span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Tell me what you want to build..."
                    rows={7}
                    className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)]"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-4 text-sm font-bold text-[var(--background)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={17} />
                    Send message
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  useEffect(() => {
    setMounted(true);
    // Initialize EmailJS with your public key
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const templateParams = {
        to_name: "Leona",
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        templateParams
      );

      if (result.status === 200) {
        setStatus({ submitting: false, submitted: true, error: null });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(`Failed to send message. Status: ${result.status}`);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        submitting: false,
        submitted: false,
        error:
          "Failed to send message. Please check your connection and try again.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Form field changed:", e.target.id, e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen text-slate-200">
      <Header />

      <PageHero title="Contact" subtitle="Let's Connect & Collaborate" />

      {/* Contact Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 pb-24 sm:py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-cyan-300"
        >
          Get in Touch
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-md mx-auto rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/30 to-slate-950/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-slate-700 bg-slate-950/70 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 px-3 py-2 text-sm sm:text-base"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-slate-700 bg-slate-950/70 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 px-3 py-2 text-sm sm:text-base"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="block w-full rounded-lg border border-slate-700 bg-slate-950/70 text-white shadow-sm focus:border-cyan-400 focus:ring-cyan-400 px-3 py-2 text-sm sm:text-base resize-vertical"
                placeholder="Tell me about your project or how I can help..."
              />
            </div>
            {status.error && (
              <p className="text-red-500 text-sm">{status.error}</p>
            )}
            {status.submitted && (
              <p className="text-green-500 text-sm">
                Message sent successfully!
              </p>
            )}
            <motion.button
              type="submit"
              disabled={status.submitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium hover:from-cyan-400 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition-all duration-300"
            >
              {status.submitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}

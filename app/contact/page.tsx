"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "../../components/Header";

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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-900">
            Contact
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 px-4">
            Let&apos;s Connect & Collaborate
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 px-4 max-w-6xl mx-auto bg-red-900/50">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-amber-500"
        >
          Get in Touch
        </motion.h2>
        <div className="max-w-md mx-auto">
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
                className="block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 text-sm sm:text-base"
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
                className="block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 text-sm sm:text-base"
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
                className="block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 text-sm sm:text-base resize-vertical"
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
              className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-amber-500 to-red-900 text-white font-medium hover:from-amber-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition-all duration-300"
            >
              {status.submitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </div>
      </section>
    </main>
  );
}

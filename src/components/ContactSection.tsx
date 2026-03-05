import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message
        }
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to send message");
      return;
    }

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      message: ""
    });

    setTimeout(() => setSubmitted(false), 3000);

  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-2xl">

        <motion.p
          className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.p>

        <motion.h2
          className="text-3xl md:text-5xl font-display font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let's Build Your <span className="text-primary">Growth Engine</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Ready to scale? Drop us a message or reach out on WhatsApp.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-8 space-y-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          {(["name", "email", "phone"] as const).map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              required={field !== "phone"}
              className="w-full bg-background border border-border rounded-xl px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          ))}

          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
            rows={4}
            className="w-full bg-background border border-border rounded-xl px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 rounded-xl font-display font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {loading
                ? "Sending..."
                : submitted
                ? "Sent! ✓"
                : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
            </button>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 rounded-xl font-display font-semibold border-2 border-border text-foreground hover:border-green-500 hover:text-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>

          </div>

        </motion.form>

      </div>
    </section>
  );
};

export default ContactSection;
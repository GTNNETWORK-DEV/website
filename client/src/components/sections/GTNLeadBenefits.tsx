import { motion } from "framer-motion";
import {
  Users,
  BarChart3,
  Home,
  Handshake,
  Megaphone,
  Target,
} from "lucide-react";

export function GTNLeadBenefits() {
  return (
    <section className="py-28 bg-[hsl(218_30%_12%)] border-t border-white/10">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            Network Expansion
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white">
            Why Networkers Choose GTN
          </h2>
          <p className="mt-6 text-[#a1a4ae] text-lg leading-relaxed">
            Real people. Real opportunities. Ethical network growth.
          </p>
        </div>

        {/* BENEFIT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {[
            {
              icon: Users,
              text: "Talk to network marketing prospects from your country",
            },
            {
              icon: BarChart3,
              text: "Fastest way to expand your network marketing business",
            },
            {
              icon: Home,
              text: "Get quality home-based business leads every day for free",
            },
            {
              icon: Handshake,
              text: "Meet real people actively looking for a business opportunity",
            },
            {
              icon: Megaphone,
              text: "Promote your website and attract new leaders to your team",
            },
            {
              icon: Target,
              text: "Advertise directly to your target audience",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="
                bg-[#0f111a]
                border border-white/5
                rounded-2xl
                p-7
                flex gap-5
                items-start
                hover:border-primary/40
                hover:bg-[#141724]
                transition-all
              "
            >
              {/* ICON */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>

              {/* TEXT */}
              <p className="text-[#c9ccd4] text-base leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
}

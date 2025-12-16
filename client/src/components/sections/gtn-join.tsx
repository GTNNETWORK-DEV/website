import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Building2, X } from "lucide-react";
import { useState } from "react";

// ✅ IMPORT YOUR QR IMAGE
import whatsappQR from "../../../../attached_assets/whatsapp-qr.png";

export function GTNJoin() {
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  return (
    <section id="join" className="py-32 bg-background">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">
            Join GTN Today
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join our global network and get access to verified professionals,
            ethical opportunities, and exclusive community benefits.
          </p>
        </motion.div>

        {/* CARD */}
        <Card className="max-w-2xl mx-auto p-8 bg-card border border-white/10 relative">

          {/* CLOSE ICON (when WhatsApp shown) */}
          {showWhatsapp && (
            <button
              onClick={() => setShowWhatsapp(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X />
            </button>
          )}

          {/* FORM (STATIC UI ONLY) */}
          {!showWhatsapp && (
            <form className="space-y-6">

              <Input label="Full Name" icon={<User />} />
              <Input label="Email Address" icon={<Mail />} />
              <Input label="WhatsApp Number" icon={<Phone />} />
              <Input label="Country" icon={<MapPin />} />
              <Input label="Company (Optional)" icon={<Building2 />} />

              {/* JOIN BUTTON */}
              <button
                type="button"
                onClick={() => setShowWhatsapp(true)}
                className="w-full h-14 rounded-xl bg-[#21b754] text-white text-lg font-bold hover:brightness-110 transition"
              >
                Join GTN Now
              </button>
            </form>
          )}

          {/* WHATSAPP REVEAL */}
          <AnimatePresence>
            {showWhatsapp && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-6"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Join Our WhatsApp Channel
                </h3>

                <p className="text-gray-400 mb-6">
                  Scan the QR code or click the button below to join
                  our official GTN WhatsApp channel.
                </p>

                {/* QR IMAGE */}
                <img
                  src={whatsappQR}
                  alt="Join GTN WhatsApp"
                  className="w-48 h-48 mx-auto rounded-2xl border-2 border-[#21b754]/40 shadow-lg mb-6"
                />

                {/* WHATSAPP BUTTON */}
                <a
                  href="https://whatsapp.com/channel/0029Va9dDqx0lwgp9t6f1245"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#21b754] text-white font-bold px-10 py-4 rounded-xl text-lg hover:brightness-110 transition"
                >
                  Join via WhatsApp
                </a>

                <p className="text-xs text-gray-500 mt-6">
                  You’ll receive updates, verified opportunities, and community access.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </Card>
      </div>
    </section>
  );
}

/* =========================
   INPUT COMPONENT
   ========================= */
function Input({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
        <span className="text-[#21b754]">{icon}</span>
        {label}
      </label>
      <input
        placeholder={label}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#21b754]/40"
      />
    </div>
  );
}

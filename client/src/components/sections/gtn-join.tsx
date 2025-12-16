import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Building2, X } from "lucide-react";
import { useState } from "react";
import { API_BASE } from "@/lib/api";

// ✅ IMPORT YOUR QR IMAGE
import whatsappQR from "../../../../attached_assets/whatsapp-qr.png";

export function GTNJoin() {
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    country: "",
    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowWhatsapp(false);
    setLoading(true);

    try {
      if (!formData.fullName.trim()) {
        throw new Error("Full name is required");
      }

      const body = new FormData();
      body.append("full_name", formData.fullName.trim());
      if (formData.email) body.append("email", formData.email.trim());
      if (formData.whatsapp) body.append("whatsapp", formData.whatsapp.trim());
      if (formData.country) body.append("country", formData.country.trim());
      if (formData.company) body.append("company", formData.company.trim());

      const res = await fetch(`${API_BASE}/join`, {
        method: "POST",
        body,
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data?.detail || data?.error || data?.message || "Join request failed";
        throw new Error(msg);
      }

      setShowWhatsapp(true);
    } catch (err: any) {
      setError(err?.message || "Join request failed");
    } finally {
      setLoading(false);
    }
  };

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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                icon={<User />}
                value={formData.fullName}
                onChange={(v) => setFormData({ ...formData, fullName: v })}
                required
              />
              <Input
                label="Email Address"
                icon={<Mail />}
                type="email"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
              />
              <Input
                label="WhatsApp Number"
                icon={<Phone />}
                value={formData.whatsapp}
                onChange={(v) => setFormData({ ...formData, whatsapp: v })}
              />
              <Input
                label="Country"
                icon={<MapPin />}
                value={formData.country}
                onChange={(v) => setFormData({ ...formData, country: v })}
              />
              <Input
                label="Company (Optional)"
                icon={<Building2 />}
                value={formData.company}
                onChange={(v) => setFormData({ ...formData, company: v })}
              />

              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}

              {/* JOIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-xl bg-[#21b754] text-white text-lg font-bold hover:brightness-110 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Join GTN Now"}
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
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  icon: React.ReactNode;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
        <span className="text-[#21b754]">{icon}</span>
        {label}
      </label>
      <input
        type={type}
        placeholder={label}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#21b754]/40"
      />
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Facebook, Send, Music, ChevronLeft } from "lucide-react";

export function GTNSocialTab() {
  const [open, setOpen] = useState(false);

  const socials = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/prince_kashif786?igsh=NXp2cnhmYWdtdDQx&utm_source=qr",
      color: "text-pink-500",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1BdjbRmHmD/?mibextid=wwXIfr",
      color: "text-blue-500",
    },
    {
      icon: Send, // Telegram
      href: "https://t.me/gtnglobalnetwork",
      color: "text-sky-400",
    },
    {
      icon: Music, // TikTok (placeholder)
      href: "#",
      color: "text-white/40",
      disabled: true,
    },
  ];

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <div
          className="
            flex flex-col gap-4 p-3 rounded-2xl
            bg-white/2 backdrop-blur-xs
            border border-white/20
            shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]
          "
        >
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.disabled ? undefined : s.href}
              target="_blank"
              rel="noreferrer"
              className={`
                w-11 h-11 rounded-full flex items-center justify-center
                bg-white/10 border border-white/20
                hover:bg-white/20 transition-all
                ${s.color}
                ${s.disabled ? "cursor-not-allowed opacity-40" : ""}
              `}
            >
              <s.icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
        {/* SLIDE PANEL */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="mr-2"
            >
              <div
                className="
                  flex flex-col gap-4 p-3 rounded-2xl
                  bg-white/10 backdrop-blur-xl
                  border border-white/20
                  shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]
                "
              >
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.disabled ? undefined : s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`
                      w-11 h-11 rounded-full flex items-center justify-center
                      bg-white/10 border border-white/20
                      hover:bg-white/20 transition-all
                      ${s.color}
                      ${s.disabled ? "cursor-not-allowed opacity-40" : ""}
                    `}
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOGGLE ARROW (GLASS) */}
        <button
          onClick={() => setOpen(!open)}
          className="
            w-10 h-16 rounded-l-2xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            flex items-center justify-center
            shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]
            text-white/80
          "
        >
          <ChevronLeft
            size={20}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </>
  );
}

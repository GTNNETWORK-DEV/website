import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { gtnOfficialLinks } from "@/lib/gtn-links";

export function GTNWhatsAppSupport() {
  return (
    <motion.a
      href={gtnOfficialLinks.whatsappCommunity}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="
        fixed bottom-6 right-6 z-60
        flex flex-col items-center gap-1
        group
      "
    >
      {/* ICON */}
      <div
        className="
          w-14 h-14 rounded-full
          bg-[#21b754]
          flex items-center justify-center
          shadow-[0_20px_50px_-10px_rgba(33,183,84,0.6)]
          group-hover:scale-110
          transition-transform
        "
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </div>

      {/* LABEL */}
      <span
        className="
          text-xs font-semibold
          text-[#21b754]
          tracking-wide
          mt-1
        "
      >
        Support
      </span>
    </motion.a>
  );
}

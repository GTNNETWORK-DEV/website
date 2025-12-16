import { motion } from "framer-motion";
import { ExternalLink, Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

interface Event {
  id: string;
  name: string;
  image_url?: string;
  event_date?: string;
  location?: string;
  link?: string;
}

export function GTNOngoingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 THIS IS THE MISSING PART (API CALL)
  useEffect(() => {
    fetch(`${API_BASE}/events.php`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading events:", err);
        setLoading(false);
      });
  }, [API_BASE]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="events" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Events</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join us at our upcoming gatherings, seminars, and networking events.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-gray-400">
            Loading events…
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <CalendarIcon className="w-16 h-16 text-primary/30 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No upcoming events. Stay tuned!
            </p>
          </motion.div>
        )}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto"
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group w-full md:w-[300px]"
              >
                {event.link ? (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <EventCard event={event} />
                  </a>
                ) : (
                  <EventCard event={event} />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* =========================
   Event Card Component
   ========================= */
function EventCard({ event }: { event: Event }) {
  return (
    <div className="h-full bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-xl p-6 backdrop-blur-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center">
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <h3 className="text-lg font-display font-bold text-white text-center mb-2">
        {event.name}
      </h3>

      {(event.event_date || event.location) && (
        <div className="text-sm text-gray-400 text-center mb-3">
          {event.event_date && (
            <div>{new Date(event.event_date).toLocaleDateString()}</div>
          )}
          {event.location && <div>{event.location}</div>}
        </div>
      )}

      {event.link && (
        <div className="mt-auto flex items-center gap-2 text-primary text-sm font-semibold">
          View Details <ExternalLink className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}

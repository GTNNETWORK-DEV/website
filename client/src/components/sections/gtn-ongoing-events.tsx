import { motion } from "framer-motion";
import { ExternalLink, Calendar as CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface Event {
  id: string;
  name: string;
  image: string;
  date?: string;
  location?: string;
  link?: string;
}

export function GTNOngoingEvents() {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem("gtn_events");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("gtn_events", JSON.stringify(events));
  }, [events]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
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

  // Calculate justify alignment based on event count
  const getJustifyClass = () => {
    if (events.length === 1) return "justify-center";
    if (events.length === 2) return "justify-center gap-12";
    if (events.length === 3) return "justify-center gap-8";
    return "justify-center gap-6";
  };

  return (
    <section id="events" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Ongoing Events</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join us at our upcoming gatherings, seminars, and networking events.
          </p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <CalendarIcon className="w-16 h-16 text-primary/30 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No upcoming events. Stay tuned!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex flex-wrap items-stretch ${getJustifyClass()} max-w-6xl mx-auto`}
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group w-full md:w-auto"
              >
                {event.link ? (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative h-full"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl opacity-0 blur-xl group-hover:opacity-50 transition-opacity duration-300"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                    <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 backdrop-blur-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      <h3 className="text-lg font-display font-bold text-white text-center mb-2 group-hover:text-primary transition-colors">
                        {event.name}
                      </h3>
                      {(event.date || event.location) && (
                        <div className="text-sm text-gray-400 text-center mb-3">
                          {event.date && <div>{new Date(event.date).toLocaleDateString()}</div>}
                          {event.location && <div>{event.location}</div>}
                        </div>
                      )}
                      <div className="mt-auto flex items-center justify-center gap-2 text-primary text-sm font-semibold">
                        View Details <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                ) : (
                  <motion.div
                    className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6 backdrop-blur-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center"
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="text-lg font-display font-bold text-white text-center mb-2 group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>
                    {(event.date || event.location) && (
                      <div className="text-sm text-gray-400 text-center">
                        {event.date && <div>{new Date(event.date).toLocaleDateString()}</div>}
                        {event.location && <div>{event.location}</div>}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

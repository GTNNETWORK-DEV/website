import { motion } from "framer-motion";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { Link } from "wouter";
import { resolveMediaUrl } from "@/lib/media";

interface EventItem {
  id: number;
  name: string;
  event_date?: string | null;
  location?: string | null;
  link?: string | null;
  description?: string | null;
  image_url?: string | null;
  images?: string[];
}

export default function GTNEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/events`)
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

  useEffect(() => {
    if (loading) return;

    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const handleHashChange = () => scrollToHash();
    scrollToHash();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [loading, events.length]);

  return (
    <section className="py-20 bg-linear-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div>
            <h1 className="section-title text-white mb-3">Events</h1>
            <p className="text-gray-400 max-w-2xl">
              Explore upcoming and recent GTN gatherings with highlights and
              galleries from each event.
            </p>
          </div>
          <Link href="/" className="text-primary text-sm font-semibold">
            Back to Home
          </Link>
        </div>

        {loading && (
          <div className="text-center py-16 text-gray-400">
            Loading events...
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No events available yet. Please check back soon.
          </div>
        )}

        {!loading && events.length > 0 && (
          <div className="space-y-16">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                id={`event-${event.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <div className="flex flex-col lg:flex-row gap-10">
                  <div className="lg:w-1/3 space-y-4">
                    <h2 className="text-2xl font-display font-bold text-white">
                      {event.name}
                    </h2>

                    {(event.event_date || event.location) && (
                      <div className="space-y-2 text-sm text-gray-400">
                        {event.event_date && (
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-primary" />
                            {new Date(event.event_date).toLocaleDateString()}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    )}

                    {event.description && (
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    )}

                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary text-sm font-semibold"
                      >
                        Visit Event Page <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="lg:w-2/3">
                    <EventCollage event={event} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EventCollage({ event }: { event: EventItem }) {
  const images =
    event.images && event.images.length > 0
      ? event.images
      : event.image_url
      ? [event.image_url]
      : [];
  const resolvedImages = images
    .map((image) => resolveMediaUrl(image))
    .filter(Boolean);

  if (resolvedImages.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-2xl text-gray-500 text-sm">
        Event gallery coming soon.
      </div>
    );
  }

  const collageImages = resolvedImages;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[130px] md:auto-rows-[150px]">
      {collageImages.map((src, index) => (
        <motion.div
          key={`${src}-${index}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.04 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className={`overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg ${
            index === 0
              ? "col-span-2 row-span-2 min-h-[220px] md:min-h-[320px]"
              : "col-span-1 row-span-1"
          }`}
        >
          <img
            src={src}
            alt={`${event.name} collage ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}

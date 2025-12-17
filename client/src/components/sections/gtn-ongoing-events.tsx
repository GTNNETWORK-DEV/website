import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { API_BASE } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Link } from "wouter";
import { resolveMediaUrl } from "@/lib/media";

interface Event {
  id: number;
  name: string;
  image_url?: string | null;
  images?: string[];
  description?: string | null;
  event_date?: string | null;
  location?: string | null;
  link?: string | null;
}

export function GTNOngoingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 THIS IS THE MISSING PART (API CALL)
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
    if (!carouselApi || events.length < 2) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [carouselApi, events.length]);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

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
            className="max-w-6xl mx-auto"
          >
            <Carousel
              opts={{ align: "center", loop: events.length > 1 }}
              setApi={setCarouselApi}
              className="relative"
              style={{ perspective: "1200px" }}
            >
              <CarouselContent
                className="-ml-6 py-6"
                containerClassName="overflow-visible"
              >
                {events.map((event, index) => (
                  <CarouselItem
                    key={event.id}
                    className="pl-6 basis-[88%] sm:basis-[75%] md:basis-[60%] lg:basis-[45%]"
                  >
                    <motion.div variants={itemVariants} className="h-full">
                      <CarouselDepthItem
                        index={index}
                        total={events.length}
                        activeIndex={activeIndex}
                      >
                        <Link
                          href={`/events#event-${event.id}`}
                          className="block h-full"
                        >
                          <EventCard event={event} />
                        </Link>
                      </CarouselDepthItem>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CarouselDepthItem({
  children,
  index,
  total,
  activeIndex,
}: {
  children: ReactNode;
  index: number;
  total: number;
  activeIndex: number;
}) {
  const delta = getCarouselDelta(index, activeIndex, total);
  const depth = Math.min(Math.abs(delta), 3);
  const scale = 1 - depth * 0.06;
  const opacity = depth === 0 ? 1 : depth === 1 ? 0.7 : 0.5;
  const translateY = depth * 10;
  const rotateY = delta * -10;
  const translateZ = depth * -40;

  return (
    <div
      className="h-full transition-[transform,opacity] duration-700 ease-out will-change-transform"
      style={{
        transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

function getCarouselDelta(index: number, activeIndex: number, total: number) {
  let delta = index - activeIndex;
  if (total > 0) {
    const half = total / 2;
    if (delta > half) delta -= total;
    if (delta < -half) delta += total;
  }
  return delta;
}

/* =========================
   Event Card Component
   ========================= */
function EventCard({ event }: { event: Event }) {
  const images = event.images?.length
    ? event.images
    : event.image_url
    ? [event.image_url]
    : [];

  return (
    <div className="h-full bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-xl p-6 backdrop-blur-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center">
      {images.length > 0 && (
        <EventImageRotator images={images} alt={event.name} />
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

      <div className="mt-auto flex items-center gap-2 text-primary text-sm font-semibold">
        View Event <ExternalLink className="w-4 h-4" />
      </div>
    </div>
  );
}

function EventImageRotator({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedImages = images
    .map((image) => resolveMediaUrl(image))
    .filter(Boolean);

  if (resolvedImages.length === 0) {
    return null;
  }

  useEffect(() => {
    if (resolvedImages.length < 2) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % resolvedImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [resolvedImages.length]);

  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${resolvedImages[activeIndex]}-${activeIndex}`}
          src={resolvedImages[activeIndex]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>
    </div>
  );
}

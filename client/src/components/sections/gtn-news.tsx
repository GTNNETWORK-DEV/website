import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { API_BASE } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { resolveMediaUrl } from "@/lib/media";
import { Link } from "wouter";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  images?: string[];
  created_at?: string | null;
}

export function GTNNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 API CALL (THIS WAS MISSING)
  useEffect(() => {
    fetch(`${API_BASE}/news`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          setNews([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading news:", err);
        setLoading(false);
      });
  }, [API_BASE]);

  const latestNews = news.slice(0, 6);

  useEffect(() => {
    if (!carouselApi || latestNews.length < 2) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [carouselApi, latestNews.length]);

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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="section-title text-white mb-4">GTN News & Updates</h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Breaking news and important updates from the Global Team Network.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-gray-400">
            Loading news…
          </div>
        )}

        {/* Empty */}
        {!loading && latestNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">
              No news yet. Check back soon!
            </p>
          </motion.div>
        )}

        {/* News Cards */}
        {!loading && latestNews.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <Carousel
              opts={{ align: "center", loop: latestNews.length > 1 }}
              setApi={setCarouselApi}
              className="relative"
              style={{ perspective: "1200px" }}
            >
              <CarouselContent
                className="-ml-6 py-6"
                containerClassName="overflow-visible"
              >
                {latestNews.map((item, index) => (
                  <CarouselItem
                    key={item.id}
                    className="pl-6 basis-[88%] sm:basis-[75%] md:basis-[60%] lg:basis-[45%]"
                  >
                    <Link
                      href={`/news#news-${item.id}`}
                      className="block h-full"
                    >
                      <motion.div variants={itemVariants} className="h-full">
                        <CarouselDepthItem
                          index={index}
                          total={latestNews.length}
                          activeIndex={activeIndex}
                        >
                          <div className="feature-card bg-card p-6 rounded-xl">
                            <div className="grid md:grid-cols-3 gap-6 items-start">
                              {/* Image */}
                              {getNewsImages(item).length > 0 && (
                                <div className="md:col-span-1 relative overflow-hidden h-48 rounded-lg">
                                  <NewsImageRotator
                                    images={getNewsImages(item)}
                                    alt={item.title}
                                  />
                                </div>
                              )}

                              {/* Content */}
                              <div className="md:col-span-2">
                                <h3 className="text-2xl font-display font-bold text-white mb-3 line-clamp-2">
                                  {item.title}
                                </h3>

                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                  {item.description}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  {item.created_at
                                    ? new Date(item.created_at).toLocaleDateString()
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CarouselDepthItem>
                      </motion.div>
                    </Link>
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

function getNewsImages(item: NewsItem) {
  if (item.images && item.images.length > 0) {
    return item.images;
  }
  if (item.image_url) {
    return [item.image_url];
  }
  return [];
}

function NewsImageRotator({
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

  useEffect(() => {
    if (resolvedImages.length < 2) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % resolvedImages.length);
    }, 5200);

    return () => clearInterval(interval);
  }, [resolvedImages.length]);

  if (resolvedImages.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${resolvedImages[activeIndex]}-${activeIndex}`}
          src={resolvedImages[activeIndex]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1 }}
          whileHover={{ scale: 1.1 }}
        />
      </AnimatePresence>
    </div>
  );
}

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  body?: string | null;
  image_url?: string;
  created_at?: string;
  author: string;
}

export function GTNBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 API CALL (THIS WAS MISSING)
  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blogs:", err);
        setLoading(false);
      });
  }, [API_BASE]);

  const latestBlogs = blogs.slice(0, 9);
  const itemBasisClass =
    latestBlogs.length <= 2
      ? "basis-[92%] sm:basis-[80%] md:basis-[65%] lg:basis-[60%]"
      : "basis-[88%] sm:basis-[75%] md:basis-[60%] lg:basis-[45%]";

  useEffect(() => {
    if (!carouselApi || latestBlogs.length < 2) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [carouselApi, latestBlogs.length]);

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
    <section className="py-20 bg-linear-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="section-title text-white mb-4">Latest Articles</h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Stay updated with insights, stories, and tips from the GTN community.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-gray-400">
            Loading blogs…
          </div>
        )}

        {/* Empty */}
        {!loading && latestBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </motion.div>
        )}

        {/* Blogs */}
        {!loading && latestBlogs.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <Carousel
              opts={{ align: "center", loop: latestBlogs.length > 1 }}
              setApi={setCarouselApi}
              className="relative"
              style={{ perspective: "1200px" }}
            >
              <CarouselContent
                className="-ml-6 py-6"
                containerClassName="overflow-visible"
              >
                {latestBlogs.map((blog, index) => (
                  <CarouselItem
                    key={blog.id}
                    className={`pl-6 ${itemBasisClass}`}
                  >
                  <Link href={`/blogs/${blog.id}`} className="block h-full">
                      <motion.div variants={itemVariants} className="h-full">
                        <CarouselDepthItem
                          index={index}
                          total={latestBlogs.length}
                          activeIndex={activeIndex}
                        >
                          <div className="feature-card bg-card p-6 rounded-xl">
                            {blog.image_url && (
                              <div className="relative overflow-hidden h-48 mb-4 rounded-lg">
                                <motion.img
                                  src={resolveMediaUrl(blog.image_url)}
                                  alt={blog.title}
                                  className="w-full h-full object-cover"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.4 }}
                                />
                              </div>
                            )}

                            <h3 className="text-xl font-display font-bold text-white mb-2 line-clamp-2">
                              {blog.title}
                            </h3>

                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                              {blog.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {blog.created_at
                                  ? new Date(blog.created_at).toLocaleDateString()
                                  : ""}
                              </div>
                              <span className="text-primary font-semibold">
                                {blog.author}
                              </span>
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

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import { GTNNavbar } from "@/components/layout/gtn-navbar";
import { GTNPageHeader } from "@/components/layout/gtn-page-header";
import { Link } from "wouter";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  body?: string | null;
  author: string;
  image_url?: string | null;
  created_at?: string | null;
}

export default function GTNBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [loading, blogs.length]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GTNNavbar />
      <section className="pt-28 pb-20 bg-linear-to-b from-background to-background/80">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <GTNPageHeader
              title="Blog"
              subtitle="Insights, stories, and advice from the GTN community."
              kicker="Community Journal"
            />
          </div>

          {loading && (
            <div className="text-center py-16 text-gray-400">
              Loading blogs...
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No blog posts yet. Please check back soon.
            </div>
          )}

          {!loading && blogs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  id={`blog-${blog.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.04 }}
                  viewport={{ once: true }}
                className="feature-card bg-card p-6 rounded-xl"
              >
                {blog.image_url && (
                  <div className="relative overflow-hidden h-48 mb-4 rounded-lg">
                    <motion.img
                        src={resolveMediaUrl(blog.image_url)}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}

                  <Link href={`/blogs/${blog.id}`} className="group block">
                    <h2 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
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
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

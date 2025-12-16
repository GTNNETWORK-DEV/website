import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image_url?: string;
  created_at?: string;
  author: string;
}

export function GTNBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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

  const latestBlogs = blogs.slice(0, 3);

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
            className="grid md:grid-cols-3 gap-8"
          >
            {latestBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="feature-card bg-card p-6 rounded-xl"
              >
                {blog.image_url && (
                  <div className="relative overflow-hidden h-48 mb-4 rounded-lg">
                    <motion.img
                      src={blog.image_url}
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

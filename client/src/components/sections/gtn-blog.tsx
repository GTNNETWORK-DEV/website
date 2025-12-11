import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}

export function GTNBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem("gtn_blogs");
    return saved ? JSON.parse(saved) : [];
  });

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

  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-20"
        >
          <div>
            <h2 className="section-title text-white mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Stay updated with insights, stories, and tips from the GTN community.
            </p>
          </div>
          <a href="/admin/blogs" className="text-primary hover:text-primary/80 font-semibold flex items-center gap-2 transition-colors">
            Manage Blogs <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {latestBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
          </motion.div>
        ) : (
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
                className="group feature-card bg-card cursor-pointer"
              >
                <div className="relative overflow-hidden h-48 mb-4 rounded-lg">
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.date).toLocaleDateString()}
                  </div>
                  <span className="text-primary font-semibold">{blog.author}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {blogs.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a href="/admin/blogs" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors">
              View All Articles <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

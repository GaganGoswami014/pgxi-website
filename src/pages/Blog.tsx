import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) console.log(error);
      if (data) setBlogs(data);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4">

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <h1 className="text-5xl font-bold tracking-tight mb-4">
              Latest <span className="text-primary">Insights</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Growth strategies, creative insights, and marketing tips from the PG-XI team.
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-muted animate-pulse h-80" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              No posts published yet. Check back soon.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <Link to={`/blog/${blog.slug}`} className="group block h-full">
                    <div className="h-full border border-border rounded-2xl overflow-hidden bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">

                      {/* Card Image */}
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        {blog.featured_image ? (
                          <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                            <span className="text-muted-foreground text-xs uppercase tracking-widest">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        {blog.category && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                            <Tag className="w-3 h-3" />
                            {blog.category}
                          </span>
                        )}

                        <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h3>

                        {blog.meta_description && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                            {blog.meta_description}
                          </p>
                        )}

                        <div className="flex items-center gap-1 text-xs font-medium text-primary mt-auto">
                          Read article
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Tag, 
  X,
  Share2,
  Bookmark
} from 'lucide-react';

// ==========================================
// DUMMY DATA GENERATOR (15 BLOGS)
// ==========================================
const BLOG_DATA = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  title: [
    "The Future of SEO in 2025: What You Need to Know",
    "Top 10 Digital Marketing Trends for Small Businesses",
    "How to Optimize Your PPC Campaigns for Higher ROI",
    "The Ultimate Guide to Social Media Branding",
    "Why Content Marketing is King in the AI Era",
    "Understanding Google's Latest Core Updates",
    "Email Marketing Strategies That Actually Convert",
    "Local SEO: Dominating Your Neighborhood Search",
    "Video Marketing: The Next Big Thing",
    "Voice Search Optimization Techniques",
    "The Power of Influencer Marketing",
    "Mobile-First Indexing: A Developer's Guide",
    "Cybersecurity in Digital Advertising",
    "Building Backlinks: Quality over Quantity",
    "Analytics 101: Reading Data like a Pro"
  ][i],
  category: ["SEO", "Marketing", "PPC", "Social Media", "Content"][i % 5],
  author: ["Amit Sharma", "Sarah Jenkins", "Rajesh Kumar", "Emily Doe", "John Smith"][i % 5],
  date: `Oct ${10 + i}, 2025`,
  readTime: `${3 + (i % 5)} min read`,
  image: `https://picsum.photos/seed/${i + 50}/800/600`, // Random consistent images
  excerpt: "Discover the latest strategies to boost your online presence. We dive deep into actionable tips that drive real traffic and revenue.",
  content: `
    <p>In today's rapidly evolving digital landscape, staying ahead of the curve is not just an option—it's a necessity. Businesses that adapt to these changes are the ones that thrive.</p>
    <br/>
    <h3 class="text-xl font-bold text-white mb-2">1. The Shift to AI-Driven Marketing</h3>
    <p>Artificial Intelligence is no longer a buzzword; it's a fundamental tool. From chatbots to predictive analytics, AI is reshaping how we interact with customers.</p>
    <br/>
    <h3 class="text-xl font-bold text-white mb-2">2. User Experience (UX) is Paramount</h3>
    <p>Google's Core Web Vitals have made it clear: if your site is slow or difficult to navigate, your rankings will suffer. Focus on mobile responsiveness and lightning-fast load times.</p>
    <br/>
    <h3 class="text-xl font-bold text-white mb-2">3. Video Content Dominance</h3>
    <p>Short-form video content on platforms like YouTube Shorts and Instagram Reels is seeing unprecedented engagement rates. If you aren't creating video, you're missing out.</p>
    <br/>
    <p>Conclusion: The key to success lies in consistent adaptation and a willingness to experiment with new technologies.</p>
  `
}));

// ==========================================
// COMPONENT: BLOG DETAILS (Single View)
// ==========================================
const BlogDetails = ({ blog, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto pt-10 pb-20 px-4 md:px-6"
    >
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-blue-400 hover:text-white mb-8 transition-colors"
      >
        <div className="p-2 rounded-full bg-white/5 group-hover:bg-blue-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </div>
        <span className="font-medium">Back to Blogs</span>
      </button>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {blog.category}
          </span>
          <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {blog.date}</div>
          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {blog.readTime}</div>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {blog.author[0]}
          </div>
          <div>
            <div className="text-white font-medium">{blog.author}</div>
            <div className="text-xs text-gray-500">Author</div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-blue-900/20">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021333] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="prose prose-lg prose-invert max-w-none text-gray-300">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Share Section */}
      <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
        <span className="text-white font-semibold">Share this article:</span>
        <div className="flex gap-4">
          <button className="p-3 rounded-full bg-white/5 hover:bg-blue-600 transition-colors text-white">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-white/5 hover:bg-blue-600 transition-colors text-white">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENT: BLOG LIST CARD
// ==========================================
const BlogCard = ({ blog, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onClick={() => onClick(blog)}
      className="group cursor-pointer relative bg-[#0a162e] border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)] hover:border-blue-500/30"
    >
      {/* Image */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded-full shadow-lg">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-600"></span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-3 mb-6">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white">
              {blog.author[0]}
            </div>
            <span className="text-xs text-gray-300">{blog.author}</span>
          </div>
          <span className="text-blue-400 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read More <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENT: PAGINATION
// ==========================================
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-16">
      <button 
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-white/5 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`w-10 h-10 rounded-lg text-sm font-bold transition-all
            ${currentPage === number 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' 
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}
          `}
        >
          {number}
        </button>
      ))}

      <button 
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
        className="p-2 rounded-lg bg-white/5 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = BLOG_DATA.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(BLOG_DATA.length / blogsPerPage)) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#021333] to-[#041e4d] overflow-hidden font-sans">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-24">
        
        {/* VIEW SWITCHER: LIST or DETAIL */}
        <AnimatePresence mode="wait">
          {selectedBlog ? (
            <BlogDetails 
              key="details" 
              blog={selectedBlog} 
              onBack={() => {
                setSelectedBlog(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center mb-20">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-3"
                >
                  Our Blog
                </motion.h2>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-black text-white mb-6"
                >
                  Latest Insights & <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Trends
                  </span>
                </motion.h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Stay updated with the latest in digital marketing, SEO, and technology. Expert advice to help your business grow.
                </p>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {currentBlogs.map((blog, idx) => (
                  <BlogCard 
                    key={blog.id} 
                    blog={blog} 
                    index={idx}
                    onClick={setSelectedBlog} 
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination 
                postsPerPage={blogsPerPage} 
                totalPosts={BLOG_DATA.length} 
                paginate={paginate}
                currentPage={currentPage}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Blog;
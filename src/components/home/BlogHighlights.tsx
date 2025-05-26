'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDaysIcon,
  ClockIcon,
  ArrowRightIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Blog post data interface
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  slug: string;
}

// Sample blog post data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Top 10 Investment Properties in Addis Ababa for 2024',
    excerpt: 'Discover the most promising real estate investment opportunities in Ethiopia\'s capital city. Our experts analyze market trends and highlight prime locations.',
    image: '/images/estate1.jpg',
    author: 'Sarah Johnson',
    publishDate: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Investment',
    slug: 'top-investment-properties-addis-ababa-2024'
  },
  {
    id: 2,
    title: 'First-Time Home Buyer\'s Guide to Ethiopian Real Estate',
    excerpt: 'Navigate the property market with confidence. Essential tips, financing options, and legal considerations for new homeowners in Ethiopia.',
    image: '/images/estate2.jpg',
    author: 'Michael Chen',
    publishDate: 'March 10, 2024',
    readTime: '7 min read',
    category: 'Buying Guide',
    slug: 'first-time-home-buyer-guide-ethiopia'
  },
  {
    id: 3,
    title: 'Luxury Real Estate Market Trends in 2024',
    excerpt: 'Explore the evolving landscape of luxury properties. Market insights, pricing trends, and what discerning buyers should know.',
    image: '/images/estate3.jpg',
    author: 'Aisha Mohammed',
    publishDate: 'March 5, 2024',
    readTime: '6 min read',
    category: 'Market Analysis',
    slug: 'luxury-real-estate-market-trends-2024'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const BlogHighlights = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      gsap.to('.blog-bg-element', {
        y: -25,
        rotation: 2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Title reveal animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax effect for section background
      gsap.to('.blog-parallax', {
        yPercent: -10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-silver-mist overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blog-bg-element absolute top-20 right-10 w-32 h-32 bg-deep-teal/5 rounded-full blur-xl" />
        <div className="blog-bg-element absolute bottom-32 left-16 w-48 h-48 bg-warm-sand/8 rounded-full blur-2xl" />
        <div className="blog-parallax absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-deep-teal/3 to-royal-navy/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-royal-navy mb-6"
          >
            Latest News &{' '}
            <span className="text-deep-teal relative">
              Updates
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-lg md:text-xl text-slate-gray font-montserrat max-w-2xl mx-auto leading-relaxed"
          >
            Tips, trends, and insights from Mekiya's experts
          </motion.p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-500 border border-silver-mist/30 hover:border-deep-teal/20"
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-block px-3 py-1 bg-deep-teal/90 text-white text-xs font-montserrat font-medium rounded-full backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Blog Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-royal-navy/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Card Content */}
              <div className="p-6 relative">
                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-slate-gray font-montserrat mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{post.publishDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-playfair font-semibold text-royal-navy mb-3 line-clamp-2 group-hover:text-deep-teal transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-gray font-montserrat text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-slate-gray font-montserrat">
                    <UserIcon className="w-4 h-4" />
                    <span>By {post.author}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-deep-teal font-montserrat font-medium text-sm hover:text-royal-navy transition-colors duration-300 group/link"
                  >
                    Read More
                    <motion.div
                      className="ml-1"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </motion.div>
                  </Link>
                </div>
              </div>

              {/* Hover Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
              </div>

              {/* Click Overlay */}
              <Link 
                href={`/blog/${post.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`Read more about ${post.title}`}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold rounded-full hover:shadow-xl transition-all duration-300 group"
            >
              Explore All Posts
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHighlights;
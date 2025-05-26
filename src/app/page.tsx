'use client';
import HeroSection from '../components/HeroSection';
import FeaturedProperties from '../components/FeaturedProperties';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Properties Section */}
      <FeaturedProperties />

      {/* Additional Content Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl font-bold text-royal-navy mb-6">
              Featured Properties
            </h2>
            <p className="font-montserrat text-lg text-slate-gray max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties in the most sought-after locations.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-elegant overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-deep-teal to-royal-navy" />
                <div className="p-6">
                  <h3 className="font-playfair font-semibold text-xl text-charcoal mb-2">
                    Modern Villa {i}
                  </h3>
                  <p className="font-montserrat text-slate-gray mb-4">
                    Premium location with stunning views
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat font-bold text-deep-teal text-lg">
                      $1,{200 + i * 100},000
                    </span>
                    <button className="text-royal-navy hover:text-deep-teal transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-alabaster">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl font-bold text-royal-navy mb-6">
              Our Premium Services
            </h2>
            <p className="font-montserrat text-lg text-slate-gray max-w-2xl mx-auto">
              Experience excellence in every aspect of your real estate journey.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Property Sales', icon: '🏠' },
              { title: 'Investment Advice', icon: '📈' },
              { title: 'Market Analysis', icon: '📊' },
              { title: 'Property Management', icon: '🔑' }
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-elegant hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-playfair font-semibold text-xl text-charcoal mb-3">
                  {service.title}
                </h3>
                <p className="font-montserrat text-slate-gray">
                  Professional and reliable service tailored to your needs.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
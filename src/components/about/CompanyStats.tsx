'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  UserGroupIcon,
  MapPinIcon,
  CalendarDaysIcon,
  TrophyIcon,
  StarIcon,
  CurrencyDollarIcon,
  HomeIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Company statistics interface
interface CompanyStat {
  id: number;
  title: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
  bgColor: string;
  trend?: number;
}

// Market coverage interface
interface MarketArea {
  id: number;
  region: string;
  cities: string[];
  properties: number;
  coverage: number;
}

// Company achievements interface
interface Achievement {
  id: number;
  title: string;
  year: string;
  description: string;
  icon: React.ComponentType<any>;
}

// Company statistics data
const companyStats: CompanyStat[] = [
  {
    id: 1,
    title: 'Years in Business',
    value: 12,
    suffix: '+',
    icon: CalendarDaysIcon,
    description: 'Serving Ethiopian real estate market',
    color: 'text-deep-teal',
    bgColor: 'bg-deep-teal/10',
    trend: 0
  },
  {
    id: 2,
    title: 'Properties Sold',
    value: 2847,
    suffix: '+',
    icon: HomeIcon,
    description: 'Successful property transactions',
    color: 'text-royal-navy',
    bgColor: 'bg-royal-navy/10',
    trend: 15
  },
  {
    id: 3,
    title: 'Properties Managed',
    value: 1250,
    suffix: '+',
    icon: BuildingOfficeIcon,
    description: 'Active property management portfolio',
    color: 'text-warm-sand',
    bgColor: 'bg-warm-sand/20',
    trend: 8
  },
  {
    id: 4,
    title: 'Client Satisfaction',
    value: 98.5,
    suffix: '%',
    icon: StarIcon,
    description: 'Based on customer feedback surveys',
    color: 'text-success',
    bgColor: 'bg-success/10',
    trend: 2
  },
  {
    id: 5,
    title: 'Market Value',
    value: 450,
    suffix: 'M',
    prefix: '$',
    icon: CurrencyDollarIcon,
    description: 'Total property value transacted',
    color: 'text-gold-leaf',
    bgColor: 'bg-gold-leaf/20',
    trend: 22
  },
  {
    id: 6,
    title: 'Happy Clients',
    value: 5200,
    suffix: '+',
    icon: UserGroupIcon,
    description: 'Satisfied customers nationwide',
    color: 'text-deep-teal',
    bgColor: 'bg-deep-teal/10',
    trend: 12
  },
  {
    id: 7,
    title: 'Market Coverage',
    value: 85,
    suffix: '%',
    icon: MapPinIcon,
    description: 'Coverage across Ethiopian regions',
    color: 'text-royal-navy',
    bgColor: 'bg-royal-navy/10',
    trend: 5
  },
  {
    id: 8,
    title: 'Industry Awards',
    value: 18,
    suffix: '+',
    icon: TrophyIcon,
    description: 'Recognition for excellence',
    color: 'text-gold-leaf',
    bgColor: 'bg-gold-leaf/20',
    trend: 0
  }
];

// Market coverage areas
const marketAreas: MarketArea[] = [
  {
    id: 1,
    region: 'Addis Ababa',
    cities: ['Bole', 'Kirkos', 'Yeka', 'Arada', 'Lideta'],
    properties: 1200,
    coverage: 95
  },
  {
    id: 2,
    region: 'Oromia',
    cities: ['Adama', 'Bishoftu', 'Shashamane', 'Jimma'],
    properties: 680,
    coverage: 75
  },
  {
    id: 3,
    region: 'Amhara',
    cities: ['Bahir Dar', 'Gondar', 'Dessie', 'Debre Birhan'],
    properties: 420,
    coverage: 65
  },
  {
    id: 4,
    region: 'SNNP',
    cities: ['Hawassa', 'Arba Minch', 'Wolaita Sodo'],
    properties: 280,
    coverage: 55
  },
  {
    id: 5,
    region: 'Tigray',
    cities: ['Mekelle', 'Adigrat', 'Axum'],
    properties: 180,
    coverage: 45
  },
  {
    id: 6,
    region: 'Dire Dawa',
    cities: ['Dire Dawa City'],
    properties: 150,
    coverage: 80
  }
];

// Company achievements
const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Best Real Estate Company',
    year: '2023',
    description: 'Ethiopian Business Excellence Award',
    icon: TrophyIcon
  },
  {
    id: 2,
    title: 'Customer Service Excellence',
    year: '2023',
    description: 'National Customer Service Award',
    icon: StarIcon
  },
  {
    id: 3,
    title: 'Innovation in Real Estate',
    year: '2022',
    description: 'Technology Innovation Recognition',
    icon: CheckBadgeIcon
  },
  {
    id: 4,
    title: 'Market Leader',
    year: '2022',
    description: 'Largest Market Share in Addis Ababa',
    icon: ArrowTrendingUpIcon
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
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

const statVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const mapVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const CompanyStats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const [animatedStats, setAnimatedStats] = useState<Record<number, number>>({});
  const [isVisible, setIsVisible] = useState(false);

  // Initialize animated stats
  useEffect(() => {
    const initialStats: Record<number, number> = {};
    companyStats.forEach(stat => {
      initialStats[stat.id] = 0;
    });
    setAnimatedStats(initialStats);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      gsap.to('.stats-bg-element', {
        y: -50,
        rotation: 10,
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
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        gsap.fromTo(statsRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              onEnter: () => {
                setIsVisible(true);
                // Animate each stat counter
                companyStats.forEach((stat, index) => {
                  gsap.to({}, {
                    duration: 2 + (index * 0.1),
                    ease: 'power2.out',
                    onUpdate: function() {
                      const progress = this.progress();
                      const currentValue = Math.round(stat.value * progress);
                      setAnimatedStats(prev => ({
                        ...prev,
                        [stat.id]: currentValue
                      }));
                    }
                  });
                });
              }
            }
          }
        );
      }

      // Map animation
      if (mapRef.current) {
        const mapItems = mapRef.current.children;
        gsap.fromTo(mapItems,
          {
            opacity: 0,
            x: -80,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Achievements animation
      if (achievementsRef.current) {
        const achievementItems = achievementsRef.current.children;
        gsap.fromTo(achievementItems,
          {
            opacity: 0,
            y: 60,
            rotationY: 15
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax effect for section background
      gsap.to('.stats-parallax', {
        yPercent: -40,
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
      className="relative py-20 lg:py-32 bg-gradient-to-br from-royal-navy via-deep-teal to-royal-navy overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stats-bg-element absolute top-20 left-10 w-48 h-48 bg-warm-sand/10 rounded-full blur-2xl" />
        <div className="stats-bg-element absolute bottom-32 right-16 w-64 h-64 bg-gold-leaf/8 rounded-full blur-3xl" />
        <div className="stats-bg-element absolute top-1/3 right-1/3 w-40 h-40 bg-alabaster/5 rounded-full blur-xl" />
        <div className="stats-parallax absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-warm-sand/5 to-gold-leaf/5 rounded-full blur-3xl" />
        
        {/* Ethiopian Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-warm-sand rotate-45" />
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-gold-leaf rotate-12" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-alabaster rotate-45" />
          <div className="absolute bottom-40 right-1/3 w-18 h-18 border-2 border-warm-sand rotate-12" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6"
          >
            Our{' '}
            <span className="text-warm-sand relative">
              Impact
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-warm-sand to-gold-leaf rounded-full" />
            </span>
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-lg md:text-xl text-alabaster/90 font-montserrat max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Transforming Ethiopia's real estate landscape with exceptional results and unwavering commitment to excellence
          </motion.p>
          
          <motion.div 
            variants={titleVariants}
            className="flex items-center justify-center space-x-2 text-warm-sand/80"
          >
            <GlobeAltIcon className="w-5 h-5" />
            <span className="text-sm font-montserrat">Serving Ethiopia Since 2012</span>
          </motion.div>
        </motion.div>

        {/* Main Statistics Grid */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20"
        >
          {companyStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={statVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-alabaster/20 hover:border-warm-sand/30 overflow-hidden"
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-warm-sand/0 via-transparent to-gold-leaf/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Trend Indicator */}
                {stat.trend && stat.trend > 0 && (
                  <div className="absolute top-4 right-4 flex items-center space-x-1 text-success text-xs font-montserrat font-semibold">
                    <ArrowTrendingUpIcon className="w-3 h-3" />
                    <span>+{stat.trend}%</span>
                  </div>
                )}
                
                {/* Icon */}
                <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
                
                {/* Statistics */}
                <div className="relative z-10 space-y-3">
                  <div className="text-4xl lg:text-5xl font-playfair font-bold text-royal-navy group-hover:text-deep-teal transition-colors duration-300">
                    {stat.prefix}{animatedStats[stat.id] || 0}{stat.suffix}
                  </div>
                  
                  <h3 className="text-lg font-montserrat font-semibold text-royal-navy">
                    {stat.title}
                  </h3>
                  
                  <p className="text-sm text-slate-gray font-montserrat leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Market Coverage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Market Coverage Map */}
          <motion.div
            variants={mapVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-4">
                Market{' '}
                <span className="text-warm-sand">Coverage</span>
              </h3>
              <p className="text-alabaster/80 font-montserrat leading-relaxed">
                Comprehensive real estate services across Ethiopia's major regions and cities
              </p>
            </div>
            
            <motion.div 
              ref={mapRef}
              className="space-y-4"
            >
              {marketAreas.map((area) => (
                <motion.div
                  key={area.id}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-alabaster/20 hover:border-warm-sand/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-montserrat font-semibold text-white">
                      {area.region}
                    </h4>
                    <div className="text-warm-sand font-montserrat font-bold">
                      {area.coverage}%
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2 text-alabaster/80 text-sm">
                      <HomeIcon className="w-4 h-4" />
                      <span>{area.properties} Properties</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {area.cities.map((city, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-warm-sand/20 text-warm-sand text-xs font-montserrat rounded-full"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                  
                  {/* Coverage Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-warm-sand to-gold-leaf h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.coverage}%` }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-4">
                Our{' '}
                <span className="text-warm-sand">Achievements</span>
              </h3>
              <p className="text-alabaster/80 font-montserrat leading-relaxed">
                Recognition for excellence and innovation in Ethiopian real estate
              </p>
            </div>
            
            <motion.div 
              ref={achievementsRef}
              className="space-y-6"
            >
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-alabaster/20 hover:border-gold-leaf/40 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gold-leaf/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-gold-leaf" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-montserrat font-semibold text-white group-hover:text-warm-sand transition-colors duration-300">
                            {achievement.title}
                          </h4>
                          <span className="text-gold-leaf font-montserrat font-bold text-sm">
                            {achievement.year}
                          </span>
                        </div>
                        
                        <p className="text-alabaster/80 font-montserrat text-sm leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-warm-sand via-gold-leaf to-warm-sand text-royal-navy font-montserrat font-bold rounded-full hover:shadow-2xl transition-all duration-300 group bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            <ChartBarIcon className="w-5 h-5 mr-3" />
            View Detailed Analytics
            <motion.div
              className="ml-3"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.div>
          
          <p className="text-sm text-alabaster/70 font-montserrat mt-4 max-w-md mx-auto">
            Discover comprehensive insights into our market performance and growth trajectory
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyStats;
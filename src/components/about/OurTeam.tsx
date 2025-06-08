'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  EnvelopeIcon,
  PhoneIcon,
  StarIcon,
  UserGroupIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  ChartBarIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Team member interfaces
interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  phone: string;
  email: string;
  rating: number;
  experience: string;
  specialization: string[];
  achievements: string[];
  education: string;
  languages: string[];
  isLeadership?: boolean;
  isDepartmentHead?: boolean;
  joinDate: string;
  location: string;
}

// Team statistics interface
interface TeamStats {
  totalAgents: number;
  totalExperience: number;
  propertiesSold: number;
  clientSatisfaction: number;
  awards: number;
  departments: number;
}

// Team data
const teamStats: TeamStats = {
  totalAgents: 45,
  totalExperience: 180,
  propertiesSold: 2500,
  clientSatisfaction: 98,
  awards: 15,
  departments: 6
};

const teamMembers: TeamMember[] = [
  // Leadership Team
  {
    id: 1,
    name: 'Alemayehu Tadesse',
    role: 'Chief Executive Officer',
    department: 'Executive Leadership',
    image: '/images/agent1.jpg',
    phone: '+251 911 000 001',
    email: 'alemayehu@mekiya.com',
    rating: 5.0,
    experience: '15+ Years',
    specialization: ['Strategic Planning', 'Business Development', 'Market Analysis'],
    achievements: ['Founded Mekiya Real Estate', 'Ethiopian Real Estate Excellence Award', 'Business Leader of the Year 2023'],
    education: 'MBA in Business Administration',
    languages: ['Amharic', 'English', 'Arabic'],
    isLeadership: true,
    joinDate: '2018',
    location: 'Addis Ababa'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Chief Operations Officer',
    department: 'Operations',
    image: '/images/agent5.jpg',
    phone: '+251 911 000 002',
    email: 'sarah@mekiya.com',
    rating: 4.9,
    experience: '12+ Years',
    specialization: ['Operations Management', 'Process Optimization', 'Team Leadership'],
    achievements: ['Operational Excellence Award', 'Process Innovation Leader', 'Team Builder of the Year'],
    education: 'Masters in Operations Management',
    languages: ['English', 'Amharic', 'French'],
    isLeadership: true,
    joinDate: '2019',
    location: 'Addis Ababa'
  },
  // Department Heads
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Head of Sales',
    department: 'Sales',
    image: '/images/agent2.jpg',
    phone: '+251 911 000 003',
    email: 'michael@mekiya.com',
    rating: 4.8,
    experience: '10+ Years',
    specialization: ['Sales Strategy', 'Team Management', 'Client Relations'],
    achievements: ['Top Sales Leader 2023', 'Million Dollar Club', 'Customer Excellence Award'],
    education: 'Bachelor in Business Administration',
    languages: ['English', 'Mandarin', 'Amharic'],
    isDepartmentHead: true,
    joinDate: '2020',
    location: 'Addis Ababa'
  },
  {
    id: 4,
    name: 'Hana Biruk',
    role: 'Head of Marketing',
    department: 'Marketing',
    image: '/images/agent6.jpg',
    phone: '+251 911 000 004',
    email: 'hana@mekiya.com',
    rating: 4.9,
    experience: '8+ Years',
    specialization: ['Digital Marketing', 'Brand Strategy', 'Content Creation'],
    achievements: ['Marketing Innovation Award', 'Brand Excellence Recognition', 'Digital Leader 2023'],
    education: 'Masters in Marketing Communications',
    languages: ['Amharic', 'English', 'Italian'],
    isDepartmentHead: true,
    joinDate: '2020',
    location: 'Addis Ababa'
  },
  // Senior Agents
  {
    id: 5,
    name: 'David Wilson',
    role: 'Senior Investment Specialist',
    department: 'Investment',
    image: '/images/agent4.jpg',
    phone: '+251 911 000 005',
    email: 'david@mekiya.com',
    rating: 4.7,
    experience: '12+ Years',
    specialization: ['Investment Properties', 'Portfolio Management', 'Market Analysis'],
    achievements: ['Investment Expert of the Year', 'Top Performer 2023', 'Client Choice Award'],
    education: 'Masters in Finance',
    languages: ['English', 'Amharic', 'Spanish'],
    joinDate: '2019',
    location: 'Addis Ababa'
  },
  {
    id: 6,
    name: 'Zara Ahmed',
    role: 'Luxury Properties Specialist',
    department: 'Luxury Sales',
    image: '/images/agent3.jpg',
    phone: '+251 911 000 006',
    email: 'zara@mekiya.com',
    rating: 4.8,
    experience: '9+ Years',
    specialization: ['Luxury Real Estate', 'High-Net-Worth Clients', 'Premium Properties'],
    achievements: ['Luxury Sales Champion', 'Elite Agent Recognition', 'Premium Service Award'],
    education: 'Bachelor in Architecture',
    languages: ['Amharic', 'English', 'Arabic', 'French'],
    joinDate: '2021',
    location: 'Addis Ababa'
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

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
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

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const OurTeam = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const departmentRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const [activeTab, setActiveTab] = useState<'leadership' | 'departments' | 'agents'>('leadership');
  const [animatedStats, setAnimatedStats] = useState({
    totalAgents: 0,
    totalExperience: 0,
    propertiesSold: 0,
    clientSatisfaction: 0,
    awards: 0,
    departments: 0
  });

  // Filter team members by category
  const leadershipTeam = teamMembers.filter(member => member.isLeadership);
  const departmentHeads = teamMembers.filter(member => member.isDepartmentHead);
  const seniorAgents = teamMembers.filter(member => !member.isLeadership && !member.isDepartmentHead);

  // Get current team members based on active tab
  const getCurrentTeamMembers = () => {
    switch (activeTab) {
      case 'leadership':
        return leadershipTeam;
      case 'departments':
        return departmentHeads;
      case 'agents':
        return seniorAgents;
      default:
        return leadershipTeam;
    }
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      gsap.to('.team-bg-element', {
        y: -40,
        rotation: 8,
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
          { opacity: 0, y: 60 },
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
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              onEnter: () => {
                // Animate counters
                Object.keys(teamStats).forEach((key) => {
                  const target = teamStats[key as keyof TeamStats];
                  gsap.to(animatedStats, {
                    [key]: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                      setAnimatedStats(prev => ({
                        ...prev,
                        [key]: Math.round(gsap.getProperty(animatedStats, key) as number)
                      }));
                    }
                  });
                });
              }
            }
          }
        );
      }

      // Parallax effect for section background
      gsap.to('.team-parallax', {
        yPercent: -30,
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
      id="our-team"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-silver-mist overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="team-bg-element absolute top-32 left-16 w-40 h-40 bg-deep-teal/8 rounded-full blur-xl" />
        <div className="team-bg-element absolute bottom-40 right-20 w-56 h-56 bg-warm-sand/12 rounded-full blur-2xl" />
        <div className="team-bg-element absolute top-1/3 right-1/4 w-32 h-32 bg-royal-navy/6 rounded-full blur-xl" />
        <div className="team-parallax absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-deep-teal/8 to-royal-navy/8 rounded-full blur-3xl" />
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
            Our{' '}
            <span className="text-deep-teal relative">
              Team
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-lg md:text-xl text-slate-gray font-montserrat max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Meet the exceptional professionals who make Mekiya Real Estate Ethiopia's most trusted property partner
          </motion.p>
        </motion.div>

        {/* Team Statistics */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16 lg:mb-20"
        >
          <motion.div variants={statVariants} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-silver-mist/30">
            <div className="w-12 h-12 bg-deep-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-6 h-6 text-deep-teal" />
            </div>
            <div className="text-3xl font-playfair font-bold text-royal-navy mb-2">
              {animatedStats.totalAgents}+
            </div>
            <div className="text-sm text-slate-gray font-montserrat">Team Members</div>
          </motion.div>

          <motion.div variants={statVariants} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-silver-mist/30">
            <div className="w-12 h-12 bg-warm-sand/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-6 h-6 text-warm-sand" />
            </div>
            <div className="text-3xl font-playfair font-bold text-royal-navy mb-2">
              {animatedStats.totalExperience}+
            </div>
            <div className="text-sm text-slate-gray font-montserrat">Years Experience</div>
          </motion.div>

          <motion.div variants={statVariants} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-silver-mist/30">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BuildingOfficeIcon className="w-6 h-6 text-success" />
            </div>
            <div className="text-3xl font-playfair font-bold text-royal-navy mb-2">
              {animatedStats.propertiesSold.toLocaleString()}+
            </div>
            <div className="text-sm text-slate-gray font-montserrat">Properties Sold</div>
          </motion.div>

          <motion.div variants={statVariants} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-silver-mist/30">
            <div className="w-12 h-12 bg-royal-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="w-6 h-6 text-royal-navy" />
            </div>
            <div className="text-3xl font-playfair font-bold text-royal-navy mb-2">
              {animatedStats.clientSatisfaction}%
            </div>
            <div className="text-sm text-slate-gray font-montserrat">Client Satisfaction</div>
          </motion.div>

          <motion.div variants={statVariants} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-silver-mist/30">
            <div className="w-12 h-12 bg-gold-leaf/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrophyIcon className="w-6 h-6 text-gold-leaf" />
            </div>
            <div className="text-3xl font-playfair font-bold text-royal-navy mb-2">
              {animatedStats.awards}+
            </div>
            <div className="text-sm text-slate-gray font-montserrat">Awards Won</div>
          </motion.div>

          <motion.div variants={statVariants} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-silver-mist/30">
            <div className="w-12 h-12 bg-deep-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AcademicCapIcon className="w-6 h-6 text-deep-teal" />
            </div>
            <div className="text-3xl font-playfair font-bold text-royal-navy mb-2">
              {animatedStats.departments}
            </div>
            <div className="text-sm text-slate-gray font-montserrat">Departments</div>
          </motion.div>
        </motion.div>

        {/* Team Category Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { key: 'leadership', label: 'Leadership Team', count: leadershipTeam.length },
            { key: 'departments', label: 'Department Heads', count: departmentHeads.length },
            { key: 'agents', label: 'Senior Agents', count: seniorAgents.length }
          ].map((tab) => (
            <motion.button
              key={tab.key}
              variants={titleVariants}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 rounded-full font-montserrat font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-deep-teal to-royal-navy text-white shadow-lg'
                  : 'bg-white text-slate-gray hover:bg-silver-mist/30 border border-silver-mist'
              }`}
            >
              {tab.label} ({tab.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {getCurrentTeamMembers().map((member, index) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-silver-mist/30 hover:border-deep-teal/20 overflow-hidden"
            >
              {/* Leadership/Department Head Badge */}
              {(member.isLeadership || member.isDepartmentHead) && (
                <div className="absolute top-4 right-4 z-20">
                  <div className={`px-3 py-1 rounded-full text-xs font-montserrat font-semibold ${
                    member.isLeadership 
                      ? 'bg-gradient-to-r from-gold-leaf to-warm-sand text-white'
                      : 'bg-gradient-to-r from-deep-teal to-royal-navy text-white'
                  }`}>
                    {member.isLeadership ? 'Leadership' : 'Dept. Head'}
                  </div>
                </div>
              )}

              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/0 via-transparent to-warm-sand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Profile Section */}
              <div className="relative mb-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-silver-mist/30 group-hover:ring-deep-teal/40 transition-all duration-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 128px, 128px"
                  />
                  
                  {/* Online Status Indicator */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-3 border-white shadow-lg" />
                </div>
                
                {/* Rating Stars */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(member.rating)
                          ? 'text-gold-leaf fill-current'
                          : 'text-silver-mist'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-slate-gray font-montserrat ml-2 font-semibold">
                    {member.rating}
                  </span>
                </div>
              </div>

              {/* Member Info */}
              <div className="relative z-10 space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-playfair font-bold text-royal-navy mb-2 group-hover:text-deep-teal transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <p className="text-deep-teal font-montserrat font-semibold mb-2">
                    {member.role}
                  </p>
                  
                  <p className="text-sm text-slate-gray font-montserrat mb-4">
                    {member.department} • {member.experience}
                  </p>
                </div>

                {/* Specializations */}
                <div className="space-y-3">
                  <h4 className="text-sm font-montserrat font-semibold text-royal-navy">Specializations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialization.slice(0, 3).map((spec, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-deep-teal/10 text-deep-teal text-xs font-montserrat rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-gray font-montserrat">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="w-4 h-4 text-deep-teal" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-deep-teal" />
                    <span>Since {member.joinDate}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-2">
                  <h4 className="text-sm font-montserrat font-semibold text-royal-navy">Languages:</h4>
                  <p className="text-sm text-slate-gray font-montserrat">
                    {member.languages.join(', ')}
                  </p>
                </div>

                {/* Contact Buttons */}
                <div className="flex space-x-3 justify-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-12 h-12 bg-deep-teal text-white rounded-full hover:bg-royal-navy transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                    title={`Call ${member.name}`}
                  >
                    <PhoneIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-12 h-12 bg-warm-sand text-royal-navy rounded-full hover:bg-gold-leaf hover:text-white transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                    title={`Email ${member.name}`}
                  >
                    <EnvelopeIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                  </motion.button>
                </div>
              </div>

              {/* Hover Details Overlay */}
              <div className="absolute inset-0 bg-white/98 backdrop-blur-sm p-6 rounded-3xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 overflow-y-auto">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-playfair font-bold text-royal-navy mb-2">
                      {member.name}
                    </h3>
                    <p className="text-deep-teal font-montserrat font-semibold">
                      {member.role}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-montserrat font-semibold text-royal-navy mb-2">Education:</h4>
                      <p className="text-sm text-slate-gray font-montserrat">{member.education}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-montserrat font-semibold text-royal-navy mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {member.achievements.slice(0, 3).map((achievement, idx) => (
                          <li key={idx} className="text-xs text-slate-gray font-montserrat flex items-start space-x-2">
                            <TrophyIcon className="w-3 h-3 text-gold-leaf mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-silver-mist/30">
                      <div className="flex items-center justify-center space-x-4 text-xs text-slate-gray font-montserrat">
                        <div className="flex items-center space-x-1">
                          <PhoneIcon className="w-3 h-3" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <EnvelopeIcon className="w-3 h-3" />
                          <span>{member.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-deep-teal via-royal-navy to-deep-teal text-white font-montserrat font-semibold rounded-full hover:shadow-2xl transition-all duration-300 group bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            <UserGroupIcon className="w-5 h-5 mr-3" />
            Join Our Team
            <motion.div
              className="ml-3"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
          
          <p className="text-sm text-slate-gray font-montserrat mt-4 max-w-md mx-auto">
            We're always looking for talented professionals to join our growing team
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurTeam;
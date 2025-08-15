'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CurrencyDollarIcon,
  CalculatorIcon,
  HomeIcon,
  ChartBarIcon,
  ClockIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CalculatorInputs {
  propertyPrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  pmi: number;
}

interface CalculatorResults {
  monthlyPayment: number;
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  monthlyPMI: number;
  totalMonthly: number;
  totalInterest: number;
  totalCost: number;
  loanAmount: number;
}

const PropertyCalculator = () => {
  const [calculatorType, setCalculatorType] = useState<'mortgage' | 'rent' | 'investment'>('mortgage');
  const [inputs, setInputs] = useState<CalculatorInputs>({
    propertyPrice: 500000,
    downPayment: 20,
    interestRate: 6.5,
    loanTerm: 30,
    propertyTax: 1.2,
    insurance: 0.5,
    hoa: 0,
    pmi: 0.5
  });
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Calculator entrance animation
      gsap.fromTo(calculatorRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: calculatorRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Input fields animation
      gsap.fromTo('.calculator-input',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.calculator-inputs',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Results animation
      gsap.fromTo('.calculator-result',
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.calculator-results',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate mortgage payments
  useEffect(() => {
    const calculateMortgage = () => {
      setIsCalculating(true);
      
      setTimeout(() => {
        const loanAmount = inputs.propertyPrice * (1 - inputs.downPayment / 100);
        const monthlyRate = inputs.interestRate / 100 / 12;
        const numPayments = inputs.loanTerm * 12;
        
        // Monthly principal and interest
        const principalAndInterest = loanAmount * 
          (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
          (Math.pow(1 + monthlyRate, numPayments) - 1);
        
        // Monthly property tax
        const monthlyTax = (inputs.propertyPrice * inputs.propertyTax / 100) / 12;
        
        // Monthly insurance
        const monthlyInsurance = (inputs.propertyPrice * inputs.insurance / 100) / 12;
        
        // Monthly HOA
        const monthlyHOA = inputs.hoa;
        
        // Monthly PMI (if down payment < 20%)
        const monthlyPMI = inputs.downPayment < 20 ? 
          (loanAmount * inputs.pmi / 100) / 12 : 0;
        
        // Total monthly payment
        const totalMonthly = principalAndInterest + monthlyTax + monthlyInsurance + monthlyHOA + monthlyPMI;
        
        // Total interest over life of loan
        const totalInterest = (principalAndInterest * numPayments) - loanAmount;
        
        // Total cost
        const totalCost = inputs.propertyPrice + totalInterest;
        
        setResults({
          monthlyPayment: principalAndInterest,
          principalAndInterest,
          monthlyTax,
          monthlyInsurance,
          monthlyHOA,
          monthlyPMI,
          totalMonthly,
          totalInterest,
          totalCost,
          loanAmount
        });
        
        setIsCalculating(false);
      }, 500);
    };

    calculateMortgage();
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-white via-alabaster to-silver-mist/30 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-deep-teal/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold-leaf/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-deep-teal/10 text-deep-teal font-montserrat font-semibold text-sm rounded-full mb-6">
            Financial Tools
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-royal-navy mb-6 leading-tight">
            Property{' '}
            <span className="text-deep-teal relative">
              Calculator
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Calculate mortgage payments, rental yields, and investment returns with our comprehensive financial tools.
          </p>
        </motion.div>

        {/* Calculator Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-2xl p-2 shadow-elegant border border-silver-mist">
            {(['mortgage', 'rent', 'investment'] as const).map((type) => (
              <motion.button
                key={type}
                onClick={() => setCalculatorType(type)}
                className={`relative px-6 py-3 rounded-xl font-montserrat font-semibold text-sm transition-all duration-300 ${
                  calculatorType === type
                    ? 'text-white'
                    : 'text-slate-gray hover:text-deep-teal'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {calculatorType === type && (
                  <motion.div
                    layoutId="activeCalculatorType"
                    className="absolute inset-0 bg-gradient-to-r from-deep-teal to-royal-navy rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 capitalize">{type} Calculator</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Calculator */}
        <div ref={calculatorRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="calculator-inputs bg-white rounded-3xl p-8 shadow-elegant border border-silver-mist/50"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-deep-teal to-royal-navy rounded-xl flex items-center justify-center">
                <CalculatorIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-charcoal">
                Loan Details
              </h3>
            </div>

            <div className="space-y-6">
              {/* Property Price */}
              <motion.div variants={itemVariants} className="calculator-input">
                <label className="block font-montserrat font-semibold text-charcoal mb-3">
                  <HomeIcon className="w-5 h-5 inline mr-2 text-deep-teal" />
                  Property Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-gray font-montserrat">$</span>
                  <input
                    type="number"
                    value={inputs.propertyPrice}
                    onChange={(e) => handleInputChange('propertyPrice', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-4 border border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat text-lg transition-all duration-200"
                    placeholder="500,000"
                  />
                </div>
              </motion.div>

              {/* Down Payment */}
              <motion.div variants={itemVariants} className="calculator-input">
                <label className="block font-montserrat font-semibold text-charcoal mb-3">
                  <BanknotesIcon className="w-5 h-5 inline mr-2 text-deep-teal" />
                  Down Payment
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      value={inputs.downPayment}
                      onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                      className="w-full px-4 py-4 border border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat text-lg transition-all duration-200"
                      placeholder="20"
                      min="0"
                      max="100"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-gray font-montserrat">%</span>
                  </div>
                  <div className="bg-warm-sand/10 rounded-xl px-4 py-4 flex items-center">
                    <span className="font-montserrat font-semibold text-deep-teal">
                      {formatCurrency(inputs.propertyPrice * inputs.downPayment / 100)}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Interest Rate */}
              <motion.div variants={itemVariants} className="calculator-input">
                <label className="block font-montserrat font-semibold text-charcoal mb-3">
                  <ChartBarIcon className="w-5 h-5 inline mr-2 text-deep-teal" />
                  Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.interestRate}
                    onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                    className="w-full px-4 py-4 border border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat text-lg transition-all duration-200"
                    placeholder="6.5"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-gray font-montserrat">%</span>
                </div>
              </motion.div>

              {/* Loan Term */}
              <motion.div variants={itemVariants} className="calculator-input">
                <label className="block font-montserrat font-semibold text-charcoal mb-3">
                  <ClockIcon className="w-5 h-5 inline mr-2 text-deep-teal" />
                  Loan Term
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 20, 30].map((term) => (
                    <motion.button
                      key={term}
                      onClick={() => handleInputChange('loanTerm', term)}
                      className={`py-3 px-4 rounded-xl font-montserrat font-semibold transition-all duration-200 ${
                        inputs.loanTerm === term
                          ? 'bg-deep-teal text-white'
                          : 'bg-silver-mist text-slate-gray hover:bg-warm-sand/30'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {term} years
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Additional Costs */}
              <motion.div variants={itemVariants} className="calculator-input">
                <h4 className="font-montserrat font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <InformationCircleIcon className="w-5 h-5 text-deep-teal" />
                  Additional Costs (Annual %)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-montserrat text-slate-gray mb-2">Property Tax</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.propertyTax}
                        onChange={(e) => handleInputChange('propertyTax', Number(e.target.value))}
                        className="w-full px-3 py-3 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat"
                        placeholder="1.2"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-gray text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat text-slate-gray mb-2">Insurance</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.insurance}
                        onChange={(e) => handleInputChange('insurance', Number(e.target.value))}
                        className="w-full px-3 py-3 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat"
                        placeholder="0.5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-gray text-sm">%</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-montserrat text-slate-gray mb-2">HOA (Monthly)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-gray text-sm">$</span>
                      <input
                        type="number"
                        value={inputs.hoa}
                        onChange={(e) => handleInputChange('hoa', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-3 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat text-slate-gray mb-2">PMI (Annual %)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.pmi}
                        onChange={(e) => handleInputChange('pmi', Number(e.target.value))}
                        className="w-full px-3 py-3 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat"
                        placeholder="0.5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-gray text-sm">%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="calculator-results"
          >
            <div className="bg-gradient-to-br from-deep-teal to-royal-navy rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-playfair text-2xl font-bold">
                  Payment Breakdown
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {isCalculating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center py-12"
                  >
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
                  </motion.div>
                ) : results ? (
                  <motion.div
                    key="results"
                    variants={resultVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {/* Main Monthly Payment */}
                    <div className="calculator-result bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-center">
                        <div className="font-montserrat text-sm text-warm-sand/90 mb-2">Total Monthly Payment</div>
                        <div className="font-playfair text-4xl md:text-5xl font-bold text-white">
                          {formatCurrency(results.totalMonthly)}
                        </div>
                      </div>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="calculator-result space-y-4">
                      <h4 className="font-montserrat font-semibold text-warm-sand mb-4">Monthly Breakdown</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-white/20">
                          <span className="font-montserrat text-white/90">Principal & Interest</span>
                          <span className="font-montserrat font-semibold text-white">
                            {formatCurrency(results.principalAndInterest)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-white/20">
                          <span className="font-montserrat text-white/90">Property Tax</span>
                          <span className="font-montserrat font-semibold text-white">
                            {formatCurrency(results.monthlyTax)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-white/20">
                          <span className="font-montserrat text-white/90">Insurance</span>
                          <span className="font-montserrat font-semibold text-white">
                            {formatCurrency(results.monthlyInsurance)}
                          </span>
                        </div>
                        
                        {results.monthlyHOA > 0 && (
                          <div className="flex justify-between items-center py-2 border-b border-white/20">
                            <span className="font-montserrat text-white/90">HOA</span>
                            <span className="font-montserrat font-semibold text-white">
                              {formatCurrency(results.monthlyHOA)}
                            </span>
                          </div>
                        )}
                        
                        {results.monthlyPMI > 0 && (
                          <div className="flex justify-between items-center py-2 border-b border-white/20">
                            <span className="font-montserrat text-white/90">PMI</span>
                            <span className="font-montserrat font-semibold text-white">
                              {formatCurrency(results.monthlyPMI)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Loan Summary */}
                    <div className="calculator-result bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <h4 className="font-montserrat font-semibold text-warm-sand mb-4">Loan Summary</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="font-playfair text-2xl font-bold text-white">
                            {formatCurrency(results.loanAmount)}
                          </div>
                          <div className="font-montserrat text-sm text-warm-sand/90">Loan Amount</div>
                        </div>
                        <div className="text-center">
                          <div className="font-playfair text-2xl font-bold text-white">
                            {formatCurrency(results.totalInterest)}
                          </div>
                          <div className="font-montserrat text-sm text-warm-sand/90">Total Interest</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-white rounded-2xl p-6 shadow-elegant border border-silver-mist/50"
            >
              <h4 className="font-montserrat font-semibold text-charcoal mb-4 flex items-center gap-2">
                <InformationCircleIcon className="w-5 h-5 text-deep-teal" />
                Important Notes
              </h4>
              <ul className="space-y-2 text-sm font-montserrat text-slate-gray">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-deep-teal rounded-full mt-2 flex-shrink-0" />
                  <span>Calculations are estimates and may vary based on actual loan terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-deep-teal rounded-full mt-2 flex-shrink-0" />
                  <span>PMI is typically required for down payments less than 20%</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-deep-teal rounded-full mt-2 flex-shrink-0" />
                  <span>Property taxes and insurance rates vary by location</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-deep-teal rounded-full mt-2 flex-shrink-0" />
                  <span>Consult with a mortgage professional for personalized advice</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PropertyCalculator;
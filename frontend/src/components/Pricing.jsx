"use client"

import React from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "₹80,000",
    period: "event",
    description: "Perfect for small events and beginners",
    features: ["Up to 100 participants", "Basic analytics", "Email support", "Standard features"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹150,000",
    period: "event",
    description: "Ideal for medium-sized events and growing businesses",
    features: ["Up to 500 participants", "Advanced analytics", "Priority support", "Custom branding"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹250,000",
    period: "event",
    description: "For large-scale events and organizations",
    features: ["Unlimited participants", "Custom analytics", "24/7 dedicated support", "Custom integration"],
    cta: "Get Started",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="bg-gradient-to-b bg-black py-20" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Pricing Plans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Choose the perfect plan for your event, whether it's just you or your entire team.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-[#151515] rounded-lg p-8 shadow-lg ${plan.popular ? "ring-2 ring-indigo-500" : ""}`}
            >
              {plan.popular && (
                <span className="bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full uppercase mb-4 inline-block">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold text-white mb-2">
                {plan.price}
                <span className="text-xl font-normal text-gray-400">/{plan.period}</span>
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-3 text-gray-300">
                    <Check className="w-5 h-5 mr-2 text-indigo-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center ${
                  plan.popular
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {plan.cta}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

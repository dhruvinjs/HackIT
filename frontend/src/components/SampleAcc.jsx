'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
    {
      id:1,
      question:'How do I create a new hackathon event?',
      answer:'Go to your organizer dashboard, click "Create Hackathon," and fill in event details like name, date, rules, and registration info. Once done, publish it and manage participants from your dashboard.'
  },
  {
      id:2,
      question:'What payment methods do you accept?',
      answer:'We accept Credit/Debit Cards, UPI, Net Banking, PayPal, and digital wallets like Google Pay and PhonePe. For international payments, PayPal is available.'
  },
  {
      id:3,
      question:'Can I customize the judging criteria?',
      answer:'Yes! Organizers can set custom judging criteria, including parameters like innovation, feasibility, and technical implementation. You can define weights for each criterion in the event settings.'
  },
  {
      id:4,
      question:'Is there a limit to the number of participants?',
      answer:'It depends on the organizer! Organizers can set a participant limit, but if no limit is specified, anyone can join.'
  },
  {
      id:5,
      question:'How can participants communicate with organizers?',
      answer:'Participants can contact organizers through the event dashboard via chat, email, or discussion forums. Organizers may also set up a Discord or Slack channel for communication.'
  },
  {
      id:6,
      question:'Can I edit hackathon details after publishing?',
      answer:'Yes, organizers can update event details like description, rules, or deadlines from the dashboard. However, major changes might require notifying registered participants.'
  },
  {
      id:7,
      question:'Do you provide technical support during the event?',
      answer:'We provide 24/7 support to solve any of your queries.'
  },
];
// const QA=[
//   {
//       id:1,
//       question:'How do I create a new hackathon event?',
//       answer:'Go to your organizer dashboard, click "Create Hackathon," and fill in event details like name, date, rules, and registration info. Once done, publish it and manage participants from your dashboard.'
//   },
//   {
//       id:2,
//       question:'What payment methods do you accept?',
//       answer:'We accept Credit/Debit Cards, UPI, Net Banking, PayPal, and digital wallets like Google Pay and PhonePe. For international payments, PayPal is available.'
//   },
//   {
//       id:3,
//       question:'Can I customize the judging criteria?',
//       answer:'Yes! Organizers can set custom judging criteria, including parameters like innovation, feasibility, and technical implementation. You can define weights for each criterion in the event settings.'
//   },
//   {
//       id:4,
//       question:'Is there a limit to the number of participants?',
//       answer:'It depends on the organizer! Organizers can set a participant limit, but if no limit is specified, anyone can join.'
//   },
//   {
//       id:5,
//       question:'How can participants communicate with organizers?',
//       answer:'Participants can contact organizers through the event dashboard via chat, email, or discussion forums. Organizers may also set up a Discord or Slack channel for communication.'
//   },
//   {
//       id:6,
//       question:'Can I edit hackathon details after publishing?',
//       answer:'Yes, organizers can update event details like description, rules, or deadlines from the dashboard. However, major changes might require notifying registered participants.'
//   },
//   {
//       id:7,
//       question:'Do you provide technical support during the event?',
//       answer:'We provide 24/7 support to solve any of your queries.'
//   },
// ];
const SampleAcc = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section className="py-12 bg-[#151515]  text-white sm:py-12 lg:py-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-600">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="py-6">
                <motion.button
                  className="w-full flex justify-between items-center text-left font-semibold text-white focus:outline-none px-4 py-2 rounded-lg hover:bg-black transition-colors"
                  onClick={() => toggleAccordion(index)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="flex-1">{faq.question}</span>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus className="w-6 h-6 text-gray-300" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 px-4 text-gray-300"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SampleAcc;

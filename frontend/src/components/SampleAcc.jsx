'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
const tabs = [
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
function SampleAcc() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(tabs[0]);
  const handleClick = async (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    const newActiveItem = tabs.find((_, i) => i === index);
    setActiveItem(newActiveItem);
  };
  return (
    <>
       <div className="grid grid-cols-1 md:grid-cols-5 w-full ">
        <div
          className="col-span-2 p-12 bg-neutral-50 dark:bg-neutral-900 z-10"
          // style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 18px" }}
        >
          <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
        <div className="h-fit border  rounded-lg p-2 dark:bg-[#111111] bg-[#F2F2F2]">
          {tabs.map((tab, index) => (
            <motion.div
              key={index}
              className={`overflow-hidden ${
                index !== tabs.length - 1 ? 'border-b' : ''
              }`}
              onClick={() => handleClick(index)}>
              <button
                className={`p-3 px-2 w-full cursor-pointer sm:text-base text-xs items-center transition-all font-semibold dark:text-white text-black   flex gap-2 
               `}>
                <Plus
                  className={`${
                    activeIndex === index ? 'rotate-45' : 'rotate-0 '
                  } transition-transform ease-in-out w-5 h-5  dark:text-gray-200 text-gray-600`}
                />
                {tab.question}
              </button>
              <AnimatePresence mode="sync">
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                      delay: 0.14,
                    }}>
                    <p
                      className={`dark:text-white text-black p-3 xl:text-base sm:text-sm text-xs pt-0 w-[90%]`}>
                      {tab.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
export default SampleAcc;

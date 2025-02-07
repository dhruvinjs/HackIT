import React from 'react'
import { useState } from 'react';
import { QACompo } from "./";
function FAQ() {
    const [activeIndex, setActiveIndex ]=useState(null);
    const QA=[
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
    return (
        <div>
            <div className="min-h-[80vh] md:min-h-screen w-full px-4 flex items-center justify-center sm:px-6 lg:px-40 mx-auto bg-black py-14 ">
                <div className="grid md:grid-cols-6 gap-10">
                    <div className="md:col-span-2">
                        <div className="max-w-xs">
                            <h2 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-white">Frequently<br />asked questions</h2>
                            <p className="mt-1 hidden md:block text-gray-600 dark:text-neutral-400">Answers to the most frequently asked questions.</p>
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-700 my-2">
                            {QA && (QA.map((qacompo)=>(
                                <QACompo key={qacompo.id} activeIndex={activeIndex} setActiveIndex={setActiveIndex} qacompo={qacompo}/>
                            )))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ;

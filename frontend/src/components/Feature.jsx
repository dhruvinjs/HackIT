import React from "react";
import { Calendar, Users, FolderCheck, ChartNoAxesCombined, MessageCircleCode } from "lucide-react";
function Feature() {
  return (
    <div>
      <section className="py-12 bg-[#0A2540] text-white sm:py-12 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center xl:max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl xl:text-5xl mb-6">
              Powerful Features for Hackathon Management
            </h2>
            <p className="mb-4">
              Everything you need to organize and manage successful hackathons
              from start to finish
            </p>
          </div>
          <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
            <div className="relative">
              <div className="relative overflow-hidden bg-gray-800 shadow-md rounded-xl h-full">
                <div className="p-9">
                <Calendar color="#006eff" size={36} />
                  <h3 className="mt-6 text-2xl font-bold text-white sm:mt-10">
                    Event Creation
                  </h3>
                  <p className="mt-6 text-base text-white">
                    Create and customize hackathon events with flexible
                    scheduling, registration, and theme options
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-gray-800 shadow-md rounded-xl">
              <div className="p-9">
              <Users size={32} color="#00aaff" />
                <h3 className="mt-6 text-2xl font-bold text-white sm:mt-10">
                  Team Management
                </h3>
                <p className="mt-6 text-base text-white">
                  Efficiently manage participant registrations, team formations,
                  and collaboration tools
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden bg-gray-800 shadow-md rounded-xl h-full">
                <div className="p-9">
                <FolderCheck size={36} color="#00aaff"/>
                  <h3 className="mt-6 text-2xl font-bold text-white sm:mt-10">
                    Project Submissions
                  </h3>
                  <p className="mt-6 text-base text-white">
                    Streamlined submission process with support for multiple
                    file formats and project descriptions
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-gray-800 shadow-md rounded-xl">
              <div className="p-9">
              <ChartNoAxesCombined size={36} color="#00aaff"/>
                <h3 className="mt-6 text-2xl font-bold text-white sm:mt-10">
                  Analytics Dashboard
                </h3>
                <p className="mt-6 text-base text-white">
                  Real-time analytics and insights about participation,
                  engagement, and event progress
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden bg-gray-800 shadow-md rounded-xl h-full">
                <div className="p-9">
                <MessageCircleCode size={36} color="#00aaff"/>
                  <h3 className="mt-6 text-2xl font-bold text-white sm:mt-10">
                    Live Communication
                  </h3>
                  <p className="mt-6 text-base text-white">
                    Built-in messaging and announcement system for real-time
                    updates and collaboration
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-gray-800 shadow-md rounded-xl">
              <div className="p-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#3CC3EC"
                >
                  <path d="M160-120v-66.67h480V-120H160Zm223.33-206L160-549.33 234.67-626 460-402.67 383.33-326Zm254-254L414-805.33 490.67-880 714-656.67 637.33-580Zm196 420L302-691.33 348.67-738 880-206.67 833.33-160Z" />
                </svg>
                <h3 className="mt-6 text-2xl font-bold text-white sm:mt-10">
                  Judging System
                </h3>
                <p className="mt-6 text-base text-white">
                  Comprehensive judging platform with customizable criteria and
                  scoring systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feature;
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHostStore } from '../store/useHostStore';

const TimelineEvent = ({ date, title, description, time }) => (
    <div className="mb-6 border-l-2 border-blue-500 pl-4">
        <div className="flex items-center">
            <div className="bg-blue-500 w-3 h-3 rounded-full -ml-[22px]" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold ml-4">{date}</span>
        </div>
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {time}
        </div>
    </div>
);

const StatCard = ({ title, value, icon }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white text-white dark:bg-black p-4 rounded-lg shadow-md"
    >
        <div className="flex items-center gap-3">
            <span className="text-blue-500 text-xl">{icon}</span>
            <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
                <div className="text-lg font-semibold">{value}</div>
            </div>
        </div>
    </motion.div>
);

export function HackathonDetails({ value }) {

    const navigate = useNavigate()
    const { getParticipants, hackathons,particpantsCount } = useHostStore()

    const handleApply = () => {
        navigate("/register")
    }

    useEffect(() => {
        const fetchPaticipants = async () => {
            await getParticipants()
        }
        fetchPaticipants()
    }, [getParticipants])

    return (
        <div className="max-w-6xl  mx-auto p-6">
            {/* Header Section */}
            <div className="bg-white text-white dark:bg-[#151515] rounded-xl p-8 shadow-lg mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <img
                            src="https://placehold.co/150x150"
                            alt="CSI Evolve Logo"
                            className="w-32 h-32 rounded-lg object-cover"
                        />
                    </div>

                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold mb-2">{hackathons && hackathons[0].title || value.title}</h1>
                        <div className="flex flex-wrap gap-4 mb-4">
                            <span className="flex items-center text-gray-600 dark:text-gray-400">
                                <span className="mr-2">📍</span>
                                {hackathons && hackathons[0].location || value.location}
                            </span>
                            <span className="flex items-center text-gray-600 dark:text-gray-400">
                                <span className="mr-2">🏢</span>
                                CSI Evolve
                            </span>
                            <span className="flex items-center text-gray-600 dark:text-gray-400">
                                <span className="mr-2">🌐</span>
                                {hackathons && hackathons[0].eventType || value.eventType}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard title="Total Prize" value={hackathons && hackathons[0].totalPrizePool || value.totalPrizePool} icon="🏆" />
                            <StatCard title="Registered" value={particpantsCount || 0} icon="👥" />
                            <StatCard
                                title="Registration Deadline"
                                value={
                                    hackathons && hackathons[0]
                                        ? Math.floor((new Date(hackathons[0].registrationEndDate.split("T")[0]) - new Date()) / (24 * 60 * 60 * 1000)) + " days left"
                                        : value.registrationEndDate
                                            ? `${Math.floor((new Date(value.registrationEndDate.split("T")[0]) - new Date()) / (24 * 60 * 60 * 1000))} days left`
                                            : "No date available"
                                }
                                icon="⏰"
                            />

                            {/* <StatCard title="Impressions" value="14,487" icon="👁️" /> */}
                        </div>
                    </div>

                </div>
                <div className='flex justify-end mt-4'>
                    <button className='bg-blue-500 px-6 py-2 rounded-md font-semibold' onClick={() => handleApply()}>Apply</button>
                </div>

            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white text-white dark:bg-[#151515] rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Team & Eligibility</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="text-blue-500">👥</span>
                            <div>
                                <div className="font-medium">Team Size</div>
                                <div className="text-gray-600 dark:text-gray-400">{hackathons && hackathons[0].minTeamSize || hackathons && hackathons[0].minTeamSize || value.maxTeamSize} - {value.maxTeamSize} Members</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-blue-500">✅</span>
                            <div>
                                <div className="font-medium">Eligibility</div>
                                <div className="text-gray-600 dark:text-gray-400">Everyone can apply</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white text-white dark:bg-[#151515]  rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Important Dates</h2>
                    <div className="text-gray-600 dark:text-gray-400">
                        <div className="mb-2">
                            <div className="font-medium">Registration Deadline</div>
                            <div>{hackathons && hackathons[0].registrationEndDate.split("T")[0] || value.registrationEndDate && value.registrationEndDate.split("T")[0]}</div>
                        </div>
                        <div>
                            <div className="font-medium">Starting From</div>
                            <div>{hackathons && hackathons[0].registrationStartDate.split("T")[0] || value.registrationStartDate && value.registrationStartDate.split("T")[0]}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            {/* <div className="bg-white text-white dark:bg-[#151515]  rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-6">Stages and Timelines</h2>
                <div className="ml-4">
                    <TimelineEvent
                        date="21 Feb 25"
                        title="Project Submission (Online)"
                        description="Participants will submit their SaaS projects, including - A brief write-up explaining the problem statement, solution, and key features. A GitHub repository or working demo link. A short video walkthrough (optional but recommended)."
                        time="Start: 21 Feb 25, 09:00 AM IST | End: 21 Feb 25, 11:00 PM IST"
                    />
                    <TimelineEvent
                        date="22 Feb 25"
                        title="Offline Pitch & Jury Evaluation"
                        description="Finalists will get the exclusive opportunity to pitch their projects to an industry jury comprising experienced professionals, founders, and SaaS experts. This round is designed not just for evaluation but also for mentorship and real-world insights on scaling and refining their products."
                        time="Start: 22 Feb 25, 09:00 AM IST | End: 22 Feb 25, 02:00 PM IST"
                    />
                </div>
            </div> */}

            {/* About Section */}
            <div className="bg-white text-white dark:bg-[#151515]  rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">About the Hackathon</h2>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="mb-4">
                        {hackathons && hackathons[0].opportunityDetails || value.opportunityDetails}
                    </p>
                    <h3 className="text-lg font-semibold mt-6 mb-3">Why join?</h3>
                    <p className=" pl-6 ">
                        {hackathons && hackathons[0].rules || value.rules}
                    </p>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white text-white dark:bg-[#151515]  rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Contact the Organisers</h2>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="text-blue-500">🏢</span>
                        <div>
                            <div className="font-medium">{hackathons && hackathons[0].orgname || value.orgname}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-blue-500">📧</span>
                        <a href="mailto:schoolofcet.csi@mitwpu.edu.in" className="text-blue-500 hover:underline">
                            {hackathons && hackathons[0].orgemail || value.orgemail}
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-blue-500">📱</span>
                        <a href="tel:+918956085495" className="text-blue-500 hover:underline">
                            {hackathons && hackathons[0].orgno || value.orgno}
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default HackathonDetails;
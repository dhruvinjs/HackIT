import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

export function HackathonDetails() {

    const navigate = useNavigate()

    const handleUpdate = () => {
        navigate("/register")
    }

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
                        <h1 className="text-3xl font-bold mb-2">Evolve - SaaS Hackathon</h1>
                        <div className="flex flex-wrap gap-4 mb-4">
                            <span className="flex items-center text-gray-600 dark:text-gray-400">
                                <span className="mr-2">📍</span>
                                MIT World Peace University, Pune, Maharashtra
                            </span>
                            <span className="flex items-center text-gray-600 dark:text-gray-400">
                                <span className="mr-2">🏢</span>
                                CSI Evolve
                            </span>
                            <span className="flex items-center text-gray-600 dark:text-gray-400">
                                <span className="mr-2">🌐</span>
                                Online
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard title="Total Prize" value="₹25,000" icon="🏆" />
                            <StatCard title="Registered" value="36" icon="👥" />
                            <StatCard title="Registration Deadline" value="6 days left" icon="⏰" />
                            <StatCard title="Impressions" value="14,487" icon="👁️" />
                        </div>
                    </div>

                </div>
                <div className='flex justify-end mt-4'>
                    <button className='bg-blue-500 px-6 py-2 rounded-md font-semibold' onClick={handleUpdate}>Apply</button>
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
                                <div className="text-gray-600 dark:text-gray-400">1 - 5 Members</div>
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
                            <div>18 Feb 25, 12:00 AM IST</div>
                        </div>
                        <div>
                            <div className="font-medium">Last Updated</div>
                            <div>Feb 10, 2025</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-white text-white dark:bg-[#151515]  rounded-xl p-6 shadow-lg mb-8">
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
            </div>

            {/* About Section */}
            <div className="bg-white text-white dark:bg-[#151515]  rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">About the Hackathon</h2>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="mb-4">
                        SaaS Hackathon - Build What Matters! Are you ready to go beyond just coding and build something that truly makes an impact? Whether you're a beginner looking to explore SaaS development or a seasoned dev ready to ship high-value products, this hackathon is for you!
                    </p>
                    <h3 className="text-lg font-semibold mt-6 mb-3">Why join?</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Get a chance to win exciting cash prizes</li>
                        <li>Domain sponsorships to kickstart your SaaS journey</li>
                        <li>Win Cloud credits to scale your project</li>
                        <li>Exclusive goodies for top teams</li>
                        <li>Industry mentorship to refine your idea</li>
                    </ul>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white text-white dark:bg-[#151515]  rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Contact the Organisers</h2>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="text-blue-500">🏢</span>
                        <div>
                            <div className="font-medium">Computer Society of India MIT-WPU</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-blue-500">📧</span>
                        <a href="mailto:schoolofcet.csi@mitwpu.edu.in" className="text-blue-500 hover:underline">
                            schoolofcet.csi@mitwpu.edu.in
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-blue-500">📱</span>
                        <a href="tel:+918956085495" className="text-blue-500 hover:underline">
                            +91 8956085495
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default HackathonDetails;
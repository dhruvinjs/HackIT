import { motion } from 'framer-motion';
import { Nav, ParticipationCard } from '../components'
import { Dice1 } from 'lucide-react';

const mockHackathons = [
  {
    id: '1',
    name: 'AI Innovation Challenge',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    status: 'active',
    teamName: 'Neural Ninjas',
    teamSize: 4,
    description: 'Build innovative AI solutions for real-world problems.',
    meetingLink: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: '2',
    name: 'Blockchain Buildathon',
    startDate: '2024-04-01',
    endDate: '2024-04-03',
    status: 'upcoming',
    teamSize: 3,
    description: 'Create decentralized applications using blockchain technology.'
  },
  {
    id: '3',
    name: 'Green Tech Challenge',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    status: 'completed',
    teamName: 'EcoCoders',
    teamSize: 5,
    description: 'Developing sustainable technology solutions for environmental challenges.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function ParticipationHistory() {
  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Hackathon Dashboard
            </h1>
            <p className="mt-4 text-xl text-gray-400">
              Track your hackathon journey and upcoming events
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {mockHackathons.map((hackathon) => (
              <ParticipationCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>

  );
}

export default ParticipationHistory
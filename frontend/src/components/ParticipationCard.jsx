import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MessageCircle, Video, Info, Users } from 'lucide-react';

const statusColors = {
  active: 'bg-green-500',
  upcoming: 'bg-blue-500',
  completed: 'bg-gray-500'
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

function ParticipationCard({ hackathon }) {
  return (
    <motion.div
      variants={item}
      className="bg-[#151515] rounded-lg p-6 flex items-center gap-6 relative overflow-hidden"
    >
      {/* Status indicator */}
      <div className="absolute top-0 left-0 w-full h-1">
        <div className={`h-full w-full ${statusColors[hackathon.status]}`} />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-xl font-semibold text-white">{hackathon.name}</h3>
          <span className="px-3 py-1 rounded-full text-sm capitalize bg-opacity-20 text-white">
            {hackathon.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{hackathon.teamName || 'No team yet'} ({hackathon.teamSize} members)</span>
          </div>
          <div>
            {format(new Date(hackathon.startDate), 'MMM d')} - {format(new Date(hackathon.endDate), 'MMM d, yyyy')}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {hackathon.meetingLink && (
          <button className="p-2 rounded-lg bg-[#252525] hover:bg-[#303030] transition-colors text-white">
            <Video size={20} />
          </button>
        )}
        <button className="p-2 rounded-lg bg-[#252525] hover:bg-[#303030] transition-colors text-white">
          <MessageCircle size={20} />
        </button>
        <button className="p-2 rounded-lg bg-[#252525] hover:bg-[#303030] transition-colors text-white">
          <Info size={20} />
        </button>
      </div>
    </motion.div>
  );
}

export default ParticipationCard
import { motion, AnimatePresence, stagger } from "framer-motion";
import Nav from "../components/Nav";

function Leaderboard() {
  // Sample data - replace with real data
  const topThree = [
    { rank: 1, name: "Champion", hackathons: 15, wins: 12, badge: "🥇" },
    { rank: 2, name: "Runner Up", hackathons: 14, wins: 10, badge: "🥈" },
    { rank: 3, name: "Third Place", hackathons: 12, wins: 8, badge: "🥉" },
  ];

  const participants = Array.from({ length: 10 }, (_, i) => ({
    rank: i + 4,
    name: `Participant ${i + 1}`,
    hackathons: 10 - i,
    wins: 8 - i,
    points: 1000 - i * 50,
  }));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hover: { y: -5, scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-black p-4 sm:p-6"
      >
        {/* Profile Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mx-auto mb-8 max-w-6xl rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-16 w-16 rounded-full border-4 border-white bg-gray-200"
              ></motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">Your Profile</h2>
                <p className="text-gray-200">Rank: #15</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white">Total Hackathons: 5</p>
              <p className="text-white">Total Wins: 2</p>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Container */}
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0"
          >
            <div className="space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-[#151515] px-4 py-2 text-white transition hover:bg-[#4d4d4d]"
              >
                Rank Wise
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-[#151515] px-4 py-2 text-white transition hover:bg-[#4d4d4d]"
              >
                Count Wise
              </motion.button>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition hover:bg-purple-700 mx-1"
              >
                Show My Place
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700 mx-1"
              >
                Invite Friends
              </motion.button>
            </div>
          </motion.div>

          {/* Top Three Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center justify-center gap-4 md:flex-row"
          >
            {topThree.map((user, index) => (
              <motion.div
                key={user.rank}
                // variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                variants={cardVariants}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full max-w-sm rounded-xl bg-[#151515] p-6 shadow-lg transition hover:shadow-xl md:w-1/3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="h-12 w-12 rounded-full bg-gray-200"
                    ></motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {user.name}
                      </h3>
                      <p className="text-gray-400">Rank #{user.rank}</p>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-3xl"
                  >
                    {user.badge}
                  </motion.span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Hackathons</span>
                    <span>{user.hackathons}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Wins</span>
                    <span>{user.wins}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Full Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="overflow-x-auto rounded-lg shadow-xl"
          >
            <table className="w-full table-auto border-collapse bg-[#151515]">
              <thead className="bg-[#3c3c3c]">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-300">Rank</th>
                  <th className="px-6 py-4 text-left text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-gray-300">
                    Hackathons
                  </th>
                  <th className="px-6 py-4 text-left text-gray-300">Wins</th>
                  <th className="px-6 py-4 text-left text-gray-300">Points</th>
                  <th className="px-6 py-4 text-left text-gray-300">Badge</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {participants.map((participant, index) => (
                    <motion.tr
                      key={participant.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-gray-700 transition hover:bg-[#4d4d4d]"
                    >
                      <td className="px-6 py-4 text-gray-300">
                        #{participant.rank}
                      </td>
                      <td className="px-6 py-4 text-white">
                        {participant.name}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {participant.hackathons}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {participant.wins}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {participant.points}
                      </td>
                      <td className="px-6 py-4">
                        <motion.span
                          whileHover={{ scale: 1.2 }}
                          className="inline-block"
                        >
                          ⭐
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default Leaderboard;
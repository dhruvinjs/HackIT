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
  
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-black p-4 sm:p-6">
        {/* Profile Section */}
        <div className="mx-auto mb-8 max-w-6xl rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full border-4 border-white bg-gray-200"></div>
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
        </div>
  
        {/* Leaderboard Container */}
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Controls */}
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="space-x-2">
              <button className="rounded-lg bg-[#151515] px-4 py-2 text-white transition hover:bg-[#4d4d4d]">
                Rank Wise
              </button>
              <button className="rounded-lg bg-[#151515] px-4 py-2 text-white transition hover:bg-[#4d4d4d]">
                Count Wise
              </button>
            </div>
            <div>
            <button className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition hover:bg-purple-700 mx-1">
              Show My Place
            </button>
            <button className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700 mx-1">
              Invite Friends
            </button>
            </div>
          </div>
  
          {/* Top Three Cards */}
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            {topThree.map((user) => (
              <div
                key={user.rank}
                className="w-full max-w-sm rounded-xl bg-[#151515] p-6 shadow-lg transition hover:shadow-xl md:w-1/3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {user.name}
                      </h3>
                      <p className="text-gray-400">Rank #{user.rank}</p>
                    </div>
                  </div>
                  <span className="text-3xl">{user.badge}</span>
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
              </div>
            ))}
          </div>
  
          {/* Full Leaderboard Table */}
          <div className="overflow-x-auto rounded-lg shadow-xl">
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
                {participants.map((participant) => (
                  <tr
                    key={participant.rank}
                    className="border-t border-gray-700 transition hover:bg-[#4d4d4d]"
                  >
                    <td className="px-6 py-4 text-gray-300">#{participant.rank}</td>
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
                    <td className="px-6 py-4">⭐</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default Leaderboard;
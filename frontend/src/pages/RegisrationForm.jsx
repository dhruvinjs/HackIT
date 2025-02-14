import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Nav } from '../components';
import { Search, UserPlus, X, Send, Calendar, MapPin, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useHostStore } from '../store/useHostStore';

function RegisrationForm() {
  const [teamName, setTeamName] = useState('');
  // teamMembers now holds objects with { memberId, name, email, role }
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { selectedHackathon, getEventInfo } = useHostStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventInfo = async () => {
      await getEventInfo(id);
    };
    fetchEventInfo();
  }, [id, getEventInfo]);

  // Debounced API call when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers([]);
      setShowSuggestions(false);
      return;
    }
    const timer = setTimeout(() => {
      axios
        .post(
          "http://localhost:4000/api/user/getUsers",
          { name: searchQuery },
          { withCredentials: true }
        )
        .then((response) => {
          // Assuming response.data returns an array of user objects
          setFilteredUsers(response.data);
          setShowSuggestions(true);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setFilteredUsers([]);
          setShowSuggestions(false);
        });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // When a user is selected, add them to teamMembers array with proper keys.
  const selectUser = (user) => {
    // Prevent duplicates
    if (!teamMembers.some(member => member.memberId === user._id)) {
      setTeamMembers([...teamMembers, { memberId: user._id, name: user.name, email: user.email, role: "member" }]);
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const hackathonInfo = {
    name: "TechNova Hackathon 2025",
    date: "March 15-17, 2025",
    venue: "Innovation Hub, Silicon Valley",
    prizePool: "$50,000",
    registrationFee: "$99 per team",
    description:
      "Join us for a 48-hour coding marathon where innovative minds come together to build the future. This year's theme focuses on AI and Sustainability.",
    timeline: [
      "Registration Deadline: March 1, 2025",
      "Team Check-in: March 15, 9:00 AM",
      "Coding Begins: March 15, 10:00 AM",
      "Final Submissions: March 17, 10:00 AM",
    ],
  };

  const removeTeamMember = (memberId) => {
    setTeamMembers(teamMembers.filter(member => member.memberId !== memberId));
  };

  const sendInvite = (memberId) => {
    alert(`Invite sent to user with id: ${memberId}`);
  };

  // API call to register the team
  const handleSubmit = async () => {
    if (!agreed) {
      setError('Please agree to the terms and conditions');
      return;
    }
    if (teamMembers.length === 0) {
      setError('Please add at least one team member');
      return;
    }
    if (!teamName) {
      setError('Please enter a team name');
      return;
    }
    try {
      // Prepare payload: only include memberId and role
      const payloadMembers = teamMembers.map(member => ({
        memberId: member.memberId,
        role: member.role
      }));
      const response = await axios.post(
        `http://localhost:4000/api/user/register/${id}`,
        { name: teamName, members: payloadMembers },
        { withCredentials: true }
      );
      alert(response.data.message || 'Registration submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          {/* Hackathon Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#151515] rounded-lg shadow-xl p-8 mb-8"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-white mb-4 text-center"
            >
              {selectedHackathon?.title}
            </motion.h1>
            <p className="text-white text-center mb-8">{selectedHackathon?.guidelines}</p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-black p-2 rounded-md">
                <Calendar className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold text-white">Date</h3>
                  <p className="text-sm text-white">{selectedHackathon?.registrationStartDate}</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-black p-2 rounded-md">
                <MapPin className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold text-white">Venue</h3>
                  <p className="text-sm text-white">{selectedHackathon?.location}</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-black p-2 rounded-md">
                <Trophy className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold text-white">Prize Pool</h3>
                  <p className="text-sm text-white">{selectedHackathon?.totalPrizePool}</p>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-black p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2 text-white">Important Dates</h3>
              <ul className="text-sm space-y-1 text-white">
                {hackathonInfo.timeline.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[#151515] rounded-lg shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Team Registration</h2>
            {/* Team Name Input */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <label htmlFor="teamName" className="block text-sm font-medium text-white mb-2">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter team name"
              />
            </motion.div>

            {/* Add Team Member Form */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8 p-6 bg-black rounded-lg"
            >
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                  placeholder="Search team members..."
                />
                {showSuggestions && searchQuery && (
                  <div className="absolute w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-10">
                    {filteredUsers && filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <div
                          key={user._id}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => selectUser(user)}
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">
                              {user.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-white mb-4">Added Members</h2>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.memberId}
                    className="flex items-center justify-between p-4 text-white bg-[#151515] rounded-lg"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-white">{member.name}</h3>
                      <p className="text-sm text-white">{member.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => sendInvite(member.memberId)}
                        className="p-2 text-indigo-600 hover:text-indigo-800"
                        title="Send invite"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => removeTeamMember(member.memberId)}
                        className="p-2 text-red-600 hover:text-red-800"
                        title="Remove member"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-8"
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm text-white">
                  I agree to the terms and conditions and understand the registration fee is non-refundable
                </span>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}
            >
              Complete Registration
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisrationForm;

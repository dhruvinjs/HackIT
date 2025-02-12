import React, { useState } from 'react';
import { Nav } from '../components';
import { Search, UserPlus, X, Send, Calendar, MapPin, Trophy, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function RegisrationForm() {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreed, setAgreed] = useState(false);

  const hackathonInfo = {
    name: "TechNova Hackathon 2025",
    date: "March 15-17, 2025",
    venue: "Innovation Hub, Silicon Valley",
    prizePool: "$50,000",
    registrationFee: "$99 per team",
    description: "Join us for a 48-hour coding marathon where innovative minds come together to build the future. This year's theme focuses on AI and Sustainability.",
    timeline: [
      "Registration Deadline: March 1, 2025",
      "Team Check-in: March 15, 9:00 AM",
      "Coding Begins: March 15, 10:00 AM",
      "Final Submissions: March 17, 10:00 AM"
    ]
  };

  const addTeamMember = () => {

    if (teamMembers.length >= 5) {
      setError('Maximum 5 team members allowed');
      return;
    }

    if (!newMemberName || !newMemberEmail) {
      setError('Please fill in both name and email');
      return;
    }

    if (!newMemberEmail.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    const newMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: newMemberName,
      email: newMemberEmail,
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewMemberName('');
    setNewMemberEmail('');
    setError('');
  };

  const removeTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const sendInvite = (email) => {
    alert(`Invite link sent to ${email}`);
  };

  const handleSubmit = () => {
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
    alert('Registration submitted successfully!');
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8"
      >

        <div className="max-w-4xl  text-white mx-auto">

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#151515] text-white rounded-lg shadow-xl p-8 mb-8"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-white mb-4 text-center"
            >
              {hackathonInfo.name}
            </motion.h1>
            <p className="  text-white  text-center mb-8">{hackathonInfo.description}</p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-black text-white p-2 rounded-md">
                <Calendar className="h-6 w-6 text-indigo-600" />
                <div className=''>
                  <h3 className="font-semibold">Date</h3>
                  <p className="text-sm text-white">{hackathonInfo.date}</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-black text-white p-2 rounded-md">
                <MapPin className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold">Venue</h3>
                  <p className="text-sm text-white">{hackathonInfo.venue}</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3 bg-black text-white p-2 rounded-md">
                <Trophy className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold">Prize Pool</h3>
                  <p className="text-sm text-white">{hackathonInfo.prizePool}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white p-4 rounded-lg bg-black "
            >
              <h3 className="font-semibold mb-2">Important Dates</h3>
              <ul className="text-sm space-y-1">
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
            className="bg-[#151515] text-white  rounded-lg shadow-xl p-8"
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search team members..."
                />
              </div>

              <h2 className="text-xl font-semibold text-white mb-4">Add Team Member</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email"
                />
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {error}
                </motion.p>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addTeamMember}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </motion.button>
            </motion.div>

            {/* Team Members List */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-8"
            >


              <AnimatePresence>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex items-center justify-between p-4 text-white bg-[#151515] rounded-lg"
                    >
                      <div>
                        <h3 className="text-sm font-medium text-white">{member.name}</h3>
                        <p className="text-sm text-white">{member.email}</p>
                      </div>
                      <div className="flex items-center text-white bg-[#151515]  space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => sendInvite(member.email)}
                          className="p-2 text-indigo-600 hover:text-indigo-800"
                          title="Send invite"
                        >
                          <Send className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeTeamMember(member.id)}
                          className="p-2 text-red-600 hover:text-red-800"
                          title="Remove member"
                        >
                          <X className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Payment Details</h2>
              <div className="text-white bg-black p-6 rounded-lg">
                <div className="mb-4">
                  <p className="text-lg font-medium text-white mb-2">Registration Fee: {hackathonInfo.registrationFee}</p>
                  <p className="text-sm text-white">Includes access to the venue, meals, and swag bags for all team members</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">Payment Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span>Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span>PayPal</span>
                    </label>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Card Number</label>
                        <div className="flex">
                          <CreditCard className="h-5 w-5 text-white absolute mt-3 ml-3" />
                          <input
                            type="text"
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Expiry Date</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">CVV</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
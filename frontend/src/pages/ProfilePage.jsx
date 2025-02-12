import { motion } from 'framer-motion';
import { useState } from 'react';
import { Nav } from '../components';
import { useNavigate } from 'react-router-dom';

const SocialLink = ({ icon, href, platform }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
  >
    <span className="text-xl">{icon}</span>
    <span>{platform}</span>
  </a>
);

const SkillBadge = ({ skill }) => (
  <motion.span
    whileHover={{ scale: 1.05 }}
    className="px-3 py-1 bg-[#202020] text-blue-400 rounded-full text-sm"
  >
    {skill}
  </motion.span>
);

const AchievementCard = ({ title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-[#202020] p-4 rounded-lg"
  >
    <h3 className="font-semibold text-lg mb-2 text-white">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

export function ProfilePage() {
  const [profile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Tech Street, Silicon Valley",
    participatedIn: [
      { id: 1, name: "SaaS Hackathon 2025" },
      { id: 2, name: "AI Innovation Challenge" }
    ],
    achievements: [
      { id: 1, title: "1st Place - SaaS Hackathon", description: "Built an innovative SaaS solution" },
      { id: 2, title: "Best UI/UX Design", description: "Recognized for exceptional design work" }
    ],
    league: "Diamond",
    isAvailable: true,
    skills: ["React", "Node.js", "TypeScript", "UI/UX Design", "Cloud Architecture"],
    dob: "1995-05-15",
    collegeName: "MIT World Peace University",
    githubProfile: "https://github.com/johndoe",
    linkedInProfile: "https://linkedin.com/in/johndoe",
    twitterProfile: "https://twitter.com/johndoe",
    isVerified: true
  });

  const navigate = useNavigate()

  const handleUpdate = () => {
    navigate("/update")
  }

  return (
    <div className="min-h-screen bg-black ">
      <Nav/>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-[#151515] rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              {profile.isVerified && (
                <span className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                  ✓
                </span>
              )}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  profile.isAvailable 
                    ? 'bg-green-900 text-green-200'
                    : 'bg-red-900 text-red-200'
                }`}>
                  {profile.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
              
              <div className="text-gray-400 mb-4">
                <p>{profile.email}</p>
                <p>{profile.address}</p>
                <p>Born: {new Date(profile.dob).toLocaleDateString()}</p>
                <p>College: {profile.collegeName}</p>
              </div>

              <div className="flex gap-4">
                <SocialLink icon="🐱" href={profile.githubProfile} platform="GitHub" />
                <SocialLink icon="💼" href={profile.linkedInProfile} platform="LinkedIn" />
                <SocialLink icon="🐦" href={profile.twitterProfile} platform="Twitter" />
              </div>
            </div>

            <div className="md:text-right" onClick={handleUpdate}>
              <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full font-semibold">
                  Update
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-[#151515] rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <SkillBadge key={index} skill={skill} />
            ))}
          </div>
        </div>

        {/* Hackathons & Achievements */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#151515] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Participated Hackathons</h2>
            <ul className="space-y-2">
              {profile.participatedIn.map((hackathon) => (
                <li key={hackathon.id} className="flex items-center gap-2 text-gray-300">
                  <span className="text-blue-400">🏆</span>
                  <span>{hackathon.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#151515] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Achievements</h2>
            <div className="space-y-4">
              {profile.achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
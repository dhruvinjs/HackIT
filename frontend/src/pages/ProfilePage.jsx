import { motion } from "framer-motion";
import { useState } from "react";
import { Nav } from "../components";
import { useNavigate } from "react-router-dom";

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
      { id: 2, name: "AI Innovation Challenge" },
    ],
    achievements: [
      {
        id: 1,
        title: "1st Place - SaaS Hackathon",
        description: "Built an innovative SaaS solution",
      },
      {
        id: 2,
        title: "Best UI/UX Design",
        description: "Recognized for exceptional design work",
      },
    ],
    league: "Diamond",
    isAvailable: true,
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "UI/UX Design",
      "Cloud Architecture",
    ],
    dob: "1995-05-15",
    collegeName: "MIT World Peace University",
    githubProfile: "https://github.com/johndoe",
    linkedInProfile: "https://linkedin.com/in/johndoe",
    twitterProfile: "https://twitter.com/johndoe",
    isVerified: true,
  });

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/update");
  };

  return (
    <div className="min-h-screen bg-black ">
      <Nav />
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-[#151515] rounded-xl p-6 mb-6">
          <div className="flex flex-col justify-center items-center md:flex-row gap-6 md:items-start">
            <div className="relative">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              {profile.isVerified && (
                <span className="absolute bottom-0 right-0 bg-blue-500 text-white py-1 px-2 rounded-xl">
                  ✓
                </span>
              )}
            </div>

            <div className="flex-grow">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {profile.name}
                </h1>
                <span
                  className={`px-3 py-1 rounded-xl text-sm ${
                    profile.isAvailable
                      ? "bg-green-900 text-green-200"
                      : "bg-red-900 text-red-200"
                  }`}
                >
                  {profile.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="text-gray-400 mb-4 flex flex-col justify-center items-center">
                <p>{profile.email}</p>
                <p>{profile.address}</p>
                <p>Born: {new Date(profile.dob).toLocaleDateString()}</p>
                <p>College: {profile.collegeName}</p>
              </div>

              <div className="gap-4 flex justify-center items-center">
                <SocialLink
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                      role="img"
                      aria-label="GitHub"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  }
                  href={profile.githubProfile}
                  platform="GitHub"
                />
                <SocialLink
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                      role="img"
                      aria-label="LinkedIn"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  }
                  href={profile.linkedInProfile}
                  platform="LinkedIn"
                />
                <SocialLink
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                      role="img"
                      aria-label="Twitter"
                    >
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                  }
                  href={profile.twitterProfile}
                  platform="Twitter"
                />
              </div>
            </div>

            <div className="md:text-right" onClick={handleUpdate}>
              <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
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
            <h2 className="text-xl font-semibold mb-4 text-white">
              Participated Hackathons
            </h2>
            <ul className="space-y-2">
              {profile.participatedIn.map((hackathon) => (
                <li
                  key={hackathon.id}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <span className="text-blue-400">🏆</span>
                  <span>{hackathon.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#151515] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Achievements
            </h2>
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

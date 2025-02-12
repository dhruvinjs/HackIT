import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    User,
    Trophy,
    LogOut,
    Target,
    Medal,
    ChevronRight,
    X
} from 'lucide-react';

const Sidebar = ({ value: { isMenuOpen, setIsMenuOpen } }) => {

    const navigate = useNavigate();
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        badges: ['Gold', 'Silver', 'Bronze']
    };



    const menuItems = [
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Trophy, label: 'Hackathons', path: '/hackathons' },
        { icon: Target, label: 'My Rounds', path: '/rounds' },
    ];

    const handleLogout = () => {
        // Add logout logic here
        navigate('/');
    };

    const sidebarVariants = {
        hidden: {
            x: "100%",
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
        exit: {
            x: "100%",
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
    };

    return (
        <AnimatePresence mode="wait">
            {isMenuOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={sidebarVariants}
                    className="fixed top-0 right-0 h-screen w-80 bg-[#151515] shadow-lg"
                >
                    <div className="h-screen w-80 bg-[#151515] text-white flex flex-col">
                        {/* User Profile Section */}
                        <div className="p-6 border-b border-gray-700">
                            <div className='flex p-4 justify-between mb-4 border-b'>
                                <p className='text-2xl font-semibold'>Profile</p>
                                <X onClick={() => setIsMenuOpen(!isMenuOpen)} />
                            </div>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h3 className="font-medium">{user.name}</h3>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                            </div>

                            {/* Badges Section */}
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-400 mb-2">Badges</h4>
                                <div className="flex space-x-2">
                                    {user.badges.map((badge, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs rounded-full bg-gray-700"
                                        >
                                            <Medal className="w-4 h-4 inline-block mr-1" />
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="flex-1 p-4">
                            <ul className="space-y-2">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => navigate(item.path)}
                                            className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-150"
                                        >
                                            <div className="flex items-center">
                                                <item.icon className="w-5 h-5 mr-3" />
                                                <span>{item.label}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Logout Button */}
                        <div className="p-4 border-t border-gray-700">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-150"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
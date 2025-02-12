import React, { useState } from 'react';
import { Search, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav } from '../components';

const initialFriends = [
    {
        id: '1',
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        lastMessage: 'Hey, how are you?',
        lastSeen: '2 min ago'
    },
    {
        id: '2',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        lastMessage: 'Let\'s catch up soon!',
        lastSeen: '5 min ago'
    },
    {
        id: '3',
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        lastMessage: 'Thanks for your help!',
        lastSeen: '30 min ago'
    }
];

export default function ChatPage() {
    const [friends, setFriends] = useState(initialFriends);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [message, setMessage] = useState('');

    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessage('');
        }
    };

    return (
        <div>
            <Nav/>
            <div className="flex h-screen bg-black text-white">
                {/* Friends List Sidebar */}
                <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-1/3 bg-inner border-r border-gray-800"
                >
                    <div className="p-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search friends..."
                                className="w-full pl-10 pr-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                        </div>
                    </div>

                    <motion.div
                        className="overflow-y-auto h-[calc(100vh-5rem)]"
                        layout
                    >
                        <AnimatePresence>
                            {filteredFriends.map(friend => (
                                <motion.div
                                    key={friend.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    whileHover={{ scale: 1.02 }}
                                    className={`flex items-center p-4 cursor-pointer transition-colors ${selectedFriend?.id === friend.id ? 'bg-gray-800' : 'hover:bg-gray-900'
                                        }`}
                                    onClick={() => setSelectedFriend(friend)}
                                >
                                    <img
                                        src={friend.avatar}
                                        alt={friend.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="ml-4 flex-1">
                                        <h3 className="font-semibold text-gray-100">{friend.name}</h3>
                                        <p className="text-sm text-gray-400">{friend.lastMessage}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">{friend.lastSeen}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-back">
                    <AnimatePresence mode="wait">
                        {selectedFriend ? (
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col h-full"
                            >
                                {/* Chat Header */}
                                <div className="p-4 border-b border-gray-800 bg-inner flex items-center">
                                    <img
                                        src={selectedFriend.avatar}
                                        alt={selectedFriend.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="ml-4">
                                        <h2 className="font-semibold text-gray-100">{selectedFriend.name}</h2>
                                        <p className="text-sm text-gray-400">Online</p>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="flex-1 overflow-y-auto p-4">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="flex justify-end mb-4"
                                    >
                                        <div className="bg-blue-600 text-white rounded-lg py-2 px-4 max-w-xs">
                                            Hey, how are you?
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="flex mb-4"
                                    >
                                        <div className="bg-[#151515] text-gray-100 rounded-lg py-2 px-4 max-w-xs">
                                            I'm doing great, thanks for asking!
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Message Input */}
                                <div className="p-4 bg-inner border-t border-gray-800">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            className="flex-1 bg-back border border-gray-700 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 text-gray-100"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSendMessage}
                                            className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
                                        >
                                            <Send className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex-1 flex items-center justify-center"
                            >
                                <div className="text-center text-gray-500">
                                    <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                                    <p>Select a friend to start chatting</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
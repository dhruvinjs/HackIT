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
        lastMessage: "Let's catch up soon!",
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

    // --- AI Chat State ---
    const [activeChat, setActiveChat] = useState('friend'); // 'friend' or 'ai'
    const [aiMessage, setAiMessage] = useState('');
    const [chatsToAI, setChatsToAI] = useState([]);
    const [isFetchingAI, setIsFetchingAI] = useState(false);
    // ----------------------

    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSendMessage = () => {
        if (message.trim()) {
            // Here you would normally add the friend chat message
            setMessage('');
        }
    };

    // Function to handle sending AI messages
    const handleSendAIMessage = async () => {
        if (!aiMessage.trim()) return;
        setIsFetchingAI(true);
        try {
            const query = [
                { role: "system", content: "You are a helpful AI assistant." },
                { role: "user", content: aiMessage }
            ];
            // Replace with your actual AI API endpoint and adjust options as needed.
            const apiUrl = "https://your-ai-api-endpoint";
            const response = await fetch(apiUrl, {
                method: "GET", // or "POST" if your API requires it
                // If you use GET, you might send the query as a query parameter
                // For POST, set headers and body accordingly.
            });
            const data = await response.json();
            // Assume data.response_content contains the AI response text
            setChatsToAI(prev => [
                ...prev,
                { text: aiMessage, response: data.response_content }
            ]);
            setAiMessage('');
        } catch (error) {
            console.error("Error calling AI:", error);
        }
        setIsFetchingAI(false);
    };

    return (
        <div>
            <Nav />
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
                                    onClick={() => {
                                        setSelectedFriend(friend);
                                        setActiveChat("friend");
                                    }}
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
                    {/* Chat Mode Tabs */}
                    <div className="flex border-b border-gray-800">
                        <button
                            onClick={() => setActiveChat("friend")}
                            className={`flex-1 py-2 text-center ${activeChat === "friend" ? "bg-gray-800" : "bg-back"} hover:bg-gray-800 transition-colors`}
                        >
                            Friends Chat
                        </button>
                        <button
                            onClick={() => setActiveChat("ai")}
                            className={`flex-1 py-2 text-center ${activeChat === "ai" ? "bg-gray-800" : "bg-back"} hover:bg-gray-800 transition-colors`}
                        >
                            AI Chat
                        </button>
                    </div>
                    <AnimatePresence mode="wait">
                        {activeChat === "friend" ? (
                            selectedFriend ? (
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
                            )
                        ) : (
                            // AI Chat Interface
                            <motion.div
                                key="ai-chat"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col h-full"
                            >
                                {/* AI Chat Messages */}
                                <div className="flex-1 overflow-y-auto p-4">
                                    {chatsToAI.length === 0 ? (
                                        <p className="text-gray-400 text-center">AI chat messages will appear here</p>
                                    ) : (
                                        chatsToAI.map((chat, index) => (
                                            <div key={index} className="space-y-2 mb-4">
                                                {/* User Message */}
                                                <div className="flex justify-end">
                                                    <div className="bg-blue-600 text-white rounded-lg py-2 px-4 max-w-xs break-words">
                                                        {chat.text}
                                                    </div>
                                                </div>
                                                {/* AI Response */}
                                                <div className="flex justify-start">
                                                    <div className="bg-gray-700 text-white rounded-lg py-2 px-4 max-w-xs break-words">
                                                        {chat.response}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {/* AI Message Input */}
                                <div className="p-4 bg-inner border-t border-gray-800 flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Ask AI something..."
                                        className="flex-1 bg-back border border-gray-700 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 text-gray-100"
                                        value={aiMessage}
                                        onChange={(e) => setAiMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendAIMessage()}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSendAIMessage}
                                        className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
                                    >
                                        <Send className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

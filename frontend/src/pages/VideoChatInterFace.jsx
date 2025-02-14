import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  MonitorUp,
  MessageCircle,
  Bot,
  Users,
  ChevronDown,
  Pin,
  PinOff,
  Loader2,
  Send
} from 'lucide-react';
import io from 'socket.io-client';

function VideoChatInterFace() {
  const [text, setText] = useState("");
  const [chatsToAI, setChatsToAI] = useState([]);
  // UI States
  const [videoOn, setVideoOn] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [activeChat, setActiveChat] = useState('regular');
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(true);
  const [pinnedParticipant, setPinnedParticipant] = useState(null);

  // References and WebRTC States
  const localVideoRef = useRef(null);
  const socketRef = useRef();
  const peerConnectionRef = useRef(null);
  const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

  const [mystream, setMyStream] = useState(null);
  const [remotestream, setRemoteStream] = useState(null);
  const [remoteSocketId, setRemoteSocketId] = useState('');
  const [newUser, setNewUser] = useState('');

  // Dummy participants
  const participants = [
    { id: 1, name: 'John Doe', isMuted: false, isHost: true },
    { id: 2, name: 'Jane Smith', isMuted: true, isHost: false },
    { id: 3, name: 'Mike Johnson', isMuted: false, isHost: false },
  ];

  const handlePinParticipant = (id) => {
    setPinnedParticipant(pinnedParticipant === id ? null : id);
  };

  // Format text from AI for code blocks, headings, etc.
  const formatTextWithRegex = (text) => {
    return text
      .replace(/^(\d+\.\s|\#{1,3}\s)(.+)/gm, "<h2>$2</h2>") // Headings
      .replace(/```([^`]+)```/g, "<pre>$1</pre>") // Code Blocks
      .replace(/`([^`]+)`/g, "<code>$1</code>") // Inline Code
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\n/g, "<br/>"); // New Line
  };

  const handleAICall = async () => {
    try {
      const query = [
        { role: "system", content: "You are a helpful AI for software development." },
        { role: "user", content: text },
      ];
      // Dummy fetch for demonstration. Replace with your own endpoint/logic:
      const apiUrl = `https://furpssgdgg.execute-api.us-east-1.amazonaws.com/default/llm_chat?query=${encodeURIComponent(
        JSON.stringify(query)
      )}`;

      const response = await fetch(apiUrl, { method: 'GET' });
      const data = await response.json();

      setChatsToAI((prev) => [
        ...prev,
        {
          text,
          response: formatTextWithRegex(data?.response_content || "No response"),
        },
      ]);
    } catch (error) {
      console.log("Error while fetching AI response:", error);
    }
  };

  const handleKeyPress = async (event) => {
    // Trigger on Enter key or on Send button click
    if (event.key === "Enter" || event.type === "click") {
      if (!text.trim()) return; // Skip empty messages
      setIsFetching(true);
      await handleAICall();
      setText("");
      setIsFetching(false);
    }
  };

  // Example socket / WebRTC setup
  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setMyStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    // Dummy example event handlers:
    socketRef.current.on('offer', async ({ offer }) => {
      console.log("Received offer:", offer);
      // ...
    });

    socketRef.current.on('answer', async ({ answer }) => {
      console.log("Received answer:", answer);
      // ...
    });

    socketRef.current.on('ice-candidate', async ({ candidate }) => {
      console.log("Received candidate:", candidate);
      // ...
    });

    socketRef.current.on('room-joined', (data) => {
      const { email, id } = data;
      setRemoteSocketId(id);
      setNewUser(email);
      console.log(`${email} has joined`);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Simple placeholders for making offers
  const createPeerConnection = useCallback(() => {
    console.log("Creating peer connection");
    // ...
  }, []);

  const makeOffer = useCallback(async () => {
    console.log("Making an offer");
    // ...
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-4 flex gap-4 h-screen">
        {/* Left side: Video & Chat UI */}
        <div className="flex-grow flex flex-col">
          <div className="bg-[#151515] rounded-lg p-4 flex-grow mb-4">
            <div className={`grid ${pinnedParticipant ? 'grid-cols-1' : 'grid-cols-2'} gap-4 h-full`}>
              {participants.map((participant) =>
                pinnedParticipant === null || pinnedParticipant === participant.id ? (
                  <motion.div
                    key={participant.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <img
                      src={`https://source.unsplash.com/random/400x300?portrait&${participant.id}`}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => handlePinParticipant(participant.id)}
                        className="p-2 rounded-lg bg-gray-900/50 hover:bg-gray-900/75 transition-colors"
                      >
                        {pinnedParticipant === participant.id ? <PinOff size={20} /> : <Pin size={20} />}
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="text-sm font-medium">{participant.name}</span>
                      {participant.isMuted && <MicOff size={16} className="text-red-500" />}
                    </div>
                  </motion.div>
                ) : null
              )}
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#151515] rounded-lg p-4 flex justify-center items-center gap-6"
          >
            <button
              onClick={() => setVideoOn(!videoOn)}
              className={`p-4 rounded-full ${videoOn ? 'bg-gray-700' : 'bg-red-500'} transition-colors`}
            >
              {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-4 rounded-full ${micOn ? 'bg-gray-700' : 'bg-red-500'} transition-colors`}
            >
              {micOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
            <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <MonitorUp size={24} />
            </button>
            <button className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
              <Phone size={24} />
            </button>
            <button
              onClick={makeOffer}
              className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Make Offer/Call
            </button>
          </motion.div>
        </div>

        {/* Right side: Chat & Participants UI */}
        <div className="w-80 bg-[#151515] rounded-lg p-4 flex flex-col">
          {/* Chat Switcher */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 mb-4 bg-gray-800 p-1 rounded-lg"
          >
            <button
              onClick={() => setActiveChat('regular')}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors ${
                activeChat === 'regular' ? 'bg-gray-700' : 'hover:bg-gray-700/50'
              }`}
            >
              <MessageCircle size={20} />
              Chat
            </button>
            <button
              onClick={() => setActiveChat('ai')}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors ${
                activeChat === 'ai' ? 'bg-gray-700' : 'hover:bg-gray-700/50'
              }`}
            >
              <Bot size={20} />
              AI Chat
            </button>
          </motion.div>

          {/* Chat Window */}
          <div className="flex-grow overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeChat === 'regular' ? (
                <motion.div
                  key="regular"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex-grow overflow-y-auto space-y-4 mb-4 px-2">
                    <p className="text-gray-400 text-center text-sm mt-2">
                      Chat messages will appear here
                    </p>
                    {/* Example messages could go here */}
                  </div>
                  <div className="relative flex items-center gap-2 px-2 pb-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-grow bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors">
                      <Send size={20} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full flex flex-col"
                >
                  {/* AI Chat Messages */}
                  <div className="flex-grow overflow-y-auto space-y-4 mb-4 px-2 py-2">
                    {chatsToAI.length === 0 ? (
                      <p className="text-gray-400 text-center text-sm mt-2">
                        AI chat messages will appear here
                      </p>
                    ) : (
                      chatsToAI.map((chat, index) => (
                        <div key={index} className="space-y-2">
                          {/* User Bubble (Right-aligned) */}
                          <div className="flex justify-end">
                            <div className="max-w-[70%] bg-blue-600 px-3 py-2 rounded-md text-sm text-white break-words">
                              {chat.text}
                            </div>
                          </div>
                          {/* AI Bubble (Left-aligned) */}
                          <div className="flex justify-start">
                            <div
                              className="max-w-[70%] bg-gray-700 px-3 py-2 rounded-md text-sm text-white break-words"
                              dangerouslySetInnerHTML={{ __html: chat.response }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* AI Input & Send */}
                  <div className="flex items-center gap-2 px-2 pb-2">
                    <input
                      type="text"
                      placeholder="Ask AI something..."
                      className="flex-grow bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      disabled={isFetching}
                    />
                    <button
                      onClick={handleKeyPress}
                      className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      {isFetching ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Send size={20} />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Participants */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <button
              onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
              className="w-full flex items-center justify-between mb-3 hover:text-gray-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users size={20} />
                <h3 className="font-medium">Participants ({participants.length})</h3>
              </div>
              <motion.div
                animate={{ rotate: isParticipantsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isParticipantsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  {participants.map((participant) => (
                    <motion.div
                      key={participant.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span>{participant.name}</span>
                        {participant.isHost && (
                          <span className="text-xs bg-blue-500 px-2 py-0.5 rounded">
                            Host
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePinParticipant(participant.id)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {pinnedParticipant === participant.id ? (
                            <PinOff size={16} />
                          ) : (
                            <Pin size={16} />
                          )}
                        </button>
                        {participant.isHost && (
                          <button
                            className="text-gray-400 hover:text-white transition-colors"
                            onClick={() => {
                              // Handle mute/unmute
                            }}
                          >
                            {participant.isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoChatInterFace;

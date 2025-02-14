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
  UserSearch
} from 'lucide-react';
import WebRtcPeer from '../lib/WebRtcPeer.js';
import io from 'socket.io-client';

function VideoChatInterFace() {

  const [text , setText] = useState("")
  const [chatsToAI , setChatsToAI] = useState([]);
  // UI States
  const [videoOn, setVideoOn] = useState(true);
  const [isFetching , setIsFetching] = useState(false);
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

  const participants = [
    { id: 1, name: 'John Doe', isMuted: false, isHost: true },
    { id: 2, name: 'Jane Smith', isMuted: true, isHost: false },
    { id: 3, name: 'Mike Johnson', isMuted: false, isHost: false },
  ];

  const handlePinParticipant = (id) => {
    setPinnedParticipant(pinnedParticipant === id ? null : id);
  };

  const handleKeyPress = async(event) => {
    if (event.key === "Enter") {
      setIsFetching(true);
        await handleAICall();
        setText("");
        setIsFetching(false);
        
    }
};
const formatTextWithRegex = (text) => {
  return text
      .replace(/^(\d+\.\s|\#{1,3}\s)(.+)/gm, "<h2>$2</h2>") // Headings
      .replace(/```([^`]+)```/g, "<pre>$1</pre>") // Code Blocks
      .replace(/`([^`]+)`/g, "<code>$1</code>") // Inline Code
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
      .replace(/\n/g, "<br/>"); // New Line
};
  const handleAICall = async()=>{
    try {
        const query = [
          { role: "system", content: "You are a helpful AI for software development." },
          { role: "user", content: text},
        ];
        const apiUrl = `https://furpssgdgg.execute-api.us-east-1.amazonaws.com/default/llm_chat?link=writecream.com2&query=${encodeURIComponent(JSON.stringify(query))}`;
    
        const response = await fetch(apiUrl, { method: 'GET' });
        const data = await response.json();
        console.log("data " , data);
        setChatsToAI([...chatsToAI , {text , response : formatTextWithRegex(data.response_content)}])
        if (response.ok) {
          console.log("Success");
        } else {
          console.log("error while fetching .");
        }
      } catch (error) {
        onsole.log("error while fetching .",error);
      }
  
  }


  // Set up socket connection and local media stream
  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => {
        setMyStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    // Listen for an incoming offer
    socketRef.current.emit('offer', async ({ offer }) => {
      // Create peer connection if it doesn't exist
      if (!peerConnectionRef.current) {
        createPeerConnection();
      }
      await peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socketRef.current.emit('answer', { answer });
    });

    // Listen for an answer to our offer
    socketRef.current.on('answer', async ({ answer }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(answer);
      }
    });

    // Listen for incoming ICE candidates
    socketRef.current.on("ice-candidate", async ({ candidate }) => {
      if (peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(candidate);
        } catch (e) {
          console.error("Error adding received ICE candidate", e);
        }
      }
    });

    // Listen for a room joined event (for example purposes)
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

  // Create a simple peer connection
  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection(rtcConfig);

    // If the local stream is available, add its tracks
    if (mystream) {
      mystream.getTracks().forEach((track) => {
        pc.addTrack(track, mystream);
      });
    }

    // Handle incoming remote tracks
    pc.ontrack = (event) => {
      console.log("Remote track received");
      const [stream] = event.streams;
      setRemoteStream(stream);
    };

    // Send ICE candidates to the signaling server
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", { candidate: event.candidate });
      }
    };

    peerConnectionRef.current = pc;
    return pc;
  }, [mystream, rtcConfig]);

  // Make an offer to initiate a connection
  const makeOffer = useCallback(async () => {
    if (!peerConnectionRef.current) {
      createPeerConnection();
    }
    console.log('Make offer called');
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socketRef.current.emit('offer', { offer });
  }, [createPeerConnection]);

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
                        {pinnedParticipant === participant.id ? (
                          <PinOff size={20} />
                        ) : (
                          <Pin size={20} />
                        )}
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="text-sm font-medium">{participant.name}</span>
                      {participant.isMuted && (
                        <MicOff size={16} className="text-red-500" />
                      )}
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
            {/* Button to start the connection */}
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

          <div className="flex-grow overflow-y-scroll">
            <AnimatePresence mode="wait">
              {activeChat === 'regular' ? (
                <motion.div
                  key="regular"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex-grow overflow-y-auto space-y-4 mb-4">
                    <p className="text-gray-400 text-center text-sm">
                      Chat messages will appear here
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                  <div className="flex-grow overflow-y-scroll space-y-4 mb-4">
                    {chatsToAI.length == 0 ? <p className="text-gray-400 text-center text-sm">
                      AI chat messages will appear here
                    </p> : <div className='flex flex-col gap-7'>
                        {chatsToAI && chatsToAI.map((chat)=>{
                          return <div className='flex flex-col gap-4 border-b-1 pb-4'>
                            <p className='bg-white p-2 rounded-xl text-black'>{chat.text}</p>
                            <div dangerouslySetInnerHTML={{ __html: chat.response }}></div>
                          </div>
                        })}
                      </div>}
                  </div>
                  <div className="relative flex justify-end">
                    {isFetching ? 
                    <div role="status px-4 py-2">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    :<input
                      type="text"
                      placeholder="Ask AI something..."
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={text}
                      onChange={(e)=>setText(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <button
              onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
              className="w-full flex items-center justify-between mb-3 hover:text-gray-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users size={20} />
                <h3 className="font-medium">Participants ({participants.length})</h3>
              </div>
              <motion.div animate={{ rotate: isParticipantsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
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
                          <span className="text-xs bg-blue-500 px-2 py-0.5 rounded">Host</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePinParticipant(participant.id)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {pinnedParticipant === participant.id ? <PinOff size={16} /> : <Pin size={16} />}
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
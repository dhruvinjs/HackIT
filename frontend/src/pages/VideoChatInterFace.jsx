import React, { useState,useRef } from 'react';
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
  PinOff
} from 'lucide-react';

function VideoChatInterFace() {
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [activeChat, setActiveChat] = useState('regular');
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(true);
  const [pinnedParticipant, setPinnedParticipant] = useState(null);

  const participants = [
    { id: 1, name: 'John Doe', isMuted: false, isHost: true },
    { id: 2, name: 'Jane Smith', isMuted: true, isHost: false },
    { id: 3, name: 'Mike Johnson', isMuted: false, isHost: false },
  ];


  const rtcConfig={iceservers:[{ urls: "stun:stun.l.google.com:19302" }]}
  const handlePinParticipant = (id) => {
    setPinnedParticipant(pinnedParticipant === id ? null : id);
  };
  //Storing the local Video Stream means our own video 
  const [localStream,setLocalStream]=useState()
  const [remoteStream,setRemoteStream]=useRef({})
  //Other participants video stream which is tagged with thier socket id

  const peerConnections=useRef({})//Keeping the other participants connection in object
  const localVideoRef=useRef(null)//ye apna local video reference hai
  const socketRef=useRef()
  useEffect(() => {
    socketRef.current=io("http:localhost:4000")
    navigator.mediaDevices.getUserMedia({audio:true,video:true})
    .then(stream=>{
      setLocalStream(stream)
     if(localVideoRef.current){
      localVideoRef.current.srcObject=stream
     }
    })
    .catch((err) => console.error("Error accessing media devices:", err));

       // --- Set up Socket.IO Event Listeners for Signaling ---

      //listen for offer means video on karne ka offer
       socketRef.on('offer',async({offer,sender})=>{
        if(!peerConnections.current[sender]){
          createPeerConnection(sender)
        }

        await peerConnections.current[sender].setRemoteDescription(offer)
        const answer = await peerConnections.current[sender].createAnswer();
        //Ye mera answer so i am setting it for local description 
        await peerConnections.current[sender].setLocalDescription(answer);
        socketRef.emit('answer',{answer,targer:sender})


       })


       socketRef.on('answer',async({answer,sender})=>{
        if(peerConnections.current[sender]){
  // Set the received answer as the remote description to finalize the connection.
          await peerConnections.current[sender].setRemoteDescription(answer);
        }
       })
       
       socketRef.current.on("ice-candidate", async ({ candidate, sender }) => {
        if (peerConnections.current[sender]) {
          try {
            // Add the received ICE candidate to the corresponding RTCPeerConnection.
            await peerConnections.current[sender].addIceCandidate(candidate);
          } catch (e) {
            console.error("Error adding received ICE candidate", e);
          }
        }
      });
  
      // --- Cleanup: Disconnect socket on component unmount ---
      return () => {
        socketRef.current.disconnect();
      };
  }, []);

  const createPeerConnection=(socketId)=>{
    const pc=RTCPeerConnection(rtcConfig)

    // If we already have a local media stream, add all of its tracks to the RTCPeerConnection.
    //Basically ye apn etracks like video and audio set kar raha hia to send to user
    if (localStream) {
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    }

    pc.ontrack = (event) => {
      console.log("Remote track received from", socketId);
      // Update our state by adding the new remote stream, but only if it’s not already added.
      setRemoteStream((prevStreams) => {
        // Check if the stream from this socket is already in our state.
        if (!prevStreams.find((s) => s.socketId === socketId)) {
          return [...prevStreams, { socketId, stream: event.streams[0] }];
        }
        return prevStreams;
      });
    };

    // When the RTCPeerConnection finds an ICE candidate, send it to the remote peer.
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", { candidate: event.candidate, target: socketId });
      }
    };

    // Save the created RTCPeerConnection in our mutable ref object, keyed by the remote socket ID.
    peerConnections.current[socketId] = pc;
    return pc;
  }
  }
  


  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-4 flex gap-4 h-screen">
        {/* Main Video Area */}
        <div className="flex-grow flex flex-col">
          <div className="bg-[#151515] rounded-lg p-4 flex-grow mb-4">
            {/* Video Grid */}
            <div className={`grid ${pinnedParticipant ? 'grid-cols-1' : 'grid-cols-2'} gap-4 h-full`}>
              {participants.map((participant) => (
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
              ))}
            </div>
          </div>

          {/* Controls */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#151515] rounded-lg p-4 flex justify-center items-center gap-6"
          >
            <button
              onClick={() => setVideoOn(!videoOn)}
              className={`p-4 rounded-full ${
                videoOn ? 'bg-gray-700' : 'bg-red-500'
              } transition-colors`}
            >
              {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-4 rounded-full ${
                micOn ? 'bg-gray-700' : 'bg-red-500'
              } transition-colors`}
            >
              {micOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
            <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <MonitorUp size={24} />
            </button>
            <button className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
              <Phone size={24} />
            </button>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-[#151515] rounded-lg p-4 flex flex-col">
          {/* Chat/AI Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 mb-4 bg-gray-800 p-1 rounded-lg"
          >
            <button
              onClick={() => setActiveChat('regular')}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors ${
                activeChat === 'regular'
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <MessageCircle size={20} />
              Chat
            </button>
            <button
              onClick={() => setActiveChat('ai')}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors ${
                activeChat === 'ai'
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <Bot size={20} />
              AI Chat
            </button>
          </motion.div>

          {/* Chat Content */}
          <div className="flex-grow">
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
                  <div className="flex-grow overflow-y-auto space-y-4 mb-4">
                    <p className="text-gray-400 text-center text-sm">
                      AI chat messages will appear here
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask AI something..."
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Team Section */}
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
                            {participant.isMuted ? (
                              <MicOff size={16} />
                            ) : (
                              <Mic size={16} />
                            )}
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
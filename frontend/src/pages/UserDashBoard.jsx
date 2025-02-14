import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Footer, Nav, HackInfoCard, HackathonDetails } from '../components';
import { useHostStore } from '../store/useHostStore';
import { useParams } from 'react-router-dom';

function UserDashBoard() {
  const { getActiveEvents, hackathons } = useHostStore();
  const [data, setData] = useState({});
  const [participatedEvents, setParticipatedEvents] = useState([]);

  useEffect(() => {
    const fetchActiveEvents = async () => {
      await getActiveEvents();
    };
    fetchActiveEvents();
  }, [getActiveEvents]);

  // When no hackathon is selected, fetch events that the user has participated in.
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      axios
        .post(
          'http://localhost:4000/api/user/eventsParticipated',
          {}, // No payload data
          { withCredentials: true } // Now correctly passed as the config
        )
        .then((response) => {
          // Assuming the response returns an object with an 'eventNames' array
          setParticipatedEvents(response.data.eventNames);
        })
        .catch((err) => {
          console.error("Error fetching participated events:", err);
        });
    }
  }, [data]);
  
  const handleClick = (h) => {
    setData(h);
  };

  return (
    <div>
      <Nav />
      <div className="flex">
        {/* Left Sidebar with Hackathon List */}
        <div className="flex-1 bg-black p-5 border-r border-gray-50 h-[90vh] overflow-y-scroll">
          {hackathons &&
            hackathons.map((h, i) => (
              <div className="mb-4" key={i} onClick={() => handleClick(h)}>
                <HackInfoCard value={h} />
              </div>
            ))}
        </div>
        {/* Right Side: Show Selected Hackathon Details or Participated Events */}
        <div className="flex-3 bg-black h-[90vh] overflow-y-scroll">
          {Object.keys(data).length > 0 ? (
            <HackathonDetails value={data} />
          ) : (
            <div className="p-4">
              <h2 className="text-2xl font-bold text-white mb-4">Events Participated</h2>
              {participatedEvents && participatedEvents.length > 0 ? (
                participatedEvents.map((event) => (
                  <div key={event._id} className="mb-4">
                    <HackInfoCard value={event} btn />
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No participated events found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserDashBoard;

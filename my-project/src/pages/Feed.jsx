import React, { useState, useEffect } from 'react';
import FeedCard from './FeedCard/FeedCard';
const API_URL = window.location.origin.replace('3000', '5000'); // Adjusting the port if needed
const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts/getAll`);
        if (!response.ok) {
          throw new Error('Network Response is not OK');
        }
        const data = await response.json();
        console.log('data', data); // Debugging output
        setFeeds(data);
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <div className="w-full min-h-screen lg:py-7 sm:py-3 flex flex-col lg:flex-row items-start gap-x-20 mt-5 pt-5 mb-5">
      <div className="w-full lg:w-[70%] h-auto relative">
        <div className="w-full h-auto flex items-center justify-center mt-6 mb-6">
          <div className="w-full lg:w-[73%] md:w-[73%] sm:w-[80%]">
            {feeds &&
              feeds.map((feed) => (
                <FeedCard key={feed.id} feed={feed}></FeedCard>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[25%] h-auto lg:block hidden"></div>
    </div>
  );
};

export default Feed;

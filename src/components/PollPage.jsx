import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance.js";
import PollCard from "./PollCard.jsx";

const PollPage = () => {
  const { id } = useParams();
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await axiosInstance.get(`/poll/${id}`);
        setPollData(res.data.data);
      } catch (error) {
        console.error("Error fetching poll:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-600  flex items-center justify-center text-white font-semibold">
        <p className="text-2xl text-gray-200 tracking-widest animate-bounce">L o a d i n g . . .</p>
      </main>
    );
  }

  if (!pollData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-800 via-red-700 to-orange-600 text-white">
        <p className="text-xl font-medium">Failed to load poll. Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-600 text-white py-10 px-4">
      <PollCard key={pollData._id} {...pollData} />
    </main>
  );
};

export default PollPage;

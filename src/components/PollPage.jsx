import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance.js";
import { PollCard, Button, Input } from "./index.js";

const PollPage = () => {
  const { id } = useParams();
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("")

  const [copied, setCopied] = useState(false);

  const pollURL = `${window.location.origin}/poll/${id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pollURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(error => console.error("Failed to copy URL:", error))
  }

  const countDown = (expiryTime) => {
    const now = Date.now();
    const msLeft = expiryTime - now;

    if (msLeft <= 0) return "❌ Poll Ended";

    const days = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((msLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((msLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((msLeft / 1000) % 60);

    return `⏳ ${days > 0 ? `${days}d` : ""} ${hours}h ${minutes}m ${seconds}s`;
  };


  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = (await axiosInstance.get(`/poll/${id}`)).data.data;
        setPollData(res);

        let expiryTime = new Date(res.expiredAt).getTime();
        setTimeLeft(countDown(expiryTime));

        const intervalId = setInterval(() => {
          const result = countDown(expiryTime)
          setTimeLeft(result);

          if (result === "❌ Poll Ended") clearInterval(intervalId);
        }, 1000);

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
      <main className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-600 flex items-center justify-center text-white font-semibold">
        <p className="text-2xl text-gray-200 tracking-widest animate-bounce">L o a d i n g . . .</p>
      </main>
    );
  }

  if (!pollData) {
    return (
      <main className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-red-800 via-red-700 to-orange-600 text-white">
        <p className="text-xl font-semibold">Failed to load poll. Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-600 text-white py-10 px-4">
      <PollCard key={pollData._id} {...pollData} />

      {/* Poll Status */}
      <div className="relative bg-gradient-to-br from-pink-600 via-indigo-600 to-teal-500 text-black rounded-2xl shadow-xl p-6 w-full max-w-xl mx-auto mt-5 transition overflow-hidden">

        <h2 className="text-2xl font-semibold text-center mb-5 text-white tracking-wide pt-2">
          🕒 Poll Status
        </h2>

        <div className="text-white space-y-3 text-center">
          <p className="text-lg sm:text-xl">
            <span className="font-medium">Time Left:</span> <span className="font-bold">{timeLeft}</span>
          </p>
          <p className="text-lg sm:text-xl">
            <span className="font-medium">Total Votes:</span> <span className="font-bold">{pollData.options.reduce((acc, option) => acc + option.voteCounter, 0)}</span>
          </p>
        </div>

      </div>

      {/* Copy URL */}
      <div className="mt-10 flex justify-center">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6">

          <p className="text-gray-100 text-sm font-semibold mb-4 pl-1">🔗 Share this Poll</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-[70%]">
              <Input
                value={pollURL}
                readOnly
                className={`text-black font-mono px-4 py-2 rounded-lg border transition-colors duration-300
            ${copied ? "bg-green-200 border-green-400" : "bg-gray-50 border-gray-300"} 
            cursor-default`} />
            </div>

            <Button
              onClick={handleCopy}
              className={`w-full sm:w-[30%] transition-colors duration-300
    ${copied ? "bg-green-500 hover:bg-green-600" : "bg-sky-500 hover:bg-blue-500"}
    text-white px-4 py-2 rounded-lg font-semibold`}
            >
              {copied ? "Copied!" : "Copy URL"}
            </Button>

          </div>

        </div>
      </div>

    </main>
  );
};

export default PollPage;

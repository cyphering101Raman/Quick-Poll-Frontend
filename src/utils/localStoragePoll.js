const setPollData = (pollData) => {
  localStorage.setItem("current-pollData", JSON.stringify(pollData));
}

const getCurrentPollData = () => {
  return JSON.parse(localStorage.getItem("current-pollData"));
}

const addToPollData = (pollData) => {
  const poll = JSON.parse(localStorage.getItem("all-pollData")) || []
  poll.push(pollData);
  localStorage.setItem("all-pollData", JSON.stringify(poll));
}

const getAllPollData = () => {
  return JSON.parse(localStorage.getItem("all-pollData"));
}

export{
  setPollData,
  getCurrentPollData,
  addToPollData,
  getAllPollData
}
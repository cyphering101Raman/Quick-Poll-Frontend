import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pollArray: [],
  userPolls: [],
}

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    addPoll: (state, action) => {    // add poll to List of Polls
      state.pollArray.push(action.payload);
      state.userPolls.push(action.payload);
    },
    loadUserPolls: (state, action) => {     //loading all the polls for refresh
      state.userPolls = action.payload;
    },
    castVote: (state, action) => {
      const { pollId, optionIdx, userId } = action.payload;
      const poll = state.pollArray.find(poll => poll.id === pollId)
      if (poll && !poll.votedUsers.includes(userId)) {
        poll.options[optionIdx].voteCount += 1;
        poll.votedUsers.push(userId);
      }
    },
    deletePoll: (state, action) => {    // deleting the poll
      const pollId = action.payload;
      state.pollArray = state.pollArray.filter(p => p.id !== pollId)
      state.userPolls = state.userPolls.filter(p => p.id !== pollId);
    }
  }
})

export const { addPoll, loadUserPolls, castVote, deletePoll } = pollSlice.actions;

export default pollSlice.reducer;
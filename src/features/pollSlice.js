import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  pollArray: [],
}

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    addPoll: (state, action) => {    // add poll to List of Polls
      state.pollArray.push(action.payload);
    },
    loadPolls: (state, action) => {     //loading all the polls for refresh
      state.pollArray = action.payload;
    },
    castVote: (state, action) => {
      const { pollId, optionIdx, userId } = action.payload;
      const poll = state.pollArray.find(poll => poll.id === pollId)
      if (poll) {
        poll.options[optionIdx].voteCount += 1;
        poll.votedUsers.push(userId);
      }
    },
    deletePoll: (state, action) => {    // deleting the poll
      const pollId = action.payload;
      state.pollArray = state.pollArray.filter(p => p.id !== pollId)
      state.activePoll = null;
    }
  }
})

export const { addPoll, loadPolls, castVote, deletePoll } = pollSlice.actions;

export default pollSlice.reducer;
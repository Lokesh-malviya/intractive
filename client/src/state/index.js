import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  graph:null,
  round:1,
  times:0,
  point:0
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setGraph:(state, action)=>{
      state.graph = action.payload.graph;
    },
    startTime: (state, action) => {
      state.times = action.payload.times;
    },
    setRound: (state, action) => {
      state.round = action.payload.round;
    },
    setPoints: (state, action) => {
      state.point = action.payload.point;
    },
    
  },
});

export const {setLogin, setLogout,setGraph,startTime,setRound,setPoints } =
  authSlice.actions;
export default authSlice.reducer;
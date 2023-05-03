import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  graph:null,
/*   round:6, */
  times:0,
  timeh:1,
  success:true
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
    endTime:(state, action) => {
      state.timeh = action.payload.timeh;
    },
/*     setRound: (state, action) => {
      state.round = action.payload.round;
    }, */
    setSuccess: (state, action) => {
      state.success = action.payload.success;
    },
    
  },
});

export const {setLogin, setLogout,setGraph,startTime,/* setRound */setSuccess,endTime } =
  authSlice.actions;
export default authSlice.reducer;
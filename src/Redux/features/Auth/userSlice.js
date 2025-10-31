
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
   initialState: {
 
    user: null,
  
    error: null,
 
  },
  reducers: {
    addUser: (state, action) => {
        console.log("reduxUserrr", action.payload)
      state.user = action.payload;
    },
     deleteUser: (state, action) => {
      console.log("del", action.payload)
      state.user = "";
    },
     
  },
});

export const { addUser, deleteUser, } = userSlice.actions;
export default userSlice.reducer;

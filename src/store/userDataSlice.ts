import { createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "@/src/types/dataTaype";


const initialState = {
    img: "",
    profileData:null as ApiResponse |null,
    isAuthenticated: false,
    sms: "",
};  

export const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,

    reducers: {
       profileData: (state, action) => {
        if(action.payload){
            state.profileData = action.payload
            state.isAuthenticated = true
        }
       },
        logout: (state) => {
        state.profileData = null
        state.isAuthenticated = false
        }
    },
});

export const { profileData, logout } = userProfileSlice.actions;
export default userProfileSlice.reducer;
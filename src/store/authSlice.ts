import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        signUp: (state, action) => {},
        logIn: (state, action: PayloadAction<any>) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
});

export const { logIn, logout } = authSlice.actions;
export default authSlice.reducer;

// type User = {
//   id: string;
//   name: string;
//   email: string;
// };

// type AuthState = {
//   user: User | null;
//   isAuthenticated: boolean;
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signUp: (state, action: PayloadAction<User>) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },

//     logIn: (state, action: PayloadAction<User>) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },

//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });\
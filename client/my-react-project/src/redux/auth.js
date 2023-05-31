import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    loginId: null
  },
  reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem('token', action.payload.token);
        },
        error: (state, action) => {
          state.error = action.payload;
        },
        setUserInfo: (state, action) => {
            state.loginId = action.payload;
        },
        setUsername: (state, action) => {
          state.username = action.payload;
        },
  },
});



// Thunk action to log in a user
export const loginUser = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/login', {
        username: username,
        password: password
    });
    console.log(response.data)
    dispatch(loginSuccess(response.data));
  } catch (error) {
    // dispatch(error(error));
    console.log(error)
  }
};

//Thunk action to check if a user is logged in
export const checkLoginStatus = () => async dispatch => {
  try {
    const token = localStorage.getItem("token");
        const getUser = await axios.get(
          "http://localhost:8080/auth/login",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
    dispatch(setUserInfo(getUser.data.data.id));
    console.log(getUser.data.data.id)
  } catch (error) {
    console.log("error fetching user")
  }
};

export const { loginSuccess, error, setUserInfo, setUsername } = slice.actions;

export default slice.reducer;

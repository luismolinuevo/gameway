import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    loginStatus: null
  },
  reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        error: (state, action) => {
          state.error = action.payload;
        },
        loginStatus: (state, action) => {
            state.loginStatus = action.payload;
        },
  },
});

export const { loginSuccess, error, loginStatus } = slice.actions;

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
    const response = await axios.get('http://localhost:8080/auth/login');
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(error(error));
  }
};

export default slice.reducer;

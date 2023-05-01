import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
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
  },
});

export const { loginSuccess } = slice.actions;

// Thunk action to log in a user
export const loginUser = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/login', {
        userName: username,
        password: password
    });
    console.log(response.data)
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(error(error));
  }
};

// Thunk action to check if a user is logged in
// export const checkLoginStatus = () => async dispatch => {
//   try {
//     const response = await axios.get('http://localhost:8080/auth/login');
//     // dispatch(checkLoginSuccess(response.data));
//   } catch (error) {
//     dispatch(checkLoginFailure(error.message));
//   }
// };

export default slice.reducer;

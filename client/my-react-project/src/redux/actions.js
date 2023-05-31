import axios from "axios";

export const fetchUsername = (userId) => {
  return (dispatch) => {
    axios
      .get(`/user/${userId}`)
      .then((response) => {
        const { username } = response.data;
        dispatch(setUsername(username));
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };
};

export const setUsername = (username) => {
  return {
    type: "SET_USERNAME",
    payload: username,
  };
};

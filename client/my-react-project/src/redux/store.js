import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import auth from './auth';
import thunk from 'redux-thunk';



const store = configureStore({
  reducer: {  //may have to add .reducer
    auth: auth,

  },
  middleware: [thunk],
  
});

export default store;
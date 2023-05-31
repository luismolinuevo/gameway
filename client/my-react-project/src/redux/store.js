import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import auth from './auth';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const store = configureStore({
  reducer: {  //may have to add .reducer
    auth: auth,
    ...rootReducer,
  },
  middleware: [thunk],
  
});

export default store;
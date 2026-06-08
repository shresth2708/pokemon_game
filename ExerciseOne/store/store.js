import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import userReducer from './userSlice';
import achievementsReducer from './achievementsSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    achievements: achievementsReducer,
  },
});

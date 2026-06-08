import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  avatar: null,
  joinDate: null,
  preferences: {
    soundEnabled: true,
    hapticEnabled: true,
    theme: 'light', // light, dark, auto
    language: 'en',
  },
  statistics: {
    totalGamesPlayed: 0,
    totalTimePlayed: 0,
    bestStreak: 0,
    highestScore: 0,
    favoriteType: null,
  },
  friends: [],
  achievements: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      const { username, avatar } = action.payload;
      state.username = username;
      state.avatar = avatar;
      if (!state.joinDate) {
        state.joinDate = Date.now();
      }
    },
    
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    
    updateStatistics: (state, action) => {
      state.statistics = { ...state.statistics, ...action.payload };
    },
    
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    
    unlockAchievement: (state, action) => {
      if (!state.achievements.includes(action.payload)) {
        state.achievements.push(action.payload);
      }
    },
  },
});

export const {
  setUserProfile,
  updatePreferences,
  updateStatistics,
  addFriend,
  unlockAchievement,
} = userSlice.actions;

export default userSlice.reducer;

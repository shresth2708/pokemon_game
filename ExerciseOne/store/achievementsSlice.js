import { createSlice } from '@reduxjs/toolkit';

const achievements = [
  { id: 'first_win', title: 'First Victory', description: 'Answer your first question correctly', points: 50 },
  { id: 'streak_5', title: 'Hot Streak', description: 'Get 5 answers in a row', points: 100 },
  { id: 'streak_10', title: 'Unstoppable', description: 'Get 10 answers in a row', points: 200 },
  { id: 'collector', title: 'Card Collector', description: 'Collect 10 different cards', points: 150 },
  { id: 'master_collector', title: 'Master Collector', description: 'Collect 25 different cards', points: 300 },
  { id: 'speed_demon', title: 'Speed Demon', description: 'Answer a question in under 3 seconds', points: 75 },
  { id: 'perfectionist', title: 'Perfectionist', description: 'Complete a quiz with 100% accuracy', points: 250 },
  { id: 'fire_master', title: 'Fire Master', description: 'Collect all Fire-type Pokémon', points: 200 },
  { id: 'water_master', title: 'Water Master', description: 'Collect all Water-type Pokémon', points: 200 },
  { id: 'grass_master', title: 'Grass Master', description: 'Collect all Grass-type Pokémon', points: 200 },
  { id: 'electric_master', title: 'Electric Master', description: 'Collect all Electric-type Pokémon', points: 200 },
];

const initialState = {
  unlockedAchievements: [],
  totalPoints: 0,
  notifications: [],
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    unlockAchievement: (state, action) => {
      const achievementId = action.payload;
      const achievement = achievements.find(a => a.id === achievementId);
      
      if (achievement && !state.unlockedAchievements.find(a => a.id === achievementId)) {
        state.unlockedAchievements.push({
          ...achievement,
          unlockedAt: Date.now(),
        });
        state.totalPoints += achievement.points;
        state.notifications.push({
          id: Date.now(),
          type: 'achievement',
          title: `Achievement Unlocked: ${achievement.title}`,
          message: achievement.description,
          points: achievement.points,
        });
      }
    },
    
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  unlockAchievement,
  clearNotification,
  clearAllNotifications,
} = achievementsSlice.actions;

export { achievements };
export default achievementsSlice.reducer;

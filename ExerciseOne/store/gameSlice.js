import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  score: 0,
  level: 1,
  streak: 0,
  totalAnswered: 0,
  correctAnswers: 0,
  collectedCards: [],
  powerUps: {
    doubleScore: 0,
    timeFreeze: 0,
    hint: 0,
  },
  currentQuestion: 0,
  gameMode: 'classic', // classic, timed, survival
  difficulty: 'normal', // easy, normal, hard, expert
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const { isCorrect, timeBonus = 0 } = action.payload;
      state.totalAnswered += 1;
      
      if (isCorrect) {
        state.correctAnswers += 1;
        state.streak += 1;
        
        // Calculate score with bonuses
        let baseScore = 100;
        let streakBonus = Math.floor(state.streak / 3) * 50;
        let difficultyMultiplier = state.difficulty === 'easy' ? 0.8 : 
                                  state.difficulty === 'normal' ? 1 : 
                                  state.difficulty === 'hard' ? 1.5 : 2;
        
        state.score += Math.round((baseScore + streakBonus + timeBonus) * difficultyMultiplier);
        
        // Level up every 500 points
        const newLevel = Math.floor(state.score / 500) + 1;
        if (newLevel > state.level) {
          state.level = newLevel;
        }
      } else {
        state.streak = 0;
      }
    },
    
    collectCard: (state, action) => {
      const card = action.payload;
      const existingCard = state.collectedCards.find(c => c.id === card.id);
      if (!existingCard) {
        state.collectedCards.push({...card, collectedAt: Date.now()});
      }
    },
    
    usePowerUp: (state, action) => {
      const powerUpType = action.payload;
      if (state.powerUps[powerUpType] > 0) {
        state.powerUps[powerUpType] -= 1;
      }
    },
    
    earnPowerUp: (state, action) => {
      const powerUpType = action.payload;
      state.powerUps[powerUpType] += 1;
    },
    
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    
    resetGame: (state) => {
      state.score = 0;
      state.streak = 0;
      state.currentQuestion = 0;
      state.totalAnswered = 0;
      state.correctAnswers = 0;
    },
  },
});

export const {
  answerQuestion,
  collectCard,
  usePowerUp,
  earnPowerUp,
  setGameMode,
  setDifficulty,
  nextQuestion,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;

import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Animated,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { answerQuestion, collectCard, nextQuestion } from '../store/gameSlice';
import { unlockAchievement } from '../store/achievementsSlice';
import { quizQuestions, pokemonData } from '../data/gameData';

const { width } = Dimensions.get('window');

export default function QuizScreen({ navigation }) {
  const dispatch = useDispatch();
  const { 
    currentQuestion, 
    streak, 
    score, 
    difficulty, 
    powerUps 
  } = useSelector(state => state.game);
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [question, setQuestion] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [hintUsed, setHintUsed] = useState(false);
  const [doubleScoreActive, setDoubleScoreActive] = useState(false);
  
  const progressAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  useEffect(() => {
    loadQuestion();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        // Animate progress bar
        Animated.timing(progressAnimation, {
          toValue: timeLeft / (question?.timeLimit || 15),
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, showResult]);

  const loadQuestion = () => {
    const currentQ = quizQuestions[currentQuestion % quizQuestions.length];
    setQuestion(currentQ);
    setShuffledOptions(shuffleArray([...currentQ.options]));
    setTimeLeft(currentQ.timeLimit || 15);
    setSelectedAnswer(null);
    setShowResult(false);
    setHintUsed(false);
    setDoubleScoreActive(false);
    
    // Reset animations
    progressAnimation.setValue(1);
    scaleAnimation.setValue(1);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleAnswer = (option) => {
    if (showResult) return;
    
    setSelectedAnswer(option);
    const correct = option === question.answer;
    setIsCorrect(correct);
    setShowResult(true);

    // Haptic feedback
    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    // Calculate time bonus
    const timeBonus = timeLeft * 10;
    const finalScore = doubleScoreActive ? timeBonus * 2 : timeBonus;

    // Dispatch answer
    dispatch(answerQuestion({ 
      isCorrect: correct, 
      timeBonus: correct ? finalScore : 0 
    }));

    // Award card if correct
    if (correct && question.rewardCard) {
      const pokemon = pokemonData.find(p => p.id === question.rewardCard);
      if (pokemon) {
        dispatch(collectCard(pokemon));
      }
    }

    // Check for achievements
    checkAchievements(correct);

    // Animate result
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTimeUp = () => {
    setShowResult(true);
    setIsCorrect(false);
    dispatch(answerQuestion({ isCorrect: false }));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const checkAchievements = (correct) => {
    if (correct) {
      if (streak === 0) {
        dispatch(unlockAchievement('first_win'));
      }
      if (streak + 1 === 5) {
        dispatch(unlockAchievement('streak_5'));
      }
      if (streak + 1 === 10) {
        dispatch(unlockAchievement('streak_10'));
      }
      if (timeLeft >= question.timeLimit - 3) {
        dispatch(unlockAchievement('speed_demon'));
      }
    }
  };

  const nextQuestionHandler = () => {
    dispatch(nextQuestion());
    loadQuestion();
  };

  const usePowerUp = (type) => {
    if (powerUps[type] <= 0) {
      Alert.alert('Power-up Unavailable', 'You don\'t have this power-up available.');
      return;
    }

    switch (type) {
      case 'hint':
        if (!hintUsed) {
          useHint();
          setHintUsed(true);
        }
        break;
      case 'doubleScore':
        setDoubleScoreActive(true);
        break;
      case 'timeFreeze':
        setTimeLeft(timeLeft + 10);
        break;
    }
  };

  const useHint = () => {
    const correctAnswer = question.answer;
    const wrongOptions = shuffledOptions.filter(opt => opt !== correctAnswer);
    const optionsToRemove = wrongOptions.slice(0, 2);
    
    setShuffledOptions(prev => prev.filter(opt => !optionsToRemove.includes(opt)));
  };

  const getOptionStyle = (option) => {
    if (!showResult) {
      return [styles.optionButton, selectedAnswer === option && styles.selectedOption];
    }
    
    if (option === question.answer) {
      return [styles.optionButton, styles.correctOption];
    } else if (selectedAnswer === option && option !== question.answer) {
      return [styles.optionButton, styles.wrongOption];
    }
    
    return [styles.optionButton, styles.disabledOption];
  };

  const getProgressColor = () => {
    if (timeLeft > 10) return '#10B981';
    if (timeLeft > 5) return '#F59E0B';
    return '#EF4444';
  };

  if (!question) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading question...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.scoreText}>Score: {score.toLocaleString()}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { 
              width: progressAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: getProgressColor(),
            }
          ]} 
        />
      </View>

      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={[styles.timerText, { color: getProgressColor() }]}>
          {timeLeft}s
        </Text>
      </View>

      {/* Power-ups */}
      <View style={styles.powerUpsContainer}>
        <TouchableOpacity 
          style={[styles.powerUpButton, hintUsed && styles.powerUpUsed]}
          onPress={() => usePowerUp('hint')}
          disabled={hintUsed || showResult}
        >
          <Text style={styles.powerUpIcon}>💡</Text>
          <Text style={styles.powerUpCount}>{powerUps.hint}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.powerUpButton, doubleScoreActive && styles.powerUpActive]}
          onPress={() => usePowerUp('doubleScore')}
          disabled={doubleScoreActive || showResult}
        >
          <Text style={styles.powerUpIcon}>⭐</Text>
          <Text style={styles.powerUpCount}>{powerUps.doubleScore}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.powerUpButton}
          onPress={() => usePowerUp('timeFreeze')}
          disabled={showResult}
        >
          <Text style={styles.powerUpIcon}>❄️</Text>
          <Text style={styles.powerUpCount}>{powerUps.timeFreeze}</Text>
        </TouchableOpacity>
      </View>

      {/* Question */}
      <Animated.View style={[styles.questionContainer, { transform: [{ scale: scaleAnimation }] }]}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1}
        </Text>
        <Text style={styles.questionText}>{question.question}</Text>
        <Text style={styles.difficultyText}>
          Difficulty: {question.difficulty.toUpperCase()}
        </Text>
      </Animated.View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {shuffledOptions.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={getOptionStyle(option)}
            onPress={() => handleAnswer(option)}
            disabled={showResult}
          >
            <Text style={[
              styles.optionText,
              showResult && option === question.answer && styles.correctOptionText,
              showResult && selectedAnswer === option && option !== question.answer && styles.wrongOptionText,
            ]}>
              {String.fromCharCode(65 + index)}. {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Result */}
      {showResult && (
        <View style={styles.resultContainer}>
          <LinearGradient
            colors={isCorrect ? ['#10B981', '#059669'] : ['#EF4444', '#DC2626']}
            style={styles.resultCard}
          >
            <Text style={styles.resultIcon}>
              {isCorrect ? '🎉' : '❌'}
            </Text>
            <Text style={styles.resultText}>
              {isCorrect ? 'Correct!' : 'Wrong Answer'}
            </Text>
            {isCorrect && (
              <Text style={styles.bonusText}>
                +{doubleScoreActive ? timeLeft * 20 : timeLeft * 10} points
                {doubleScoreActive && ' (Double Score!)'}
              </Text>
            )}
            
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={nextQuestionHandler}
            >
              <Text style={styles.nextButtonText}>Next Question</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    color: '#60A5FA',
    fontSize: 16,
  },
  scoreText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#374151',
    marginHorizontal: 20,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  powerUpsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  powerUpButton: {
    backgroundColor: '#1F2937',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: '#374151',
  },
  powerUpActive: {
    borderColor: '#10B981',
    backgroundColor: '#064E3B',
  },
  powerUpUsed: {
    opacity: 0.5,
  },
  powerUpIcon: {
    fontSize: 16,
  },
  powerUpCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    color: '#F9FAFB',
    fontSize: 10,
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    textAlign: 'center',
  },
  questionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  questionNumber: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  questionText: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 30,
    marginBottom: 8,
  },
  difficultyText: {
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: 'bold',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  optionButton: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#374151',
  },
  selectedOption: {
    borderColor: '#60A5FA',
  },
  correctOption: {
    borderColor: '#10B981',
    backgroundColor: '#064E3B',
  },
  wrongOption: {
    borderColor: '#EF4444',
    backgroundColor: '#7F1D1D',
  },
  disabledOption: {
    opacity: 0.6,
  },
  optionText: {
    color: '#F9FAFB',
    fontSize: 16,
  },
  correctOptionText: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  wrongOptionText: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  resultIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  resultText: {
    color: '#F9FAFB',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bonusText: {
    color: '#F9FAFB',
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.9,
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  nextButtonText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#F9FAFB',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
});

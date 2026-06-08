import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setGameMode, setDifficulty } from '../store/gameSlice';

export default function GameModeScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { mode } = route.params;

  const difficulties = [
    { 
      id: 'easy', 
      name: 'Easy', 
      description: 'Perfect for beginners', 
      multiplier: '0.8x',
      color: '#10B981' 
    },
    { 
      id: 'normal', 
      name: 'Normal', 
      description: 'Standard experience', 
      multiplier: '1x',
      color: '#3B82F6' 
    },
    { 
      id: 'hard', 
      name: 'Hard', 
      description: 'For experienced trainers', 
      multiplier: '1.5x',
      color: '#F59E0B' 
    },
    { 
      id: 'expert', 
      name: 'Expert', 
      description: 'Ultimate challenge', 
      multiplier: '2x',
      color: '#EF4444' 
    },
  ];

  const startGame = (difficulty) => {
    dispatch(setGameMode(mode.id));
    dispatch(setDifficulty(difficulty));
    navigation.navigate('Quiz');
  };

  const getModeIcon = () => {
    switch (mode.id) {
      case 'classic': return '🎲';
      case 'timed': return '⏰';
      case 'survival': return '⚔️';
      case 'multiplayer': return '⚡';
      default: return '🎮';
    }
  };

  const getModeDescription = () => {
    switch (mode.id) {
      case 'classic':
        return 'Traditional quiz mode with no time pressure. Perfect for learning and collecting cards at your own pace.';
      case 'timed':
        return 'Race against the clock! Answer questions quickly to earn bonus points and time extensions.';
      case 'survival':
        return 'How long can you last? One wrong answer and it\'s game over. Test your Pokémon knowledge to the limit.';
      case 'multiplayer':
        return 'Challenge friends in real-time battles. First to answer correctly wins the round!';
      default:
        return 'Select your difficulty and start playing!';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1F2937', mode.color || '#3B82F6']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <View style={styles.modeInfo}>
          <Text style={styles.modeIcon}>{getModeIcon()}</Text>
          <Text style={styles.modeTitle}>{mode.title}</Text>
          <Text style={styles.modeDescription}>{getModeDescription()}</Text>
        </View>
      </LinearGradient>

      {/* Mode Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Game Features</Text>
        <View style={styles.featuresContainer}>
          {mode.id === 'classic' && (
            <>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🎯</Text>
                <Text style={styles.featureText}>No time pressure</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📚</Text>
                <Text style={styles.featureText}>Collect Pokémon cards</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🏆</Text>
                <Text style={styles.featureText}>Unlock achievements</Text>
              </View>
            </>
          )}
          
          {mode.id === 'timed' && (
            <>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>⚡</Text>
                <Text style={styles.featureText}>Speed bonuses</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>⏰</Text>
                <Text style={styles.featureText}>Time pressure</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🔥</Text>
                <Text style={styles.featureText}>Streak multipliers</Text>
              </View>
            </>
          )}
          
          {mode.id === 'survival' && (
            <>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>💀</Text>
                <Text style={styles.featureText}>One life only</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📈</Text>
                <Text style={styles.featureText}>Increasing difficulty</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🏅</Text>
                <Text style={styles.featureText}>Leaderboard ranking</Text>
              </View>
            </>
          )}
          
          {mode.id === 'multiplayer' && (
            <>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>👥</Text>
                <Text style={styles.featureText}>Real-time battles</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🚀</Text>
                <Text style={styles.featureText}>Power-ups available</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🎁</Text>
                <Text style={styles.featureText}>Special rewards</Text>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Difficulty Selection */}
      <View style={styles.difficultySection}>
        <Text style={styles.sectionTitle}>Select Difficulty</Text>
        <View style={styles.difficultiesContainer}>
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty.id}
              style={[styles.difficultyCard, { borderColor: difficulty.color }]}
              onPress={() => startGame(difficulty.id)}
            >
              <LinearGradient
                colors={[difficulty.color, difficulty.color + '20']}
                style={styles.difficultyGradient}
              >
                <View style={styles.difficultyHeader}>
                  <Text style={[styles.difficultyName, { color: difficulty.color }]}>
                    {difficulty.name}
                  </Text>
                  <Text style={[styles.difficultyMultiplier, { color: difficulty.color }]}>
                    {difficulty.multiplier}
                  </Text>
                </View>
                <Text style={styles.difficultyDescription}>
                  {difficulty.description}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Start */}
      <View style={styles.quickStartSection}>
        <TouchableOpacity 
          style={styles.quickStartButton}
          onPress={() => startGame('normal')}
        >
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            style={styles.quickStartGradient}
          >
            <Text style={styles.quickStartIcon}>🚀</Text>
            <Text style={styles.quickStartText}>Quick Start (Normal)</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '500',
  },
  modeInfo: {
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  modeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 12,
  },
  modeDescription: {
    fontSize: 16,
    color: '#F9FAFB',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  featuresContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 28,
  },
  featureText: {
    fontSize: 16,
    color: '#F9FAFB',
    flex: 1,
  },
  difficultySection: {
    paddingHorizontal: 20,
    marginTop: 24,
    flex: 1,
  },
  difficultiesContainer: {
    flex: 1,
  },
  difficultyCard: {
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  difficultyGradient: {
    padding: 20,
  },
  difficultyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  difficultyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  difficultyMultiplier: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  difficultyDescription: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  quickStartSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  quickStartButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  quickStartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  quickStartIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  quickStartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
});

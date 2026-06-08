import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { score, level, streak, collectedCards } = useSelector(state => state.game);
  const { username } = useSelector(state => state.user);
  const { unlockedAchievements } = useSelector(state => state.achievements);

  const stats = [
    { label: 'Level', value: level, icon: '⭐' },
    { label: 'Score', value: score.toLocaleString(), icon: '🎯' },
    { label: 'Streak', value: streak, icon: '🔥' },
    { label: 'Cards', value: collectedCards.length, icon: '📚' },
  ];

  const gameModesData = [
    {
      id: 'classic',
      title: 'Classic Quiz',
      description: 'Traditional quiz mode',
      icon: '🎲',
      color: '#3B82F6',
    },
    {
      id: 'timed',
      title: 'Timed Challenge',
      description: 'Race against time',
      icon: '⏰',
      color: '#F59E0B',
    },
    {
      id: 'survival',
      title: 'Survival Mode',
      description: 'How long can you last?',
      icon: '⚔️',
      color: '#EF4444',
    },
    {
      id: 'multiplayer',
      title: 'Battle Arena',
      description: 'Challenge friends',
      icon: '⚡',
      color: '#8B5CF6',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#1F2937', '#3B82F6']}
          style={styles.header}
        >
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.usernameText}>{username || 'Trainer'}! ⚡</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <TouchableOpacity 
            style={styles.quickPlayButton}
            onPress={() => navigation.navigate('Quiz')}
          >
            <LinearGradient
              colors={['#8B5CF6', '#3B82F6']}
              style={styles.quickPlayGradient}
            >
              <Text style={styles.quickPlayIcon}>🚀</Text>
              <Text style={styles.quickPlayText}>Start Quiz</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Game Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Modes</Text>
          <View style={styles.gameModesGrid}>
            {gameModesData.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                style={[styles.gameModeCard, { borderColor: mode.color }]}
                onPress={() => navigation.navigate('GameMode', { mode })}
              >
                <Text style={[styles.gameModeIcon, { color: mode.color }]}>
                  {mode.icon}
                </Text>
                <Text style={styles.gameModeTitle}>{mode.title}</Text>
                <Text style={styles.gameModeDescription}>{mode.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {unlockedAchievements.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {unlockedAchievements.slice(-3).map((achievement) => (
                <View key={achievement.id} style={styles.achievementCard}>
                  <Text style={styles.achievementIcon}>🏆</Text>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementPoints}>+{achievement.points} pts</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noAchievements}>
              <Text style={styles.noAchievementsText}>
                No achievements yet. Start playing to unlock rewards!
              </Text>
            </View>
          )}
        </View>

        {/* Daily Challenge */}
        <View style={styles.section}>
          <View style={styles.dailyChallengeCard}>
            <LinearGradient
              colors={['#F59E0B', '#EF4444']}
              style={styles.dailyChallengeGradient}
            >
              <Text style={styles.dailyChallengeIcon}>🎯</Text>
              <View style={styles.dailyChallengeContent}>
                <Text style={styles.dailyChallengeTitle}>Daily Challenge</Text>
                <Text style={styles.dailyChallengeDescription}>
                  Answer 10 questions correctly to earn bonus rewards!
                </Text>
              </View>
              <TouchableOpacity style={styles.dailyChallengeButton}>
                <Text style={styles.dailyChallengeButtonText}>Play</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
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
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  profileButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#60A5FA',
    fontSize: 16,
  },
  quickPlayButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickPlayGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  quickPlayIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  quickPlayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  gameModesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameModeCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  gameModeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  gameModeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F9FAFB',
    textAlign: 'center',
    marginBottom: 4,
  },
  gameModeDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  achievementCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F9FAFB',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementPoints: {
    fontSize: 11,
    color: '#10B981',
  },
  noAchievements: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  noAchievementsText: {
    color: '#9CA3AF',
    textAlign: 'center',
  },
  dailyChallengeCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  dailyChallengeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  dailyChallengeIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  dailyChallengeContent: {
    flex: 1,
  },
  dailyChallengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  dailyChallengeDescription: {
    fontSize: 14,
    color: '#F9FAFB',
    opacity: 0.9,
  },
  dailyChallengeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  dailyChallengeButtonText: {
    color: '#F9FAFB',
    fontWeight: 'bold',
  },
});

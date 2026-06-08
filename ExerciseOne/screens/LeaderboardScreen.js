import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock leaderboard data - in a real app, this would come from a backend
const leaderboardData = [
  { id: '1', name: 'PokeMaster2024', score: 15420, level: 12, avatar: '👑' },
  { id: '2', name: 'AshKetchum', score: 14850, level: 11, avatar: '⚡' },
  { id: '3', name: 'MistyWater', score: 14200, level: 11, avatar: '💧' },
  { id: '4', name: 'BrockRock', score: 13900, level: 10, avatar: '🗿' },
  { id: '5', name: 'GaryOak', score: 13650, level: 10, avatar: '🌿' },
  { id: '6', name: 'PikachuFan', score: 12800, level: 9, avatar: '⚡' },
  { id: '7', name: 'TeamRocket', score: 12400, level: 9, avatar: '🚀' },
  { id: '8', name: 'Eevee_Lover', score: 11900, level: 8, avatar: '🦊' },
  { id: '9', name: 'DragonMaster', score: 11500, level: 8, avatar: '🐉' },
  { id: '10', name: 'FireTrainer', score: 11200, level: 8, avatar: '🔥' },
];

export default function LeaderboardScreen() {
  const renderLeaderboardItem = ({ item, index }) => {
    const getRankStyle = () => {
      if (index === 0) return styles.firstPlace;
      if (index === 1) return styles.secondPlace;
      if (index === 2) return styles.thirdPlace;
      return styles.regularPlace;
    };

    const getRankIcon = () => {
      if (index === 0) return '🥇';
      if (index === 1) return '🥈';
      if (index === 2) return '🥉';
      return `${index + 1}`;
    };

    return (
      <View style={[styles.leaderboardItem, getRankStyle()]}>
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>{getRankIcon()}</Text>
        </View>
        
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{item.name}</Text>
          <View style={styles.playerStats}>
            <Text style={styles.levelText}>Level {item.level}</Text>
            <Text style={styles.scoreText}>{item.score.toLocaleString()} pts</Text>
          </View>
        </View>
        
        {index < 3 && (
          <View style={styles.crownContainer}>
            <Text style={styles.crownIcon}>👑</Text>
          </View>
        )}
      </View>
    );
  };

  const timeRanges = [
    { id: 'daily', label: 'Today', active: false },
    { id: 'weekly', label: 'This Week', active: true },
    { id: 'monthly', label: 'This Month', active: false },
    { id: 'all', label: 'All Time', active: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1F2937', '#3B82F6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🏆 Leaderboard</Text>
        <Text style={styles.headerSubtitle}>Top Pokémon Masters</Text>
      </LinearGradient>

      {/* Time Range Selector */}
      <View style={styles.timeRangeContainer}>
        <FlatList
          horizontal
          data={timeRanges}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeRangeButton,
                item.active && styles.timeRangeButtonActive
              ]}
            >
              <Text style={[
                styles.timeRangeText,
                item.active && styles.timeRangeTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Top 3 Podium */}
      <View style={styles.podiumContainer}>
        <View style={styles.podium}>
          {/* Second Place */}
          <View style={[styles.podiumPlace, styles.secondPodium]}>
            <Text style={styles.podiumAvatar}>{leaderboardData[1].avatar}</Text>
            <Text style={styles.podiumName}>{leaderboardData[1].name}</Text>
            <Text style={styles.podiumScore}>{leaderboardData[1].score.toLocaleString()}</Text>
            <View style={styles.podiumBase}>
              <Text style={styles.podiumRank}>2</Text>
            </View>
          </View>

          {/* First Place */}
          <View style={[styles.podiumPlace, styles.firstPodium]}>
            <Text style={styles.podiumCrown}>👑</Text>
            <Text style={styles.podiumAvatar}>{leaderboardData[0].avatar}</Text>
            <Text style={styles.podiumName}>{leaderboardData[0].name}</Text>
            <Text style={styles.podiumScore}>{leaderboardData[0].score.toLocaleString()}</Text>
            <View style={styles.podiumBase}>
              <Text style={styles.podiumRank}>1</Text>
            </View>
          </View>

          {/* Third Place */}
          <View style={[styles.podiumPlace, styles.thirdPodium]}>
            <Text style={styles.podiumAvatar}>{leaderboardData[2].avatar}</Text>
            <Text style={styles.podiumName}>{leaderboardData[2].name}</Text>
            <Text style={styles.podiumScore}>{leaderboardData[2].score.toLocaleString()}</Text>
            <View style={styles.podiumBase}>
              <Text style={styles.podiumRank}>3</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Rest of Leaderboard */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>All Rankings</Text>
        <FlatList
          data={leaderboardData.slice(3)}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => renderLeaderboardItem({ item, index: index + 3 })}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Your Rank */}
      <View style={styles.yourRankContainer}>
        <LinearGradient
          colors={['#8B5CF6', '#3B82F6']}
          style={styles.yourRankGradient}
        >
          <Text style={styles.yourRankLabel}>Your Rank</Text>
          <View style={styles.yourRankInfo}>
            <Text style={styles.yourRankPosition}>#47</Text>
            <View style={styles.yourRankDetails}>
              <Text style={styles.yourRankName}>You</Text>
              <Text style={styles.yourRankScore}>8,420 pts</Text>
            </View>
          </View>
        </LinearGradient>
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
    paddingVertical: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#F9FAFB',
    opacity: 0.8,
  },
  timeRangeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  timeRangeButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  timeRangeButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#60A5FA',
  },
  timeRangeText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  timeRangeTextActive: {
    color: '#F9FAFB',
  },
  podiumContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 200,
  },
  podiumPlace: {
    alignItems: 'center',
    marginHorizontal: 8,
    flex: 1,
  },
  firstPodium: {},
  secondPodium: {},
  thirdPodium: {},
  podiumCrown: {
    fontSize: 24,
    marginBottom: 8,
  },
  podiumAvatar: {
    fontSize: 32,
    marginBottom: 8,
  },
  podiumName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F9FAFB',
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumScore: {
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  podiumBase: {
    backgroundColor: '#374151',
    width: '100%',
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  podiumRank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 100,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  firstPlace: {
    borderColor: '#F59E0B',
    backgroundColor: '#451A03',
  },
  secondPlace: {
    borderColor: '#9CA3AF',
    backgroundColor: '#1F2937',
  },
  thirdPlace: {
    borderColor: '#CD7C2F',
    backgroundColor: '#451A03',
  },
  regularPlace: {},
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#374151',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  playerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelText: {
    fontSize: 12,
    color: '#60A5FA',
    fontWeight: '500',
  },
  scoreText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  crownContainer: {
    marginLeft: 8,
  },
  crownIcon: {
    fontSize: 20,
  },
  yourRankContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  yourRankGradient: {
    borderRadius: 16,
    padding: 16,
  },
  yourRankLabel: {
    fontSize: 14,
    color: '#F9FAFB',
    opacity: 0.8,
    marginBottom: 8,
  },
  yourRankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yourRankPosition: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginRight: 16,
  },
  yourRankDetails: {
    flex: 1,
  },
  yourRankName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 2,
  },
  yourRankScore: {
    fontSize: 14,
    color: '#F9FAFB',
    opacity: 0.8,
  },
});

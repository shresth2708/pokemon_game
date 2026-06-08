import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setUserProfile } from '../store/userSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { 
    score, 
    level, 
    streak, 
    collectedCards, 
    totalAnswered, 
    correctAnswers 
  } = useSelector(state => state.game);
  
  const { 
    username, 
    statistics, 
    joinDate 
  } = useSelector(state => state.user);
  
  const { 
    unlockedAchievements, 
    totalPoints 
  } = useSelector(state => state.achievements);

  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username || '');

  const handleSaveProfile = () => {
    if (tempUsername.trim()) {
      dispatch(setUserProfile({ username: tempUsername.trim() }));
      setIsEditing(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAccuracy = () => {
    if (totalAnswered === 0) return 0;
    return Math.round((correctAnswers / totalAnswered) * 100);
  };

  const getTypeDistribution = () => {
    const types = {};
    collectedCards.forEach(card => {
      types[card.type] = (types[card.type] || 0) + 1;
    });
    return types;
  };

  const getExperienceToNext = () => {
    const currentLevelExp = (level - 1) * 500;
    const nextLevelExp = level * 500;
    const progress = (score - currentLevelExp) / (nextLevelExp - currentLevelExp);
    return Math.max(0, Math.min(1, progress));
  };

  const typeDistribution = getTypeDistribution();
  const accuracy = getAccuracy();

  const stats = [
    { label: 'Current Score', value: score.toLocaleString(), icon: '🎯', color: '#3B82F6' },
    { label: 'Best Streak', value: streak, icon: '🔥', color: '#EF4444' },
    { label: 'Accuracy', value: `${accuracy}%`, icon: '🎯', color: '#10B981' },
    { label: 'Cards Collected', value: collectedCards.length, icon: '📚', color: '#8B5CF6' },
    { label: 'Achievement Points', value: totalPoints, icon: '🏆', color: '#F59E0B' },
    { label: 'Games Played', value: Math.ceil(totalAnswered / 10), icon: '🎮', color: '#06B6D4' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#1F2937', '#3B82F6']}
          style={styles.profileHeader}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>✏️</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            {isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={tempUsername}
                  onChangeText={setTempUsername}
                  placeholder="Enter username"
                  placeholderTextColor="#9CA3AF"
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={handleSaveProfile}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => {
                      setIsEditing(false);
                      setTempUsername(username || '');
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>{username || 'Pokémon Trainer'}</Text>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <Text style={styles.joinDate}>Joined {formatDate(joinDate)}</Text>
            
            {/* Level Progress */}
            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>Level {level}</Text>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${getExperienceToNext() * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.expText}>
                {score % 500} / 500 XP
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                  <Text style={styles.statIconText}>{stat.icon}</Text>
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Type Distribution */}
        <View style={styles.typeSection}>
          <Text style={styles.sectionTitle}>Collection by Type</Text>
          {Object.keys(typeDistribution).length > 0 ? (
            <View style={styles.typeGrid}>
              {Object.entries(typeDistribution).map(([type, count]) => (
                <View key={type} style={styles.typeCard}>
                  <Text style={styles.typeEmoji}>
                    {type === 'Fire' ? '🔥' : 
                     type === 'Water' ? '💧' : 
                     type === 'Grass' ? '🌱' : 
                     type === 'Electric' ? '⚡' : '❓'}
                  </Text>
                  <Text style={styles.typeName}>{type}</Text>
                  <Text style={styles.typeCount}>{count} cards</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyTypeContainer}>
              <Text style={styles.emptyTypeText}>
                No cards collected yet. Start playing to build your collection!
              </Text>
            </View>
          )}
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <Text style={styles.achievementCount}>
              {unlockedAchievements.length} unlocked
            </Text>
          </View>
          
          {unlockedAchievements.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {unlockedAchievements.slice(-5).map((achievement) => (
                <View key={achievement.id} style={styles.achievementCard}>
                  <Text style={styles.achievementIcon}>🏆</Text>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementPoints}>+{achievement.points} pts</Text>
                  <Text style={styles.achievementDate}>
                    {formatDate(achievement.unlockedAt)}
                  </Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyAchievements}>
              <Text style={styles.emptyAchievementsText}>
                No achievements yet. Keep playing to unlock rewards!
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#8B5CF6', '#3B82F6']}
              style={styles.actionGradient}
            >
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionText}>Detailed Stats</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.actionGradient}
            >
              <Text style={styles.actionIcon}>📤</Text>
              <Text style={styles.actionText}>Share Profile</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  profileHeader: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F9FAFB',
  },
  avatarText: {
    fontSize: 32,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarIcon: {
    fontSize: 14,
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  editContainer: {
    width: '100%',
    alignItems: 'center',
  },
  editInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '80%',
    marginBottom: 12,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#F9FAFB',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: '#F9FAFB',
    fontWeight: 'bold',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginRight: 12,
  },
  editButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  editButtonText: {
    color: '#F9FAFB',
    fontSize: 12,
  },
  joinDate: {
    fontSize: 14,
    color: '#F9FAFB',
    opacity: 0.8,
    marginBottom: 20,
  },
  levelContainer: {
    alignItems: 'center',
    width: '100%',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 8,
  },
  progressBarContainer: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  expText: {
    fontSize: 12,
    color: '#F9FAFB',
    opacity: 0.8,
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIconText: {
    fontSize: 18,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  typeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  typeEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  typeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  typeCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyTypeContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  emptyTypeText: {
    color: '#9CA3AF',
    textAlign: 'center',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
    minWidth: 140,
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
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  emptyAchievements: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  emptyAchievementsText: {
    color: '#9CA3AF',
    textAlign: 'center',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  bottomPadding: {
    height: 100,
  },
});

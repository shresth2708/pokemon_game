import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { unlockAchievement } from '../store/achievementsSlice';
import { achievements } from '../store/achievementsSlice';

export default function AchievementsScreen() {
  const { unlockedAchievements, totalPoints } = useSelector(state => state.achievements);
  const { collectedCards, streak } = useSelector(state => state.game);

  const categories = [
    { id: 'progress', name: 'Progress', icon: '📈' },
    { id: 'collection', name: 'Collection', icon: '📚' },
    { id: 'skill', name: 'Skill', icon: '🎯' },
    { id: 'special', name: 'Special', icon: '⭐' },
  ];

  const getAchievementsByCategory = (category) => {
    const categoryMap = {
      progress: ['first_win', 'streak_5', 'streak_10'],
      collection: ['collector', 'master_collector', 'fire_master', 'water_master', 'grass_master', 'electric_master'],
      skill: ['speed_demon', 'perfectionist'],
      special: []
    };
    
    return achievements.filter(achievement => 
      categoryMap[category]?.includes(achievement.id)
    );
  };

  const isAchievementUnlocked = (achievementId) => {
    return unlockedAchievements.some(unlocked => unlocked.id === achievementId);
  };

  const getProgress = (achievementId) => {
    switch (achievementId) {
      case 'first_win':
        return streak > 0 ? 100 : 0;
      case 'streak_5':
        return Math.min(100, (streak / 5) * 100);
      case 'streak_10':
        return Math.min(100, (streak / 10) * 100);
      case 'collector':
        return Math.min(100, (collectedCards.length / 10) * 100);
      case 'master_collector':
        return Math.min(100, (collectedCards.length / 25) * 100);
      case 'fire_master':
        const fireCards = collectedCards.filter(c => c.type === 'Fire').length;
        return Math.min(100, (fireCards / 3) * 100);
      case 'water_master':
        const waterCards = collectedCards.filter(c => c.type === 'Water').length;
        return Math.min(100, (waterCards / 3) * 100);
      case 'grass_master':
        const grassCards = collectedCards.filter(c => c.type === 'Grass').length;
        return Math.min(100, (grassCards / 3) * 100);
      case 'electric_master':
        const electricCards = collectedCards.filter(c => c.type === 'Electric').length;
        return Math.min(100, (electricCards / 3) * 100);
      default:
        return 0;
    }
  };

  const renderAchievement = (achievement) => {
    const isUnlocked = isAchievementUnlocked(achievement.id);
    const progress = getProgress(achievement.id);
    
    return (
      <View key={achievement.id} style={[
        styles.achievementCard,
        isUnlocked && styles.achievementCardUnlocked
      ]}>
        <View style={styles.achievementHeader}>
          <View style={[
            styles.achievementIcon,
            isUnlocked && styles.achievementIconUnlocked
          ]}>
            <Text style={styles.achievementIconText}>
              {isUnlocked ? '🏆' : '🔒'}
            </Text>
          </View>
          <View style={styles.achievementInfo}>
            <Text style={[
              styles.achievementTitle,
              isUnlocked && styles.achievementTitleUnlocked
            ]}>
              {achievement.title}
            </Text>
            <Text style={styles.achievementDescription}>
              {achievement.description}
            </Text>
          </View>
          <View style={styles.achievementPoints}>
            <Text style={[
              styles.pointsText,
              isUnlocked && styles.pointsTextUnlocked
            ]}>
              {achievement.points}
            </Text>
            <Text style={styles.pointsLabel}>pts</Text>
          </View>
        </View>
        
        {!isUnlocked && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[
                styles.progressBarFill,
                { width: `${progress}%` }
              ]} />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progress)}%
            </Text>
          </View>
        )}
        
        {isUnlocked && (
          <View style={styles.unlockedBadge}>
            <Text style={styles.unlockedText}>✓ Unlocked</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1F2937', '#8B5CF6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🏆 Achievements</Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{unlockedAchievements.length}</Text>
            <Text style={styles.statLabel}>Unlocked</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{achievements.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Overview */}
        <View style={styles.overviewSection}>
          <LinearGradient
            colors={['#F59E0B', '#EF4444']}
            style={styles.overviewCard}
          >
            <Text style={styles.overviewTitle}>Achievement Progress</Text>
            <View style={styles.overviewProgress}>
              <View style={styles.overviewProgressBg}>
                <View style={[
                  styles.overviewProgressFill,
                  { width: `${(unlockedAchievements.length / achievements.length) * 100}%` }
                ]} />
              </View>
              <Text style={styles.overviewPercentage}>
                {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Achievement Categories */}
        {categories.map(category => {
          const categoryAchievements = getAchievementsByCategory(category.id);
          const unlockedCount = categoryAchievements.filter(a => 
            isAchievementUnlocked(a.id)
          ).length;

          return (
            <View key={category.id} style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTitleContainer}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryTitle}>{category.name}</Text>
                </View>
                <Text style={styles.categoryProgress}>
                  {unlockedCount}/{categoryAchievements.length}
                </Text>
              </View>
              
              <View style={styles.achievementsList}>
                {categoryAchievements.map(renderAchievement)}
              </View>
            </View>
          );
        })}

        {/* Recent Achievements */}
        {unlockedAchievements.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>Recently Unlocked</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {unlockedAchievements.slice(-5).reverse().map((achievement) => (
                <View key={achievement.id} style={styles.recentCard}>
                  <Text style={styles.recentIcon}>🏆</Text>
                  <Text style={styles.recentName}>{achievement.title}</Text>
                  <Text style={styles.recentPoints}>+{achievement.points} pts</Text>
                  <Text style={styles.recentDate}>
                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#F9FAFB',
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  overviewSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  overviewCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  overviewProgress: {
    width: '100%',
    alignItems: 'center',
  },
  overviewProgressBg: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  overviewProgressFill: {
    height: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
  },
  overviewPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  categorySection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  categoryProgress: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementCardUnlocked: {
    borderColor: '#10B981',
    backgroundColor: '#064E3B',
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#374151',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementIconUnlocked: {
    backgroundColor: '#10B981',
  },
  achievementIconText: {
    fontSize: 20,
  },
  achievementInfo: {
    flex: 1,
    marginRight: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  achievementTitleUnlocked: {
    color: '#F9FAFB',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  achievementPoints: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  pointsTextUnlocked: {
    color: '#10B981',
  },
  pointsLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingLeft: 60,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    minWidth: 35,
  },
  unlockedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    marginLeft: 60,
  },
  unlockedText: {
    fontSize: 12,
    color: '#F9FAFB',
    fontWeight: 'bold',
  },
  recentSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  recentCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  recentIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  recentName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F9FAFB',
    textAlign: 'center',
    marginBottom: 4,
  },
  recentPoints: {
    fontSize: 11,
    color: '#10B981',
    marginBottom: 4,
  },
  recentDate: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  bottomPadding: {
    height: 100,
  },
});

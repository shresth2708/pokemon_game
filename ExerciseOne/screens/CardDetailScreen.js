import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CardDetailScreen({ route, navigation }) {
  const { card } = route.params;

  const getTypeColor = (type) => {
    const colors = {
      fire: ['#FF5733', '#FF8C42'],
      water: ['#6493EA', '#4FC3F7'],
      grass: ['#66CC66', '#81C784'],
      electric: ['#FFD700', '#FFF176'],
      default: ['#9CA3AF', '#6B7280'],
    };
    return colors[type.toLowerCase()] || colors.default;
  };

  const getRarityColor = (rarity) => {
    const colors = {
      common: '#9CA3AF',
      uncommon: '#10B981',
      rare: '#3B82F6',
      epic: '#8B5CF6',
      legendary: '#F59E0B',
    };
    return colors[rarity] || colors.common;
  };

  const statBars = [
    { label: 'HP', value: card.hp, max: 100, color: '#EF4444' },
    { label: 'Attack', value: card.attack, max: 100, color: '#F59E0B' },
    { label: 'Defense', value: card.defense, max: 100, color: '#3B82F6' },
    { label: 'Speed', value: card.speed, max: 100, color: '#10B981' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={getTypeColor(card.type)}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          <View style={styles.cardHeader}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardCategory}>{card.category}</Text>
            
            <View style={styles.badgeContainer}>
              <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(card.rarity) }]}>
                <Text style={styles.rarityText}>{card.rarity?.toUpperCase()}</Text>
              </View>
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{card.type}</Text>
              </View>
            </View>
          </View>
          
          <Image source={card.image} style={styles.cardImage} resizeMode="contain" />
        </LinearGradient>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{card.description}</Text>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stats</Text>
          <View style={styles.statsContainer}>
            {statBars.map((stat, index) => (
              <View key={index} style={styles.statRow}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <View style={styles.statBarContainer}>
                  <View style={styles.statBarBackground}>
                    <View 
                      style={[
                        styles.statBarFill,
                        { 
                          width: `${(stat.value / stat.max) * 100}%`,
                          backgroundColor: stat.color 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Moves */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Moves</Text>
          <View style={styles.movesContainer}>
            {card.moves.map((move, index) => (
              <View key={index} style={styles.moveCard}>
                <Text style={styles.moveName}>{move}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Weaknesses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weaknesses</Text>
          <View style={styles.weaknessesContainer}>
            {card.weaknesses.map((weakness, index) => (
              <View key={index} style={styles.weaknessCard}>
                <Text style={styles.weaknessText}>{weakness}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Card Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Evolution Stage:</Text>
              <Text style={styles.infoValue}>Stage {card.evolutionStage}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type:</Text>
              <Text style={styles.infoValue}>{card.type}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Rarity:</Text>
              <Text style={[styles.infoValue, { color: getRarityColor(card.rarity) }]}>
                {card.rarity?.charAt(0).toUpperCase() + card.rarity?.slice(1)}
              </Text>
            </View>
            {card.collectedAt && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Collected:</Text>
                <Text style={styles.infoValue}>
                  {new Date(card.collectedAt).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#8B5CF6', '#3B82F6']}
            style={styles.actionGradient}
          >
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionText}>Share Card</Text>
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
    paddingBottom: 40,
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
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardCategory: {
    fontSize: 16,
    color: '#F9FAFB',
    opacity: 0.9,
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  rarityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  rarityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  typeBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  cardImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#D1D5DB',
    lineHeight: 24,
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statsContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F9FAFB',
    width: 60,
  },
  statBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  statBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  statBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F9FAFB',
    minWidth: 30,
    textAlign: 'right',
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moveCard: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  moveName: {
    fontSize: 14,
    color: '#F9FAFB',
    fontWeight: '500',
  },
  weaknessesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  weaknessCard: {
    backgroundColor: '#7F1D1D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  weaknessText: {
    fontSize: 14,
    color: '#FCA5A5',
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F9FAFB',
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#111827',
  },
  actionButton: {
    borderRadius: 24,
    overflow: 'hidden',
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

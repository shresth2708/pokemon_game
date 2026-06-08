import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CollectionScreen({ navigation }) {
  const { collectedCards } = useSelector(state => state.game);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // name, type, rarity, date

  const filters = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'fire', label: 'Fire', icon: '🔥' },
    { id: 'water', label: 'Water', icon: '💧' },
    { id: 'grass', label: 'Grass', icon: '🌱' },
    { id: 'electric', label: 'Electric', icon: '⚡' },
  ];

  const sortOptions = [
    { id: 'name', label: 'Name' },
    { id: 'type', label: 'Type' },
    { id: 'rarity', label: 'Rarity' },
    { id: 'date', label: 'Date Collected' },
  ];

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

  const filteredAndSortedCards = collectedCards
    .filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || 
        card.type.toLowerCase() === selectedFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'rarity':
          const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
          return (rarityOrder[b.rarity] || 1) - (rarityOrder[a.rarity] || 1);
        case 'date':
          return (b.collectedAt || 0) - (a.collectedAt || 0);
        default:
          return 0;
      }
    });

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('CardDetail', { card: item })}
    >
      <LinearGradient
        colors={getTypeColor(item.type)}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(item.rarity) }]}>
            <Text style={styles.rarityText}>{item.rarity?.toUpperCase()}</Text>
          </View>
        </View>
        
        <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
        
        <View style={styles.cardFooter}>
          <View style={styles.cardStats}>
            <Text style={styles.statText}>HP: {item.hp}</Text>
            <Text style={styles.statText}>ATK: {item.attack}</Text>
          </View>
          <Text style={styles.cardType}>{item.type}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Collection</Text>
        <Text style={styles.cardCount}>{collectedCards.length} Cards</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Pokémon..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={filters}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === item.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(item.id)}
            >
              <Text style={styles.filterIcon}>{item.icon}</Text>
              <Text style={[
                styles.filterText,
                selectedFilter === item.id && styles.filterTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <FlatList
          horizontal
          data={sortOptions}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === item.id && styles.sortButtonActive
              ]}
              onPress={() => setSortBy(item.id)}
            >
              <Text style={[
                styles.sortText,
                sortBy === item.id && styles.sortTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Cards Grid */}
      {filteredAndSortedCards.length > 0 ? (
        <FlatList
          data={filteredAndSortedCards}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderCard}
          contentContainerStyle={styles.cardsGrid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>No Cards Found</Text>
          <Text style={styles.emptyDescription}>
            {collectedCards.length === 0 
              ? "Start playing quizzes to collect your first Pokémon cards!"
              : "Try adjusting your search or filter criteria."
            }
          </Text>
          {collectedCards.length === 0 && (
            <TouchableOpacity 
              style={styles.startPlayingButton}
              onPress={() => navigation.navigate('Quiz')}
            >
              <LinearGradient
                colors={['#8B5CF6', '#3B82F6']}
                style={styles.startPlayingGradient}
              >
                <Text style={styles.startPlayingText}>Start Playing</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Collection Stats */}
      {collectedCards.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{collectedCards.length}</Text>
            <Text style={styles.statLabel}>Total Cards</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {new Set(collectedCards.map(c => c.type)).size}
            </Text>
            <Text style={styles.statLabel}>Types</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {collectedCards.filter(c => c.rarity === 'rare' || c.rarity === 'epic' || c.rarity === 'legendary').length}
            </Text>
            <Text style={styles.statLabel}>Rare+</Text>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  cardCount: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#F9FAFB',
    fontSize: 16,
    paddingVertical: 12,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#60A5FA',
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  filterText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#F9FAFB',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sortLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginRight: 12,
  },
  sortButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  sortButtonActive: {
    backgroundColor: '#374151',
    borderColor: '#60A5FA',
  },
  sortText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  sortTextActive: {
    color: '#60A5FA',
  },
  cardsGrid: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  cardContainer: {
    flex: 0.48,
    marginBottom: 16,
    marginHorizontal: '1%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 16,
    minHeight: 200,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
    flex: 1,
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  cardImage: {
    width: '100%',
    height: 80,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardStats: {
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: '#F9FAFB',
    fontWeight: '500',
    marginBottom: 2,
  },
  cardType: {
    fontSize: 12,
    color: '#F9FAFB',
    fontWeight: 'bold',
    opacity: 0.8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  startPlayingButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  startPlayingGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  startPlayingText: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
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
  },
});

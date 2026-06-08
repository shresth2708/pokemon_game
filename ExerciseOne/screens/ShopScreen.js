import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { earnPowerUp } from '../store/gameSlice';
import { powerUps } from '../data/gameData';

export default function ShopScreen() {
  const dispatch = useDispatch();
  const { score, powerUps: currentPowerUps } = useSelector(state => state.game);

  const handlePurchase = (powerUpId, cost) => {
    if (score >= cost) {
      Alert.alert(
        'Purchase Power-up',
        `Spend ${cost} points for this power-up?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Purchase', 
            onPress: () => {
              dispatch(earnPowerUp(powerUpId));
              // In a real app, you'd also deduct the cost from score
            }
          },
        ]
      );
    } else {
      Alert.alert('Insufficient Points', `You need ${cost - score} more points.`);
    }
  };

  const shopItems = [
    {
      id: 'hint_pack_1',
      name: 'Hint Pack (5x)',
      description: 'Remove two wrong answers',
      icon: '💡',
      powerUpType: 'hint',
      quantity: 5,
      cost: 300,
      popular: false,
    },
    {
      id: 'double_score_pack_1',
      name: 'Double Score Pack (3x)',
      description: 'Double points for next question',
      icon: '⭐',
      powerUpType: 'doubleScore',
      quantity: 3,
      cost: 250,
      popular: true,
    },
    {
      id: 'time_freeze_pack_1',
      name: 'Time Freeze Pack (3x)',
      description: 'Stop timer for 10 seconds',
      icon: '❄️',
      powerUpType: 'timeFreeze',
      quantity: 3,
      cost: 400,
      popular: false,
    },
    {
      id: 'mega_pack',
      name: 'Mega Power Pack',
      description: '3x Hint, 2x Double Score, 2x Time Freeze',
      icon: '🎁',
      powerUpType: 'mixed',
      quantity: 1,
      cost: 800,
      popular: true,
      badge: 'BEST VALUE',
    },
  ];

  const bundles = [
    {
      id: 'starter_bundle',
      name: 'Starter Bundle',
      description: 'Perfect for new trainers',
      items: ['2x Hint', '1x Double Score'],
      cost: 150,
      originalCost: 200,
      discount: 25,
    },
    {
      id: 'pro_bundle',
      name: 'Pro Trainer Bundle',
      description: 'For experienced players',
      items: ['5x Hint', '3x Double Score', '2x Time Freeze'],
      cost: 600,
      originalCost: 850,
      discount: 29,
    },
  ];

  const renderShopItem = (item) => (
    <View key={item.id} style={styles.shopItem}>
      {item.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>POPULAR</Text>
        </View>
      )}
      
      {item.badge && (
        <View style={styles.customBadge}>
          <Text style={styles.customBadgeText}>{item.badge}</Text>
        </View>
      )}

      <View style={styles.itemHeader}>
        <View style={styles.itemIcon}>
          <Text style={styles.itemIconText}>{item.icon}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.currentStock}>
          <Text style={styles.stockLabel}>You have:</Text>
          <Text style={styles.stockValue}>
            {currentPowerUps[item.powerUpType] || 0}x
          </Text>
        </View>
        
        <View style={styles.itemPricing}>
          <Text style={styles.itemCost}>{item.cost} pts</Text>
          <TouchableOpacity
            style={[
              styles.purchaseButton,
              score < item.cost && styles.purchaseButtonDisabled
            ]}
            onPress={() => handlePurchase(item.powerUpType, item.cost)}
            disabled={score < item.cost}
          >
            <Text style={styles.purchaseButtonText}>
              {score >= item.cost ? 'Buy' : 'Not enough'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderBundle = (bundle) => (
    <View key={bundle.id} style={styles.bundleItem}>
      <View style={styles.bundleHeader}>
        <Text style={styles.bundleName}>{bundle.name}</Text>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{bundle.discount}% OFF</Text>
        </View>
      </View>
      
      <Text style={styles.bundleDescription}>{bundle.description}</Text>
      
      <View style={styles.bundleItems}>
        {bundle.items.map((item, index) => (
          <Text key={index} style={styles.bundleItem}>• {item}</Text>
        ))}
      </View>
      
      <View style={styles.bundlePricing}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{bundle.originalCost} pts</Text>
          <Text style={styles.bundlePrice}>{bundle.cost} pts</Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.bundleButton,
            score < bundle.cost && styles.bundleButtonDisabled
          ]}
          disabled={score < bundle.cost}
        >
          <LinearGradient
            colors={score >= bundle.cost ? ['#10B981', '#059669'] : ['#6B7280', '#4B5563']}
            style={styles.bundleButtonGradient}
          >
            <Text style={styles.bundleButtonText}>
              {score >= bundle.cost ? 'Buy Bundle' : 'Not enough'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1F2937', '#10B981']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🛒 Power-up Shop</Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Your Points:</Text>
          <Text style={styles.pointsValue}>{score.toLocaleString()}</Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Special Bundles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎁 Special Bundles</Text>
          <Text style={styles.sectionDescription}>
            Save more with these limited-time offers!
          </Text>
          {bundles.map(renderBundle)}
        </View>

        {/* Individual Power-ups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Power-ups</Text>
          <Text style={styles.sectionDescription}>
            Enhance your gameplay with these helpful items
          </Text>
          {shopItems.map(renderShopItem)}
        </View>

        {/* How to Earn Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 How to Earn Points</Text>
          <View style={styles.earnPointsCard}>
            <View style={styles.earnPointsItem}>
              <Text style={styles.earnPointsIcon}>✅</Text>
              <View style={styles.earnPointsText}>
                <Text style={styles.earnPointsTitle}>Answer Correctly</Text>
                <Text style={styles.earnPointsDescription}>100+ points per correct answer</Text>
              </View>
            </View>
            
            <View style={styles.earnPointsItem}>
              <Text style={styles.earnPointsIcon}>🔥</Text>
              <View style={styles.earnPointsText}>
                <Text style={styles.earnPointsTitle}>Build Streaks</Text>
                <Text style={styles.earnPointsDescription}>Bonus points for consecutive answers</Text>
              </View>
            </View>
            
            <View style={styles.earnPointsItem}>
              <Text style={styles.earnPointsIcon}>⚡</Text>
              <View style={styles.earnPointsText}>
                <Text style={styles.earnPointsTitle}>Speed Bonus</Text>
                <Text style={styles.earnPointsDescription}>Answer quickly for extra points</Text>
              </View>
            </View>
            
            <View style={styles.earnPointsItem}>
              <Text style={styles.earnPointsIcon}>🏆</Text>
              <View style={styles.earnPointsText}>
                <Text style={styles.earnPointsTitle}>Unlock Achievements</Text>
                <Text style={styles.earnPointsDescription}>Major point rewards for milestones</Text>
              </View>
            </View>
          </View>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 12,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#F9FAFB',
    marginRight: 8,
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
    lineHeight: 20,
  },
  shopItem: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    right: 16,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  customBadge: {
    position: 'absolute',
    top: -1,
    right: 16,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  customBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  itemIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#374151',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemIconText: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentStock: {
    alignItems: 'flex-start',
  },
  stockLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  stockValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  itemPricing: {
    alignItems: 'flex-end',
  },
  itemCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 8,
  },
  purchaseButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  purchaseButtonDisabled: {
    backgroundColor: '#6B7280',
  },
  purchaseButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  bundleItem: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  bundleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bundleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  discountBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  bundleDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  bundleItems: {
    marginBottom: 16,
  },
  bundleItemText: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 4,
  },
  bundlePricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  bundlePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
  bundleButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  bundleButtonDisabled: {
    opacity: 0.5,
  },
  bundleButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  bundleButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  earnPointsCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  earnPointsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  earnPointsIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  earnPointsText: {
    flex: 1,
  },
  earnPointsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  earnPointsDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bottomPadding: {
    height: 100,
  },
});

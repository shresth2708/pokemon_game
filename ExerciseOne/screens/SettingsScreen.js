import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updatePreferences } from '../store/userSlice';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { preferences } = useSelector(state => state.user);

  const handlePreferenceChange = (key, value) => {
    dispatch(updatePreferences({ [key]: value }));
  };

  const settingsSections = [
    {
      title: 'Game Settings',
      icon: '🎮',
      items: [
        {
          id: 'soundEnabled',
          title: 'Sound Effects',
          description: 'Play sound effects during gameplay',
          type: 'toggle',
          value: preferences.soundEnabled,
        },
        {
          id: 'hapticEnabled',
          title: 'Haptic Feedback',
          description: 'Vibrate on interactions',
          type: 'toggle',
          value: preferences.hapticEnabled,
        },
      ],
    },
    {
      title: 'Appearance',
      icon: '🎨',
      items: [
        {
          id: 'theme',
          title: 'Theme',
          description: 'Choose app appearance',
          type: 'selector',
          value: preferences.theme,
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Auto', value: 'auto' },
          ],
        },
      ],
    },
    {
      title: 'Account',
      icon: '👤',
      items: [
        {
          id: 'exportData',
          title: 'Export Data',
          description: 'Download your game data',
          type: 'action',
          action: () => Alert.alert('Export Data', 'Feature coming soon!'),
        },
        {
          id: 'deleteAccount',
          title: 'Delete Account',
          description: 'Permanently delete your account',
          type: 'action',
          danger: true,
          action: () => {
            Alert.alert(
              'Delete Account',
              'Are you sure? This action cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive' },
              ]
            );
          },
        },
      ],
    },
    {
      title: 'Support',
      icon: '💬',
      items: [
        {
          id: 'feedback',
          title: 'Send Feedback',
          description: 'Help us improve the game',
          type: 'action',
          action: () => Alert.alert('Feedback', 'Feature coming soon!'),
        },
        {
          id: 'support',
          title: 'Contact Support',
          description: 'Get help with issues',
          type: 'action',
          action: () => Alert.alert('Support', 'Email: support@pokemonmaster.com'),
        },
        {
          id: 'about',
          title: 'About',
          description: 'App version and info',
          type: 'action',
          action: () => Alert.alert('About', 'Pokémon Master Platform v2.0\nBuilt with React Native'),
        },
      ],
    },
  ];

  const renderToggleItem = (item) => (
    <View key={item.id} style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingDescription}>{item.description}</Text>
      </View>
      <Switch
        value={item.value}
        onValueChange={(value) => handlePreferenceChange(item.id, value)}
        trackColor={{ false: '#374151', true: '#3B82F6' }}
        thumbColor={item.value ? '#F9FAFB' : '#9CA3AF'}
      />
    </View>
  );

  const renderSelectorItem = (item) => (
    <View key={item.id} style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingDescription}>{item.description}</Text>
        <View style={styles.selectorContainer}>
          {item.options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.selectorOption,
                item.value === option.value && styles.selectorOptionActive
              ]}
              onPress={() => handlePreferenceChange(item.id, option.value)}
            >
              <Text style={[
                styles.selectorOptionText,
                item.value === option.value && styles.selectorOptionTextActive
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderActionItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.settingItem, item.danger && styles.settingItemDanger]}
      onPress={item.action}
    >
      <View style={styles.settingContent}>
        <Text style={[
          styles.settingTitle,
          item.danger && styles.settingTitleDanger
        ]}>
          {item.title}
        </Text>
        <Text style={[
          styles.settingDescription,
          item.danger && styles.settingDescriptionDanger
        ]}>
          {item.description}
        </Text>
      </View>
      <Text style={[
        styles.settingArrow,
        item.danger && styles.settingArrowDanger
      ]}>
        →
      </Text>
    </TouchableOpacity>
  );

  const renderSettingItem = (item) => {
    switch (item.type) {
      case 'toggle':
        return renderToggleItem(item);
      case 'selector':
        return renderSelectorItem(item);
      case 'action':
        return renderActionItem(item);
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1F2937', '#6B7280']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>{section.icon}</Text>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            <View style={styles.sectionContent}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <View style={styles.appInfoCard}>
            <Text style={styles.appInfoTitle}>Pokémon Master Platform</Text>
            <Text style={styles.appInfoVersion}>Version 2.0.0</Text>
            <Text style={styles.appInfoDescription}>
              The ultimate Pokémon quiz experience with card collection, 
              achievements, and competitive gameplay.
            </Text>
            
            <View style={styles.appInfoStats}>
              <View style={styles.appInfoStat}>
                <Text style={styles.appInfoStatValue}>150+</Text>
                <Text style={styles.appInfoStatLabel}>Questions</Text>
              </View>
              <View style={styles.appInfoStat}>
                <Text style={styles.appInfoStatValue}>50+</Text>
                <Text style={styles.appInfoStatLabel}>Pokémon Cards</Text>
              </View>
              <View style={styles.appInfoStat}>
                <Text style={styles.appInfoStatValue}>25+</Text>
                <Text style={styles.appInfoStatLabel}>Achievements</Text>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#F9FAFB',
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  sectionContent: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  settingItemDanger: {
    backgroundColor: '#7F1D1D',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  settingTitleDanger: {
    color: '#FCA5A5',
  },
  settingDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  settingDescriptionDanger: {
    color: '#FCA5A5',
    opacity: 0.8,
  },
  settingArrow: {
    fontSize: 18,
    color: '#9CA3AF',
    marginLeft: 12,
  },
  settingArrowDanger: {
    color: '#FCA5A5',
  },
  selectorContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  selectorOption: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectorOptionActive: {
    backgroundColor: '#3B82F6',
  },
  selectorOptionText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  selectorOptionTextActive: {
    color: '#F9FAFB',
  },
  appInfoSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  appInfoCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  appInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  appInfoVersion: {
    fontSize: 14,
    color: '#3B82F6',
    marginBottom: 16,
  },
  appInfoDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  appInfoStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  appInfoStat: {
    alignItems: 'center',
  },
  appInfoStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  appInfoStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomPadding: {
    height: 100,
  },
});

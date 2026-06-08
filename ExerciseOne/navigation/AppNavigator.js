import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import CollectionScreen from '../screens/CollectionScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import ShopScreen from '../screens/ShopScreen';
import GameModeScreen from '../screens/GameModeScreen';
import CardDetailScreen from '../screens/CardDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1F2937',
          borderTopColor: '#374151',
        },
        tabBarActiveTintColor: '#60A5FA',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
          title: 'Home'
        }}
      />
      <Tab.Screen 
        name="Quiz" 
        component={QuizScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>❓</Text>,
          title: 'Quiz'
        }}
      />
      <Tab.Screen 
        name="Collection" 
        component={CollectionScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📋</Text>,
          title: 'Cards'
        }}
      />
      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏆</Text>,
          title: 'Leaderboard'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
          title: 'Profile'
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#1F2937',
        },
        drawerActiveTintColor: '#60A5FA',
        drawerInactiveTintColor: '#9CA3AF',
        headerStyle: {
          backgroundColor: '#1F2937',
        },
        headerTintColor: '#F9FAFB',
      }}
    >
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="Achievements" component={AchievementsScreen} />
      <Drawer.Screen name="Shop" component={ShopScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={DrawerNavigator} />
        <Stack.Screen name="GameMode" component={GameModeScreen} />
        <Stack.Screen name="CardDetail" component={CardDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

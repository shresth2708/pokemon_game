
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppNavigator from './navigation/AppNavigator';
import * as Haptics from 'expo-haptics';

export default function App() {
  // Enable haptic feedback globally
  React.useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}

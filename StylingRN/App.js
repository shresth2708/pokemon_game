import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am new in RN. Learning Stylsheet Api in RN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'plum', padding: 60,},
  title:{}
});

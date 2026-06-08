import Box from './components/box';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Box style={{backgroundColor:"yellow", flex : 1}}>Box 1</Box>
      <Box style={{backgroundColor:"green"}}>Box 1</Box>
      <Box style={{backgroundColor:"pink", flex:3}}>Box 1</Box>
      <Box style={{backgroundColor:"blue"}}>Box 1</Box>
      <Box style={{backgroundColor:"fuchsia"}}>Box 1</Box>
      <Box style={{backgroundColor:"violet"}}>Box 1</Box>
      <Box style={{backgroundColor:"tomato"}}>Box 1</Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    borderWidth: 6,
    borderColor: 'red',
  },
});

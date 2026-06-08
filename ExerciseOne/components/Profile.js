import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const Profile = ({ collectedCards }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Collected Pokémon Cards</Text>
      {collectedCards.length === 0 ? (
        <Text style={styles.empty}>No cards collected yet. Play the quiz to win cards!</Text>
      ) : (
        <FlatList
          data={collectedCards}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image && <Image source={item.image} style={styles.image} />}
              <Text style={styles.name}>{item.name}</Text>
              <Text>Type: {item.type}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontSize: 16, color: 'gray', marginTop: 20 },
  card: { alignItems: 'center', marginBottom: 20, backgroundColor: '#fff', padding: 10, borderRadius: 8, elevation: 2 },
  image: { width: 80, height: 80, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: 'bold' },
});

export default Profile;

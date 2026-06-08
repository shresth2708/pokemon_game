import { StyleSheet, Text, View ,ScrollView , SafeAreaView , StatusBar , FlatList , SectionList} from 'react-native';
import pokemonList from './grouped-data.json';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={styles.scrollView}>
      {
        pokemonList.map((pokemon) => {
          return (
            <View style={styles.card} key={pokemon.id}>
              <Text style={styles.cardText}>{pokemon.name}</Text>
              <Text style={styles.cardText}>{pokemon.type}</Text>
            </View>
          )
        })
      }
      </ScrollView> */}
      <View style={styles.scrollView}>
      {/* <FlatList  
        data={pokemonList}
        renderItem={({item}) => {
          return (
            <View style={styles.card} key={item.id}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.type}</Text>
            </View>
          );
        }}
        horizontal={false}
        keyExtractor={(item)=>item.id.toString()}
        ItemSeparatorComponent={() => <View style={{height: 16}} />}
        ListEmptyComponent={<Text style={styles.empty}>No Item Found</Text>}
        ListHeaderComponent={<Text style={styles.listHeader}>Pokenom List</Text>}
        ListFooterComponent={<Text style={styles.listFooter}>End of List</Text>}
      /> */}

      <SectionList
        sections={pokemonList}
        renderItem={({item})=>{
          return (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item}</Text>
            </View>
          );
        }}
        renderSectionHeader={({section})=>{
          return (
            <Text  style={styles.listHeadersectionHeaderText}>{section.type}</Text>
          ); 
        }}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#f5f5f5',
  },
  scrollView:{
    paddingHorizontal:16,
  },
  card:{
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderWidth:1,
    borderRadius: 8,
  },
  cardText:{
    fontSize: 30,
  },
  empty:{
    flex:1,
    textAlign:'center',
    marginTop:"50%"
  },
  listHeader:{
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 12,
  },
  listFooter:{
    fontSize: 30,
    textAlign: 'center',
  },
  sectionHeaderText:{
    backgroundColor: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

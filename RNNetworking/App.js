import { useState , useEffect } from 'react';
import { StyleSheet, Text, View , SafeAreaView , StatusBar , FlatList , ActivityIndicator, Button , TextInput} from 'react-native';

export default function App() {
  const [postLists, setPostLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const[refreshing, setRefreshing] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [error,setError] = useState("");
  const fetchData = async (limit=10) => {
    try{
    const response= await fetch(`https://jsonplaceholder.typicode.com/posts?_${limit}`);
    const data = await response.json();
    setPostLists(data);
    setIsLoading(false);
    }
    catch(error){
      console.error("Error fetching data:", error);
      setIsLoading(false);
      setError("Failed to fetch data. Please try again later.");
    }
  }

  const addPost = async () => {
    try{
    setIsPosting(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: 1,
      }),
    });
    const newPost = await response.json();
    setPostLists([newPost, ...postLists]);
    setPostTitle('');
    setPostBody('');
    setIsPosting(false);
  }
  catch(error){
    console.error("Error adding post:", error);
    setError("Failed to add post. Please try again later.");
  }
  }
  

  useEffect(() => {
    fetchData();
  }, []);

  if(isLoading){
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue"/>
        <Text>Loading ...</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ):(
      <>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeHolder='Post Title' value={postTitle} onChangeText={setPostTitle} />
          <TextInput style={styles.input} placeHolder='Post Body' value={postBody} onChangeText={setPostBody} />
          <Button 
            title={isPosting ? 'Adding ...' : 'Add Post'} 
            onPress={addPost} 
            disabled={isPosting}
          />
        </View>
        <View style={styles.listContainer}> 
          <FlatList 
            data={postLists}
            renderItem={({item})=>{
              return (
                <View style={styles.card}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text styel={styles.bodyText}>{item.body}</Text>
                </View>
              )
            }}
            ItemSeparatorComponent={() => <View style={{height: 16}} />}
            ListEmptyComponent={<Text style={styles.empty}>No Item Found</Text>}
            ListHeaderComponent={<Text style={styles.listHeader}>Pokenom List</Text>}
            ListFooterComponent={<Text style={styles.listFooter}>End of List</Text>}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchData(20);
              setRefreshing(false);
            }}
          />
        </View>
      </>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop:StatusBar.currentHeight ,
  },
  listContainer:{
    flex:1,
    paddingHorizontal:16,
     
  },
  card:{
    backgroundColor : '#fff',
    padding:16,
    borderRadius:8,
    borderWidth:1,
  },
  titleText:{
    fontSize:30
  },
  bodyText:{
    fontSize:24,
    color:'#666666',
  },
  listHeader:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:12,
  },
  listFooter:{
    fontSize:24,
    textAlign: 'center',
    marginTop:12,
  },
  loadingContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
  inputContainer:{
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    borderWidth: 1,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8, 
    padding: 8,
    marginBottom: 8,
  },
  errorContainer:{
    backgroundColor:"#FFC0CB",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    margin: 16,
    alignItems: 'center',
  },
  errorText:{
    color:"#D8000C",
    fontSize:16,
    textAlign: 'center', 
  }
});

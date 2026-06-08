import {View , Text , StyleSheet ,Button} from 'react-native'
// import {useNavigation} from "@react-navigation/native"

export default function HomeScreen ({navigation , route}){
  // const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.text}>{route.params?.result}</Text>
      <Button title='Go To About' onPress={()=>navigation.navigate("About",{
        name: "Vishwas"
      })}/>
    </View>
  )
}


const styles =StyleSheet.create({
  container:{
    backgroundColor:"palm",
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  text:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:16,
  }
})
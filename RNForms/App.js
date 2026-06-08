// import { useState } from 'react';
// import { StyleSheet, Text, View ,StatusBar , SafeAreaView, TextInput , Switch} from 'react-native';

// export default function App() {
//   const [name, setName] = useState('');
//   const [isDarkMode,setIsDarkMode]=useState(false);
   
//   return (
//     <SafeAreaView style={styles.container}>
//       <TextInput style={styles.input} 
//       value={name} 
//       onChangeText={setName} 
//       placeholder='email@example.com'
//       // secureTextEntry 
//       // keyboardType='numeric'
//       autoCapitalize='none'
//       autoCorrect={false}
//       />
//       <TextInput style={[styles.input,styles.maultiLine]} placeholder='message' multiline/>
//       <Text style={styles.text}>Hello my name is {name}</Text>
//       <View style={styles.switchContainer}>
//         <Text style={styles.text}>Dark Mode</Text>
//         <Switch 
//         value={isDarkMode} 
//         onValueChange={()=>setIsDarkMode(true) }
//         trackColor={{false:"#767577", true:"lightblue"}}
//         thumbColor="#f4f3f4"
        
//         />
//       </View>
//     </SafeAreaView> 
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop:StatusBar.currentHeight,
//   },
//   input:{
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   text:{
//     fontSize:30,
//     padding: 10,
//   },
//   maultiLine:{
//     minHeight:100,
//     textAlignVertical:"top"
//   },
//   switchContainer:{
//     alignItems:"center",
//     flexDirection:"row",
//     justifyContent:"space-between",
//     paddingHorizontal: 10,
//   }
// });


import {View , Text, StyleSheet, SafeAreaView , TextInput , Button ,  Image , KeyboardAvoidingView , Platform} from 'react-native';
import { useState } from 'react';

export default function App() {
  const [username,setUsername] = useState("")
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors= {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
   const handleSubmit = () => {
    if (validateForm()){
      console.log("Submitted",username,password) 
      setUsername('');
      setPassword('');
      setErrors({});
    }
   }
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} style={styles.container}>
      <View style={styles.form}>
        <Image source={require('./assets/adaptive-icon.png')} style={styles.image}/> 
        <Text style={styles.label}>Usename</Text>
        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
        <TextInput style={styles.input} placeholder='Enter your name' value={username} onChangeText={setUsername}/>
        <Text style={styles.label}>Password</Text>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        <TextInput style={styles.input} placeholder='Enter your password' secureTextEntry value ={password} onChangeText={setPassword}/>
        <Button title='Login' onPress={()=>{handleSubmit()}}/>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:"#f5f5f5",
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label:{
    fontSize:16,
    marginBottom:5,
    fontWeight:"bold"
  },
  input:{
    height:40,
    borderColor:"#ddd",
    borderWidth:1,
    marginBottom:15,
    padding:10,
    borderRadius:5
  },
  image:{
    height:200,
    width:400,
    alignSelf:"center",
    marginBottom:50,
  },
  errorText:{
    color:"red",
    marginBottom:10,
  }
})
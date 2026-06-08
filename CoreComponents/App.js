import {View,Text,Image,ScrollView, Button , Pressable, Modal,StatusBar, ActivityIndicator, Alert} from "react-native"
const logoImg=require("./assets/adaptive-icon.png")
import Greet from "./components/greet"
import { useState } from "react"

export default function App(){

  const [isModalVisible,setIsModalVisible]=useState(false)
  return <View style={{flex:1,backgroundColor:"plum",padding:60}}>
    
    <Greet name="John"/>
    <Greet name="Doe"/>





    {/* Alert */}
    
    {/* <Button title="Alert" onPress={()=> Alert.alert("invalid data")} />
    <Button title="Alert2" onPress={()=> Alert.alert("invalid data","Dob incorrect")} />
    <Button title="Alert3" onPress={()=> Alert.alert("invalid data","Dob incorrect" , [{text:"ok",
      onPress:()=> console.log("ok pressed")
    },
    {text:"cancel",
      onPress:()=> console.log("cancel pressed")
    }]
    )} /> */}
    

    {/* Acticivity Indicator */}
    {/* <ActivityIndicator size="default"/>
    <ActivityIndicator size="large" color="midnightblue"/>
    <ActivityIndicator size="large" color="midnightblue" animation={false}/> */}

    {/* StatusBar */}
    {/* <StatusBar backgroundColor="lightgreen" barStyle="light-content" hidden/> */}
    
    {/* Modal */}
    
    {/* <Button 
    title="Press" 
    onPress={()=>setIsModalVisible(true)} 
    color="midnightblue"
    // disabled
    />
    <Modal visible={isModalVisible} onRequestClose={()=>setIsModalVisible(false)} animationType="slide" presentationStyle="pageSheet"> 
      <View style={{flex:1,backgroundColor:"lightblue",padding:60}}>
        <Text>Modal content</Text>
        <Button title="Close" color="midnightblue" onPress={()=>setIsModalVisible(false)}/>
      </View>
    </Modal> */}


    {/* Pressable */}

    {/* <Pressable onLongPress={()=>console.log("Image Pressed")}>
      <Image source={logoImg} style={{width:300,height:300}}></Image>
    </Pressable>
    <Pressable onPress={()=>console.log("Text Pressed")}>
      <Text>URI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya DURI - The Surgical Strike | Audio Jukebox | Vicky Kaushal & Yami Gautam| Shashwat S & Aditya D</Text>
    </Pressable> */}
  </View>
}


//css para estilização da tela
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  SafeAreaView,
  Image,
  TextInput,
  ImagePickerIOS,
} from "react-native";
import React from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

import {Feather} from '@expo/vector-icons';

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

//Modulo de exportação principal de renderização e funcionamento da tela home.
export default function HomeScreen(){

  // state = {
  //   text: "",
  //   image: null
  // };

  // componentDidMount = async () => {
  //   this.getPhotoPermission();
  // };

  // getPhotoPermission = async () => {
  //   if(Constants.platform.ios){
  //     const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

  //     if(status != "granted"){
  //       alert("We need permission to access your camera roll");
  //     }
  //   }
  // }

  //Animação de entrada
  LayoutAnimation.easeInEaseOut();
  const navigation = useNavigation();

  //Lógica para função de deslogar - firebase
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("InitialScreen");
      })
      .catch((error) => alert(error.message));
  };
  //Componentes visuais / front da aplicação
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
      <Image source={require("../assets/vicky.jpg")} style={styles.img}></Image>
        <Text style={styles.text}>Welcome, {auth.currentUser?.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image source={require("../assets/vicky.jpg")} style={styles.avatar}></Image>
        <TextInput autoFocus={true} multiline={true} numberOfLines={4} style={{flex: 1}} placeholder="O que você está pensando atualmente?"></TextInput>
        <TouchableOpacity style={styles.photo}>
          <Feather name="camera" size={20} color="#2d2d2d"/>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  ); 
};

//exportação da tela home
// export default HomeScreen;

//css para estilização da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },
  head: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor:"white",
  },
  button: {
    backgroundColor: "#5ac1ae",
    width: 100,
    height: 45,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 245,
    marginTop: -30,
  },
  buttonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 10,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius:24,
  },
  text:{
    marginLeft:40,
    marginTop:-25,
  },
  inputContainer:{
    margin:32,
    flexDirection:"row"
  },
  avatar:{
    width:40,
    height:40,
    borderRadius:24,
    marginRight:16,
    marginTop:10
  },
  photo:{
    marginTop:23,
  }
});

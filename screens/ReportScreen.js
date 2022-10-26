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
    FlatList,
    Pressable,
  } from "react-native";
  import React from "react";
  
  //import of auth
  import { auth } from "../firebase";
  import { useNavigation } from "@react-navigation/native";
  
  //firebase imports and utils
  import firebase from "firebase/compat/app";
  require("firebase/compat/storage");
  
  //import icons
  import { Feather } from "@expo/vector-icons";
  
  //import de uso da camera, pemissões e uses
  import { useState, useEffect } from "react";

  
  //Modulo de exportação principal de renderização e funcionamento da tela home.
  const HomeScreen = () => {
   
    //front-end
    return (
        <View style={styles.container}>
            <Text>Report Screen</Text>
        </View>
    );
  };
  export default HomeScreen;
  
  //css para estilização da tela
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
      backgroundColor: "white",
    },s
  });
  
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";

//import icons
import { Feather } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import {
  windowHeight,
  windowWidth,
  screenHeight,
  screenWidth,
} from "../utils/dimensions";

//firebase imports and utils
import firebase from "firebase/compat/app";
import { Firebase } from "react-native-firebase";
import { doc, onSnapshot, QuerySnapshot } from "@firebase/firestore";
require("firebase/compat/storage");

export default function ProfileScreen() {
  const [image, setImage] = useState("-");
  const [avatar, setAvatar] = useState("-");

  GetPhotoPermission = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status != "granted") {
        alert("We need permission to access.");
      }
    }
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image);
    }
  };

  const UploadPhotoStorage = async () => {
    const childPath = `userPhoto/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log(childPath);

    const response = await fetch(image);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgess = (snapshot) => {
      console.log(`Tranferido: ${snapshot.bytesTransfered}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgess, taskError, taskCompleted);
  };

  const fetchData = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        let photos = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        console.log(photos);
      });
  };

  const savePostData = (DownloadURL) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        DownloadURL,
      })
      .then(function () {
        setAvatar(DownloadURL)
        console.log("Armazenamento da foto de perfil salva com sucesso");
      });
  };

  return (
    <View style={styles.container}>
       <Image
               source={require("../assets/nature.jpg")}
              style={styles.wallpaper}
            ></Image>
      <View style={styles.backCont}>
        <TouchableOpacity onPress={PickImage}>
          <View style={styles.imgcont}>
            <Image
               source={require("../assets/vicky.jpg")}
              style={{ width: "100%", height: "100%", borderRadius: 80 }}
            ></Image>
            <View style={styles.status}></View>
          </View>
        </TouchableOpacity>
        <View style={styles.pontos}>
      <Feather name="more-horizontal" size={30} color="grey" />
      </View>
      <Text style={styles.name}>
        Victória Caroline
      </Text>
      <View style={styles.information}>
        <Text style={styles.title}>Sobre</Text>
        <Text style={styles.subtext}>Victória Caroline, 17 years old, studying systems development integrated to high school at Etec Professor Horácio Augusto da Silveira, extensive knowledge in the area of ​​PL/SQL database and others.</Text>
      </View>
      <View style={styles.information}>
        <Text style={styles.title}>Interesses                             <Text style={styles.seeAll}>Ver todos ➜</Text> </Text>
        <Text style={styles.subtext}>•Ambientalism{"\n"}•Environmentalism{"\n"}•Marine Life{"\n"}•Amazônia{"\n"}•Turtles</Text>
      </View>
        {/* <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#5ac1ae",
            borderRadius: 30,
          }}
          onPress={UploadPhotoStorage}
        >
          <Feather name="check" size={26} color="white" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  wallpaper:{
    width:screenWidth,
    height:250,
    marginTop:200,
  },
  backCont: {
    alignItems: "center",
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "white",
    marginTop: -20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 22,
  },
  imgcont: {
    width: 150,
    height: 150,
    backgroundColor: "#2d2d2d",
    borderRadius: 80,
    marginTop: -80,
    borderWidth: 1,
    borderColor: "white",
  },
  status: {
    width:35,
    height:35,
    backgroundColor:"#5ac1ae",
    borderRadius:30,
    borderWidth: 1,
    borderColor: "white",
    marginLeft:100,
    marginTop:-30,
  },
  pontos: {
    marginTop:10,
  },
  name: {
    fontSize:25,
  },
  information: {
    width:screenWidth,
    height:90,
    margin:20,
  },
  title: {
    fontSize:32,
    marginLeft:20,
    color:"#5ac1ae",
  },
  subtext: {
    fontSize:17,
    marginLeft:20,
    marginTop:5,
    color:"#2d2d2d",
  },
  seeAll: {
    fontSize:17,
    color:"#2d2d2d",
  }
});

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
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { async } from "@firebase/util";

import firebase from "firebase/compat/app";
import { Firebase } from "react-native-firebase";
import { doc, QuerySnapshot } from "@firebase/firestore";
require("firebase/compat/storage");

//Modulo de exportação principal de renderização e funcionamento da tela home.

const HomeScreen = () => {
  const navigation = useNavigation();

  //Lógica para função de deslogar - firebase
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // navigation.replace("InitialScreen");
        navigation.replace("InitialScreen");
      })
      .catch((error) => alert(error.message));
  };

  const [text, setText] = useState("-");
  const [image, setImage] = useState("-");

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
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image);
    }
  };

  const UploadPhotoStorage = async () => {
    const childPath = `post/${
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
  const savePostData = (DownloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        DownloadURL,
        text,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        console.log("chegou aqui :)");
      });
  };

  const clearImage = () => {
    setImage("-");
  };

  const fetchPosts = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data}
        })
        console.log(posts)
      });
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Image
          source={require("../assets/vicky.jpg")}
          style={styles.img}
        ></Image>
        <Text style={styles.text}>Welcome, {auth.currentUser?.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={{ marginHorizontal: 32, marginTop: -30, height: 150 }}>
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </View>
      </View>

      <View style={styles.containerPhoto}>
        <View>
          <Image
            source={require("../assets/vicky.jpg")}
            style={styles.avatar}
          ></Image>
          <TextInput
            placeholderTextColor="#cfcfcf"
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{
              marginTop: -50,
              marginLeft: 70,
              maxWidth: 250,
              color: "#fff",
            }}
            placeholder="O que você está pensando atualmente?"
            onChangeText={(text) => setText(text)}
          ></TextInput>
          <TouchableOpacity style={styles.photo} onPress={PickImage}>
            <Feather name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {image && (
          <Image
            source={{ uri: image }}
            style={{ flex: 1, borderRadius: 15, margin: 20 }}
          />
        )}

        <TouchableOpacity
          style={styles.buttonUpload}
          onPress={UploadPhotoStorage}
        >
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearImage}>
          <Text style={styles.clearText}>
            <Feather name="delete" size={15} color="white" /> Clear Image
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={fetchPosts}>
        <Feather name="download-cloud" size={20} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
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
  },
  head: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "white",
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
  buttonUpload: {
    backgroundColor: "#5ac1ae",
    width: 100,
    height: 45,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 12,
  },
  clearText: {
    color: "white",
    fontWeight: "900",
    fontSize: 15,
    marginTop: -40,
    marginLeft: 300,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 24,
  },
  text: {
    marginLeft: 40,
    marginTop: -25,
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 24,
    marginLeft: 16,
    marginTop: 10,
  },
  photo: {
    marginTop: -40,
    marginLeft: 350,
  },
  containerPhoto: {
    borderRadius: 15,
    backgroundColor: "#2d2d2d",
    flex: 1,
    width: 390,
    maxHeight: 290,
    marginTop: -150,
    marginLeft: 12,
  },
  cont: {
    backgroundColor: "#2d2d2d",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innercont: {
    alignItems: "center",
    flexDirection: "column",
  },
  creation: {
    fontWeight: "bold",
  },
  itemtext: {
    fontWeight: "300",
  },
});

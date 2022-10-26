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
import { database, Firebase } from "react-native-firebase";
import { doc, onSnapshot, QuerySnapshot } from "@firebase/firestore";
require("firebase/compat/storage");

//import icons
import { Feather } from "@expo/vector-icons";

//import de uso da camera, pemissões e uses
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

//Modulo de exportação principal de renderização e funcionamento da tela home.
const HomeScreen = () => {
  //Navvigations
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

  //use states para efetuar novo post
  const [text, setText] = useState("-");
  const [image, setImage] = useState("-");

  //solicitação de permissão para acessar galeria
  GetPhotoPermission = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status != "granted") {
        alert("We need permission to access.");
      }
    }
  };

  //function para abrir galeria e selecionar foto
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

  //function para upar foto no firebase
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

  // function para criar novo post no banco e armazenar url da imagem
  const savePostData = (DownloadURL) => {
    firebase
      .firestore()
      .collection("userPost")
      .add({
        DownloadURL,
        text,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        console.log("chegou aqui :)");
      });
  };

  //function para limpar imagem do placeholder de novo post
  const clearImage = () => {
    setImage("-");
  };

  //use state para  fetch de post
  const [posts, setTextPost] = useState([]);
  const [photos, setTextPhotos] = useState("");
  const [name, setTextName] = useState("");

  //caminho de collections para acesso de fetch
  const fpost = firebase
    .firestore()
    .collection("userPost")

  //caminho de collections para acesso de fetch para nome
  const fnome = firebase
  .firestore()
  .collection("users")

  //function de fetch-test para visualizar o retorno de postagens no banco / query
  const fetchData = () => {
    firebase
      .firestore()
      .collection("userPost")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        console.log(posts);
      });
  };

    //function de fetch-test para visualizar o retorno de postagens no banco / query - photos
    const fetchDataPhoto = () => {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
          let photo = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          console.log(photo);
        });
    };

  //function assincrona para fetch finan / puxar informações para o front
  useEffect(async () => {
    await fpost.onSnapshot((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        const { text, DownloadURL } = doc.data();
        posts.push({
          DownloadURL,
          text,
        });
      });
      setTextPost(posts);
    });
  }, []);

  //front-end
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        {/* <Image
          source={require("../assets/vicky.jpg")}
          style={styles.img}
        ></Image>
        <Text style={styles.text}>Welcome, {auth.currentUser?.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.containerPhoto}>
        <View>
          <Image
            source={{uri: photos}}
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
      <View style={styles.pontos}>
      <Feather name="more-horizontal" size={20} color="black" />
      </View>
      {/* //view / flat list para criação de posts no front-end */}
      <View style={{ flex: 1, marginTop: 20 }}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <Pressable style={styles.cont}>
              <View style={styles.innercont}>
                <Text style={styles.itemtext}>{item.text}</Text>
                <Image
                  style={styles.img}
                  source={{ uri: item.DownloadURL }}
                ></Image>
              </View>
            </Pressable>
          )}
        ></FlatList>
      </View>
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
    marginTop:25,
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
    marginTop: -35,
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
    maxHeight: 130,
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
    alignItems: "flex-start",
    flexDirection: "column",
  },
  creation: {
    fontWeight: "bold",
  },
  itemtext: {
    fontWeight: "300",
    color: "white",
    marginLeft:5,
    marginBottom:10,
  },
  img: {
    flex: 1,
    width: 365,
    height: 200,
    borderRadius: 10,
  },
  pontos: {
    marginLeft:200,
    marginTop:10,
  },
});

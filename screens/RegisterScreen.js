//Imports / dependencias para o projeto
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import HomeScreen from "./HomeScreen";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

//Modulo de exportação principal de renderização e funcionamento da tela de registro.
const RegisterScreen = () => {
  //Animação de entrada
  LayoutAnimation.easeInEaseOut();

  //variaveis para registro - firebase
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

   //Acesso a tela principal - home caso o registro for aceito
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  //Lógica para função do registro de usuario - firebase
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password, name)
      .then((userCredentials) => {
        const user = userCredentials.user;
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
          name,
          email,
        })
        console.log("Registered in", name);
      })
      .catch((error) => alert(error.message));
  };

  //Lógica para função do registro de usuario // dependencia lado login - firebase
  const handleSign = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged with", user.email);
      })
      .catch((error) => alert(error.message));
  };

   //Redirecionamento / rota de login
  const pageRedirect = () => {
    navigation.replace("LoginScreen");
  };

   //Redirecionamento / rota inicial
  const initialRedirect = () => {
    navigation.replace("InitialScreen")
  }

  //Componentes visuais / front da aplicação
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>

        <TouchableOpacity onPress={initialRedirect}>
        <Image source={require('../assets/ossain.png')} style={styles.img}></Image>
        </TouchableOpacity>

        <View style={styles.errorMessage}>{/* <Text>error</Text> */}</View>

        <View style={styles.backForm}>

        <View style={styles.form}>
        <Text style={styles.legenda}>Register</Text>
          <View>
            <Text style={styles.inputTitle}>Email Adress</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor="#595959"
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
          </View>

          <View style={{ paddingTop: 25 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor="#595959"
              value={password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>

          <View style={{ paddingTop: 25 }}>
            <Text style={styles.inputTitle}>Your Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Your Name"
              placeholderTextColor="#595959"
              value={name}
              onChangeText={(text) => setName(text)}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={{ color: "white" }}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={pageRedirect}
        >
          <Text style={{ color: "#fff" }}>
            Already have a account?{" "}
            <Text style={{ color: "#5ac1ae", fontWeight: "500" }}>Sign.</Text>
          </Text>
        </TouchableOpacity>
          
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

//exportação da tela de registro
export default RegisterScreen;

//css para estilização da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:25,
  },
  legenda:{
    color:"#5ac1ae",
    fontSize:25,
    marginBottom: 10,
    marginTop:45,
  },
  greeting: {
    marginTop: 90,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop:-60,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  backForm:{
    backgroundColor:"#2d2d2d",
    height:670,
    borderRadius:20,
  },
  inputTitle: {
    color: "#fff",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#5ac1ae",
    borderBottomWidth: 1,
    height: 40,
    fontSize: 15,
    color: "#5ac1ae",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#5ac1ae",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 250,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    marginLeft:55,
  },
});

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image, StatusBar, LayoutAnimation, ImageBackground
} from "react-native";
import React, { useEffect, useState } from "react";
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigation = useNavigation()

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("Home")
      }
    })
    return unsubscribe
  }, [])

  
  const pageRedirect = () => {
        navigation.replace("RegisterScreen")
  }
  
  const handleSign = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged with', user.email);
    }).catch(error => alert(error.message))
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>


        <Image source={require('../assets/ossain.png')} style={styles.img}></Image>
        
        <View style={styles.backForm}>
        <View style={styles.errorMessage}>{/* <Text>error</Text> */}</View>
        
        <View style={styles.form}>
        <Text style={styles.legenda}>Sign in</Text>
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
        </View>

        <View style={styles.formButtons}>
        <TouchableOpacity style={styles.button} onPress={handleSign}>
          <Text style={{ color: "white" }}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttongoogle} onPress={handleSign}>
        <Image source={require('../assets/logoGoogle.webp')} style={styles.imgGoogle}></Image>
        </TouchableOpacity>

        </View>
        

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={pageRedirect}
        >
          <Text style={{ color: "#fff" }}>
            Don't have an account?{" "}
            <Text style={{ color: "#5ac1ae", fontWeight: "500" }}>
              Sign up.
            </Text>
          </Text>
        </TouchableOpacity>
        </View>
        
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
  },
  legenda:{
    color:"#5ac1ae",
    fontSize:25,
    marginBottom: 10,
  },
  greeting: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  backForm:{
    backgroundColor:"#2d2d2d",
    height:670,
    borderRadius:20,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
    marginTop: -30,
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
    color: "#fff",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#5ac1ae",
    borderRadius: 4,
    height: 52,
    width:250,
    alignItems: "center",
    justifyContent: "center",
  },
  buttongoogle: {
    marginHorizontal:290,
    marginTop:-52,
    borderRadius: 4,
    height: 52,
    width:70,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor:"#5ac1ae",
  },
  img: {
    width: 250,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    marginLeft:55,
  },
  imgGoogle: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginLeft:0,
  }
});

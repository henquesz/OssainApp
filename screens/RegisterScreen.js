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
import HomeScreen from "./HomeScreen";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered in", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleSign = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged with", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const pageRedirect = () => {
    navigation.replace("LoginScreen");
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <Text
          style={styles.greeting}
        >{`New to Social app?\nRegister now.`}</Text>
        <Image
          source={require("../assets/ossain.png")}
          style={styles.img}
        ></Image>

        <View style={styles.errorMessage}>{/* <Text>error</Text> */}</View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Adress</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Email"
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
              value={password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>

          <View style={{ paddingTop: 25 }}>
            <Text style={styles.inputTitle}>Your Name</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              placeholder="Your name"
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
          <Text style={{ color: "#2d2d2d" }}>
            Already have a account?{" "}
            <Text style={{ color: "#5ac1ae", fontWeight: "500" }}>Sign.</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputTitle: {
    color: "#5ac1ae",
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
    width: 150,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    marginLeft:110,
  },
});

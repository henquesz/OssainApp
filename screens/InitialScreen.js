//Imports / dependencias para o projeto
import { StyleSheet, Text, View, TouchableOpacity, Image, LayoutAnimation } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

//Modulo de exportação principal de renderização e funcionamento da tela inicial.
const InitialScreen = () => {

  //Animação de entrada
  LayoutAnimation.easeInEaseOut();

  const navigation = useNavigation();

  const log = useEffect(() => {
    navigation.navigate("InitialScreen");
  }, []);

  //Redirecionamento / rota do botão login
  const pageRedirectSign = () => {
    navigation.replace("LoginScreen")
}
  //Redirecionamento / rota do botão login
  const pageRedirectSignUp = () => {
    navigation.replace("RegisterScreen")
}
  //Componentes visuais / front da aplicação
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/ossain.png")}
        style={styles.img}
      ></Image>
      <TouchableOpacity style={styles.button} onPress={pageRedirectSign}>
        <Text style={{ color: "white" }}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 20 }}
          onPress={pageRedirectSignUp}
        >
          <Text style={{ color: "#2d2d2d" }}>
            Don't have a account?{" "}
            <Text style={{ color: "#5ac1ae", fontWeight: "500" }}>
              Sign up.
            </Text>
          </Text>
        </TouchableOpacity>

    </View>
  );
};

//exportação da tela inicial
export default InitialScreen;

//css para estilização da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#000",
    borderRadius: 8,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300,
  },
  img: {
    width: 350,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    marginLeft: 10,
  },
});

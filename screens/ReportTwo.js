//Imports / dependencias para o projeto
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { screenHeight, screenWidth } from "../utils/dimensions";
import { Feather } from "@expo/vector-icons";
import firebase from "firebase/compat/app";

//Modulo de exportação principal de renderização e funcionamento da tela inicial.
const ReportTwo = () => {
  //Animação de entrada
  LayoutAnimation.easeInEaseOut();

  const navigation = useNavigation();

  const initialRedirect = () => {
    navigation.replace("Home")
  }

  const [autor, setAutor] = useState("");
  const [data, setData] = useState("");
  const [imagem, setImagem] = useState("");
  const [desc, setDesc] = useState("");

  const handleReport = () => {
    firebase
      .firestore()
      .collection("denuncias")
      .set({
        autor,
        data,
        desc
      })
      .then(function () {
        console.log("Informações importantes da denuncias armazenadas com sucesso");
      });
  };

  //Componentes visuais / front da aplicação
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={initialRedirect}>
          <Image
            source={require("../assets/ossain.png")}
            style={styles.img}
          ></Image>
        </TouchableOpacity>

        <View style={styles.backForm}>
          <View style={styles.form}>
            <Text style={styles.legenda}>
              Agora, conte como foi o ocorrido
            </Text>
            <Text style={styles.subLegenda}>
              Precisamos que nos fale como, a data, o possivel autor e uma imagem do ocorrido, para que a gente mantenha um controle de denúncia do nosso app.
            </Text>
            <View>
              <Text style={styles.inputTitle}>Autor</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Possível autor"
                placeholderTextColor="#595959"
                value={autor}
                onChangeText={(text) => setAutor(text)}
              ></TextInput>
            </View>

            <View style={{ paddingTop: 25 }}>
              <Text style={styles.inputTitle}>Data</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Data do ocorrido"
                placeholderTextColor="#595959"
                value={data}
                onChangeText={(text) => setData(text)}
              ></TextInput>
            </View>

            <View style={{ paddingTop: 25 }}>
              <Text style={styles.inputTitle}>Descrição</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Descrição do ocorrido"
                placeholderTextColor="#595959"
                value={desc}
                onChangeText={(text) => setDesc(text)}
              ></TextInput>
            </View>

            {/* <View style={{ paddingTop: 25 }}>
              <Text style={styles.inputTitle}>Estado</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Estado do logradouro"
                placeholderTextColor="#595959"
                value={estado}
                onChangeText={(text) => setEstado(text)}
              ></TextInput>
            </View> */}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleReport}>
            <Text style={styles.buttonText}>
              Próximo <Feather name="arrow-right" size={20} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

//exportação da tela inicial
export default ReportTwo;

//css para estilização da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  legenda: {
    color: "#5ac1ae",
    fontSize: 23,
    marginBottom: 10,
  },
  subLegenda: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 20,
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
  backForm: {
    backgroundColor: "#2d2d2d",
    height: screenHeight,
    borderRadius: 20,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
    marginTop: 30,
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
    width: 200,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#5ac1ae",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  img: {
    width: 250,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50,
    marginLeft:55,
  },
});

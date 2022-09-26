//css para estilização da tela
import { StyleSheet, Text, View, TouchableOpacity, LayoutAnimation } from 'react-native'
import React from 'react'
import {auth} from '../firebase';
import { useNavigation } from '@react-navigation/native';

//Modulo de exportação principal de renderização e funcionamento da tela home.
const HomeScreen = () => {
  //Animação de entrada
  LayoutAnimation.easeInEaseOut();
  const navigation = useNavigation()

  //Lógica para função de deslogar - firebase
  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace("InitialScreen")
    }).catch(error => alert(error.message))
  }
  //Componentes visuais / front da aplicação
  return (
    <View style={styles.container}>
      <Text>Welcome, {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

//exportação da tela home
export default HomeScreen

//css para estilização da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white",
  },
  button: {
    backgroundColor: "#5ac1ae",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40, 
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  }
})
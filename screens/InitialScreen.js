import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";

const InitialScreen = () => {
   
    const navigation = useNavigation()
   
    const log = useEffect(() => {
        navigation.navigate("InitialScreen")
    }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={log}>
          <Text style={{ color: "white" }}>Sign in</Text>
        </TouchableOpacity>
    </View>
  )
}

export default InitialScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#5ac1ae",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        marginTop:300,
      },
})
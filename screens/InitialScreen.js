import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const InitialScreen = () => {
  const navigation = useNavigation();

  const log = useEffect(() => {
    navigation.navigate("InitialScreen");
  }, []);

  const pageRedirect = () => {
    navigation.replace("LoginScreen")
}

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/ossain.png")}
        style={styles.img}
      ></Image>
      <TouchableOpacity style={styles.button} onPress={pageRedirect}>
        <Text style={{ color: "white" }}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 20 }}
          onPress={pageRedirect}
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

export default InitialScreen;

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

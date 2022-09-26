import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native'
import React from 'react'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    backgroundColor:"white",
    justifyContent: "center",
    alignItems: "center",
  },

});

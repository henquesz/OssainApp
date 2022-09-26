import { View, StyleSheet, Text } from 'react-native'
import React from 'react'

export default function ApiScreen() {
  return (
    <View style={styles.container}>
      <Text>ApiScreen</Text>
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
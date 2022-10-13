import { View, StyleSheet, Text } from 'react-native'
import React from 'react'

export default function ApiScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card1}>
      </View>
      <View style={styles.card2}>
      </View>
      <View style={styles.card3}>
      </View>
      <View style={styles.card4}>
      </View>
      <View style={styles.card5}>
      </View>
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
  card1: {
    width:170,
    height:150,
    backgroundColor:"#2d2d2d",
    borderRadius:10,
    marginLeft:-200,
    marginTop:0,
  },
  card2: {
    width:170,
    height:300,
    backgroundColor:"#2d2d2d",
    borderRadius:10,
    marginLeft:200,
    marginTop:-150,
  },
  card3: {
    width:170,
    height:300,
    backgroundColor:"#2d2d2d",
    borderRadius:10,
    marginLeft:-200,
    marginTop:-120,
  },
  card4: {
    width:170,
    height:150,
    backgroundColor:"#2d2d2d",
    borderRadius:10,
    marginLeft:200,
    marginTop:-150,
  },
  card5: {
    width:372,
    height:150,
    backgroundColor:"#2d2d2d",
    borderRadius:10,
    marginLeft:0,
    marginTop:25,
  },

});
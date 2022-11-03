import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';

import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

// import * as Location from "expo-location"
import * as Location from 'expo-location';

import getCurrentWeather from '../api/ConsultApi';

import { useTheme } from '../utils/ThemeProvider';
import { color } from 'react-native-reanimated';

export default function ApiScreen() {
  const {dark, colors, setScheme} = useTheme();

  const navigation = useNavigation()

  const [wind, setWind] = useState('65')
  const [windDeg, setWindDeg] = useState('65')
  const [umidity, setUmidity] = useState('80')
  const [tempMin, setTempMin] = useState('21')
  const [tempMax, setTempMax] = useState('27')
  const [locationCoords, setLocationCoords] = useState([])
  const [pressure, setPressure] = useState('1')

  const [currentTemperature, setCurrentTemperature] = useState('27')
  const [location, setLocation] = useState('BR, São Paulo')


  async function setCurrentWeather(){
    getLocation()
    const data = await getCurrentWeather(locationCoords)

    setCurrentTemperature(convertToC(data[0]))
    setTempMin(convertToC(data[1]))
    setTempMax(convertToC(data[2]))
    setLocation(data[3])
    setWind(data[4])
    setWindDeg(data[5])
    setUmidity(data[6])
    setPressure(data[7])
  }

  function convertToC(kelvin){
    return parseInt(kelvin - 273)
  }

  async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync()
    if(status !== 'granted'){
      alert("Permissão de localização não autorizada");
    }else{
      let location = await Location.getCurrentPositionAsync({})
      await setLocationCoords(location.coords)
    }
  }
  useEffect(() => {
    setCurrentWeather()
  }, [])

  const pageRedirect = () => {
    navigation.replace("Report")
}

  return (
    <View style={{    
      flex: 1,
      backgroundColor:colors.primary,
      justifyContent: "center",
      alignItems: "center",}}>
      <TouchableOpacity onPress={pageRedirect}>
       <Feather name="alert-octagon" size={30} color={colors.text} style={{marginTop:20,}} />
      </TouchableOpacity>
      <View style={[styles.card1, {backgroundColor:colors.text,}]}>
      <Feather name="sun" size={30} color="yellow" />
        <Text style={[styles.cardText, {color:colors.primary,}]}>{currentTemperature}<Text style={[styles.cardText, {color: colors.primary}]}>°C</Text></Text>
        <Text style={[styles.cardSubText, {color:colors.primary,}]}>{location}</Text>
      </View>
      <View style={[styles.card2, {backgroundColor:colors.text,}]}>
        <Text style={[styles.cardText2, {color:colors.primary,}]}>Temperatura Mínima</Text>
        <Feather name="arrow-down" size={50} color="red" style={{marginTop:20, marginBottom:15,}} />
        <Text style={[styles.cardText2, {color:colors.primary,}]}>{tempMin}°C</Text>
      </View>
      <View style={[styles.card3, {backgroundColor:colors.text,}]}>
      <Text style={[styles.cardText2, {color:colors.primary,}]}>Temperatura Máxima</Text>
        <Feather name="arrow-up" size={50} color="green" style={{marginTop:20, marginBottom:15,}} />
        <Text style={[styles.cardText2, {color:colors.primary,}]}>{tempMax}°C</Text>
      </View>
      <View style={[styles.card4, {backgroundColor:colors.text,}]}>
        
      <Text style={[styles.cardText, {color:colors.primary,}]}>{pressure}</Text>
        <Text style={[styles.cardSubText, {color:colors.primary,}]}>Pressure</Text>
      </View>
      <View style={[styles.card5, {backgroundColor:colors.text,}]}>
          <View style={styles.subCard1}>
            <Text style={[styles.cardMenorSubText, {color:colors.primary,}]}>Ventos</Text>
            <Text style={[styles.cardSubText, {color:colors.primary,}]}>{wind} KM/H</Text>
            <Text style={[styles.cardSubText, {color:colors.primary,}]}>{windDeg} Deg</Text>
          </View>

          <View style={styles.subCard2}>
            <Text style={[styles.cardMenorSubText, {color:colors.primary,}]}>Umidade</Text>
            <Text style={[styles.cardSubText, {color:colors.primary,}]}>{umidity}</Text>
          </View>
      </View>
      <TouchableOpacity onPress={() => setCurrentWeather()} style={{marginTop:15,}}>
        <Feather name="arrow-down-circle" size={30} color={colors.text} />
      </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    width:170,
    height:150,
    backgroundColor:"#2d2d2d",
    borderRadius:10,
    marginLeft:-200,
    marginTop:20,
  },
  card2: {
    justifyContent: "center",
    alignItems: "center",
    width:170,
    height:300,
    backgroundColor:"#2d2d2d",
    borderRadius:10,
    marginLeft:200,
    marginTop:-150,
  },
  card3: {
    justifyContent: "center",
    alignItems: "center",
    width:170,
    height:300,
    backgroundColor:"#2d2d2d",
    borderRadius:10,
    marginLeft:-200,
    marginTop:-120,
  },
  card4: {
    justifyContent: "center",
    alignItems: "center",
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
  cardText:{
    color:"#dedede",
    fontSize:55,
  },
  cardSubText:{
    color:"#dedede",
    fontSize:20,
  },
  cardText2:{
    color:"#dedede",
    fontSize:30,
    textAlign:"center"
  },
  subCard1: {
    justifyContent: "center",
    alignItems: "center",
    width:170,
    height:135,
    margin:6,
    borderRadius:10,
    marginLeft:7,
  },
  subCard2: {
    justifyContent: "center",
    alignItems: "center",
    width:170,
    height:135,
    borderRadius:10,
    marginLeft:195,
    marginTop:-140,
  },
  cardMenorSubText:{
    color:"#dedede",
    fontSize:25,
  }

});
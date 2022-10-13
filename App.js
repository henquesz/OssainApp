//Imports / dependencias para o projeto
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import de telas
import InitialScreen from './screens/InitialScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ApiScreen from './screens/ApiScreen';
import ProfileScreen from './screens/ProfileScreen';

import {Feather, EvilIcons} from '@expo/vector-icons'


//Import para funcionamento da navegação inferior
const Tab = createBottomTabNavigator();

//Function para rotas da navegação
function Home() {
  return (
      <Tab.Navigator>
         <Tab.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false, tabBarHideOnKeyboard:true, tabBarShowLabel:false, tabBarIcon: () => { return <Feather name="home" size={25} color="black"/>}}} />
          <Tab.Screen name="ApiScreen" component={ApiScreen}  options={{headerShown: false, tabBarShowLabel:false, tabBarIcon: () => { return <Feather name="feather" size={25} color="black"/>}}} />
          <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false, tabBarShowLabel:false, tabBarIcon: () => { return <Feather name="user" size={25} color="black"/>}}} />
      </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

//function principal para funcionamento das telas e redirecionamentos
export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false, MyTabs: false}} name="InitialScreen" component={InitialScreen} />
        <Stack.Screen options={{headerShown: false, MyTabs: false}} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false, MyTabs: false}} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right:20,
    elevation: 0,
    backgroundColor: "white",
    borderRadius:15,
    height:50,
  }
});

import React from "react";

import {
View,
Text,
StyleSheet,


} from 'react-native'

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Home from "./src/Home";
import Register from "./src/Register";
import Login from "./src/Login";

export default function App(){

  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}
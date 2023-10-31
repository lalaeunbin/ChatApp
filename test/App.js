import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screen/Login";
import Register from "./screen/Register";
import Home from "./screen/Home";
import Chat from "./screen/Chat";

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name='Login' component={Login}
        />
        <Stack.Screen
        name='Register' component={Register}
        />
        <Stack.Screen
        name='Home' component={Home}
        />
        <Stack.Screen
        name='Chat' component={Chat}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn:{
    marginTop: 10
  }
});

/*
        
        <Stack.Screen
        name='Login' component={Login}
        />
        <Stack.Screen
        name='Register' component={Register}
        />
        <Stack.Screen
        name='Home' component={Home}
        options={{
          headerBackVisible:false,
          title: 'Active users',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontWeight: '900'}
        }}
        />


*/
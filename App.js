import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import { Home } from './components/Home';

import { firebaseConfig } from './Config';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

initializeApp(firebaseConfig)

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState()
  const [user, setUser] = useState()

  const SignupHandler = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setUser(true)
      setAuth(true)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen 
          name="Signup" 
          component={Signup}
          options={{title:'Sign up'}} /> */}
        <Stack.Screen name="Signup"  options={{title:'Sign up'}} >
          { (props) => <Signup {...props} handler={SignupHandler} auth={auth} /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Signin" 
          component={Signin} 
          options={{title:'Sign in'}}/>
        <Stack.Screen name="Home" component={Home} />
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
});

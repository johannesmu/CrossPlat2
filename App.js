import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import { Home } from './components/Home';
import { Signout } from './components/Signout';

import { firebaseConfig } from './Config';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

initializeApp(firebaseConfig)

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState()
  const [user, setUser] = useState()
  const [signupError, setSignupError] = useState()
  const [signinError, setSigninError] = useState()

  const FBauth = getAuth()
  const firestore = getFirestore()


  useEffect( () => {
    onAuthStateChanged(FBauth, (user) => {
      if(user){
        setAuth(true)
        setUser(user)
      }
      else {
        setAuth(false)
        setUser(null)
      }
    })
  })
 
  const SignupHandler = ( email, password ) => {
    createUserWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => {
      addDoc(collection(firestore, 'users'), {id: userCredential.user.uid, email: userCredential.user.email})
      setUser(userCredential)
      setAuth(true)
    } )
    .catch( (error) => {
      setSignupError(error.code)
    })
  }

  const SigninHandler = (email, password) => {
    signInWithEmailAndPassword(FBauth, email, password)
    .then((userCredential) => {
      setUser(userCredential)
      setAuth(true)
    })
    .catch( (error) => {
      setSigninError(error.code)
     })
  }

  const SignoutHandler = () => {
    signOut(FBauth).then ( () => {
      setAuth(false)
      setUser(null)
    })
    .catch( (error) => console.log(error.code) )
  }

  // Firestore add user to database
  const addData = (collection, data) => {
    // Add a new document in collection "cities"
    await setDoc(doc(firestore, collection, data.id), data );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup"  options={{title:'Sign up'}} >
          { (props) => <Signup {...props} 
            handler={SignupHandler} 
            auth={auth} 
            error={signupError} 
          /> }
        </Stack.Screen>
        <Stack.Screen name="Signin" options={{title:'Sign in'}} >
          { (props) => <Signin {...props} 
            handler={SigninHandler} 
            auth={auth} 
            error={signinError} 
          /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Home" 
          options={{
              headerTitle: "Test",
              headerRight: (props) => <Signout {...props} handler={SignoutHandler} />
          }}  >
          { (props) => <Home {...props} auth={auth} /> }
        </Stack.Screen>
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

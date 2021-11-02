import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';

export function Signup(props) {
    const [validEmail, setValidEmail] = useState()
    const [ validPassword, setValidPassword] = useState()
    const [validForm, setValidForm] = useState()

    const navigation = useNavigation()
  
    const validateEmail = (emailVal) => {
        if(emailVal.indexOf('@') > 0){
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }
    }

    const validatePassword = (passwordVal) => {
        if(passwordVall.length >= 8){
            setValidPassword(true)
        }
        else {
            setValidPassword(false)
        }
    }

    useEffect( () => {
        if(validEmail && validPassword) {
          setValidForm( true )
        }
        else {
          setValidForm( false )
        }
      }, [validEmail, validPassword])

    return (
      <View style={styles.container}>
        <Text>Sign up</Text>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={styles.inner}>
          <Text>Email</Text>
          <TextInput style={styles.input} onChangeText={ (val) => validateEmail(val) } />
          <Text>Password</Text>
          <TextInput style={styles.input} onChangeText={ (val) => validatePassword(val) } />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <Text>Already have an account?</Text>
          <Button title="Click here to sign in" onPress={() => navigation.navigate("Signin")} />
        </View>
        </KeyboardAvoidingView>
        
      </View>
    )
  }

  const styles = StyleSheet.create( {
    input: {
      backgroundColor: ThemeColours.cultured,
      fontSize: 16,
      padding: 5,
      borderRadius: 4,
    },
    button: {
      marginVertical: 15,
      backgroundColor: ThemeColours.cerise,
      padding: 10,
      borderRadius: 10,
    },
    container: {
      flex: 1,
      backgroundColor: ThemeColours.turquoise,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      color: ThemeColours.cultured,
      textAlign: 'center',
    },
    inner: {
      width: 300,
      marginBottom: 90,
    },
    kb: {
      flex: 1,
    }
  })
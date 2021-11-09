import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';

export function Signin (props){

    const navigation = useNavigation()
  
    return (
      <View style={styles.container}>
        <Text>Sign up</Text>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={styles.inner}>
          <Text>Email</Text>
          <TextInput style={styles.input} />
          <Text>Password</Text>
          <TextInput style={styles.input} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <Text>Don't have an account?</Text>
          <Button title="Click here to sign up" onPress={() => navigation.navigate("Signup")} />
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
import React from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function AuthForm ( props ) {
  return(
    <View>
      <Text>Email</Text>
      <TextInput style={styles.TextInput}/>
      <Text>Password</Text>
      <TextInput/>
      <TouchableOpacity>
        <Text>{props.button}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create( {
  input: {
    backgroundColor: 'white'
  }
})
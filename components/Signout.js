import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export function Signout() {
  return(
    <TouchableOpacity onPress={ () => props.handler() } >
      <Text style={styles.signoutText} >Signout</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  signoutText: {
    color: "black",
  },
})
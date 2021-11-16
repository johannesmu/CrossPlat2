import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Signout } from './Signout';
import { useNavigation } from '@react-navigation/native';

export function Home (props){
    const navigation = useNavigation()

    useEffect( () => {
        navigation.setOptions( {
            headerRight: props => <Signout {...props} />
        })
    })


    return(
        <View>
            <Text>HOME</Text>
            <Signout />
        </View>
    ) 
}
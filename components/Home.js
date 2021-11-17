import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export function Home (props){
    const navigation = useNavigation()

    useEffect( () => {
        if(!props.auth){
            navigation.reset({ index: 0, routes: [ {name: 'Signin'} ] })
        }
    }, [props.auth])


    return(
        <View>
            <Text>HOME</Text>
        </View>
    ) 
}
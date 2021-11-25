// Import
import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const ListItem = (props) => {

    return(
        <View style={styles.container} >
        <BouncyCheckbox
          style={{flex: 1}}
          textStyle={ (props.status) ? {color: 'gray'} : {color: 'white'} }
          //ref={(ref: any) => (bouncyCheckboxRef = ref)}
          isChecked={props.status}
          text={props.text}
          disableBuiltInState
          onPress={ ()  => props.done(props.id) }
          />
          <FontAwesomeIcon 
            style={{color:'tomato'}} 
            icon={ faTrashAlt } 
            size={25} 
            onPress={ () => props.delete(props.id) } 
            display={ (props.status) ? null : 'none'} 
          />
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      padding: 17,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: '#3d5187',
    },
    text: {
      fontSize: 16,
      flex: 1,
      color: 'white',
    },
    textDone: {
      fontSize: 16,
      textDecorationLine:"line-through",
      flex: 1,
      color: 'gray',
    },
})
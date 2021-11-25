// Imports
import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';

export function Home ( props ) {

  const navigation = useNavigation()
  const [ listData, setListData ] = useState()

  // Go to sign in
  useEffect( () => {
   if(!props.auth) {
    navigation.reset({ index: 0, routes: [ {name: 'Signin'} ] })
   }
   console.log(props.user)
  }, [props.auth])

  // Get data
  useEffect( () => {
    setListData(props.data)
  }, [props.data])

  const data = { time: new Date().getTime(), user: Math.random() * 100 }

  const renderItem = ({item}) => (
    <View>
      <Text>
        {item.time}
      </Text>
    </View>
  )

  return(
    <View>
      <Text></Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={ () => { props.add('cities', data ) }}>
        <Text>Add something</Text>
      </TouchableOpacity>
      <FlatList data={listData} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColours.turquoise,
    padding: 10,
  },
})
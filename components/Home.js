import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';

export function Home ( props ) {
  const navigation = useNavigation()
  const [listData, setListData] = useState()

  useEffect( () => {
   if(!props.auth) {
    navigation.reset({ index: 0, routes: [ {name: 'Signin'} ] })
   }
  }, [props.auth])

  useEffect( () => {
      setListData(props.data)
  }, [props.data])

  const data = { time: new Date().getTime(), user: Math.random() * 100 }

  return(
    <View>
      <Text>Home</Text>
      <TouchableOpacity style={styles.button} onPress={ () => { props.add('cities', data ) }}>
        <Text>Add something</Text>
      </TouchableOpacity>
      <FlatList data={listData} renderItem={renderItem} keyExtractor={item FIXTHIS} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColours.turquoise,
    padding: 10,
  },
})
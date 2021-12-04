import React, {useEffect} from "react"
import { TabNavigation } from "./TabNavigation"
import { useNavigation } from "@react-navigation/core"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// This screen is a proxy screen to show only the Tabs Navigation component
export function TaskHome ( props ) {
  const navigation = useNavigation()
  const Tab = createBottomTabNavigator();

  useEffect( () => {
    if( !props.auth ) {
      navigation.reset({ index: 0, routes: [{ name: "Signin" }] });
    }
  })

  return <TabNavigation />
}
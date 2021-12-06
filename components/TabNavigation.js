import React, {useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllTasks } from "./AllTasks";
import { Home } from "./Home";
import { Settings } from "./Settings";

export function TabNavigation( props ) {
  const navigation = useNavigation()

  // Tab navigation component will control auth state and redirection
  useEffect( () => {
    if( !props.auth ) {
      navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
    }
  }, [props.auth] )

  const Tab = createBottomTabNavigator()

  return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Alltasks"
          options={{
            tabBarLabel: "All Tasks",
          }}
        >
          {(props) => <AllTasks {...props} data={props.data} />}
        </Tab.Screen>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
          }}
        />
      </Tab.Navigator>
  );
}

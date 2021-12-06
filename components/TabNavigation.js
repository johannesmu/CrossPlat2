import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllTasks } from "./AllTasks";
import { Home } from "./Home";
import { Settings } from "./Settings";

export function TabNavigation( props ) {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator>
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

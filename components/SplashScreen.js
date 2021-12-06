import React, {useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";

export function SplashScreen( props ) {
  const navigation = useNavigation()

  useEffect( () => {
    // set screenName depending on authentication state
    const screenName = ( props.auth ) ? "TabNavigation" : "Signup"
    // timer to change the route to Signup after a certain amount of time
    const timer = setTimeout( () => { 
      navigation.reset({ index: 0, routes: [{ name: screenName }] });
    }, parseFloat(props.time) )
  }, [props.auth] )


  return (
    <ImageBackground
      source={require("../resources/splash.png")}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

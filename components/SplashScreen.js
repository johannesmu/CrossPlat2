import React from "react";
import { ImageBackground } from "react-native";

export function SplashScreen() {
  return (
    <ImageBackground
      source={require("../resources/splash.png")}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

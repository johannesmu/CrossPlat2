import React from "react";
import { Text, View } from "react-native";

export function Feedback(props) {
  return (
    <View>
      <Text>{props.message}</Text>
    </View>
  );
}

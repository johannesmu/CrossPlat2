// Imports
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeColours } from "./ThemeColours";
import { Feedback } from "./Feedback";

export function Signin(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = () => {
    console.log("submitting");
    props.handler(email, password);
  };

  // Gome home after authentication
  useEffect(() => {
    if (props.auth === true) {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  }, [props.auth]);

  return (
    <View style={styles.container}>
      <Image source={require("../resources/icon.png")} style={styles.icon} />
      <Text style={styles.headerText}>Task-It Sign In</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inner}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(val) => setEmail(val)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity style={styles.button} onPress={submitHandler}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
          <Feedback message={props.error} />
        </View>
        <View style={styles.lower}>
          <Text style={styles.lowerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.lowerTextSignUp}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: ThemeColours.highlight,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 50,
  },
  icon: {
    display: "flex",
    width: 150,
    height: 150,
  },
  headerText: {
    display: "flex",
    fontSize: 30,
    fontFamily: "Copperplate",
    marginBottom: 2,
    color: "white",
  },
  inner: {
    display: "flex",
    backgroundColor: ThemeColours.highlight,
    paddingVertical: 50,
  },
  input: {
    backgroundColor: "white",
    fontSize: 16,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: 300,
  },
  button: {
    backgroundColor: ThemeColours.mainBackground,
    padding: 15,
    borderRadius: 10,
    width: 120,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: ThemeColours.highlight,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  lower: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 120,
  },
  lowerText: {
    fontSize: 16,
    color: "white",
  },
  lowerTextSignUp: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

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

export function Signup(props) {
  // Use states
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();

  // Email validation
  const validateEmail = (emailVal) => {
    if (emailVal.indexOf("@") > 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
    setEmail(emailVal);
  };

  // Password validation
  const validatePassword = (passwordVal) => {
    if (passwordVal.length >= 8) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
    setPassword(passwordVal);
  };

  const submitHandler = () => {
    props.handler(email, password);
  };

  useEffect(() => {
    if (validEmail && validPassword) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [validEmail, validPassword]);

  useEffect(() => {
    if (props.auth === true) {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  }, [props.auth]);

  return (
    <View style={styles.container}>
      <Image source={require("../resources/icon.png")} style={styles.icon} />
      <Text style={styles.headerText}>Task-It Sign Up</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inner}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(val) => validateEmail(val)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={(val) => validatePassword(val)}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirm password"
            style={styles.input}
            //onChangeText={(val) => validatePassword(val)}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={validForm ? styles.button : styles.buttonDisabled}
            disabled={validForm ? false : true}
            onPress={() => submitHandler()}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
          <Feedback message={props.error} />
        </View>
        <View style={styles.lower}>
          <Text style={styles.lowerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text style={styles.lowerTextSignUp}> Sign in</Text>
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
    backgroundColor: ThemeColours.cultured,
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
  buttonDisabled: {
    backgroundColor: "grey",
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
    marginTop: 70,
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

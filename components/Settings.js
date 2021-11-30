import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { ThemeColours } from "./ThemeColours";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faFont,
  faLanguage,
  faMoon,
  faCopyright,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

export function Settings() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
      <View style={styles.view}>
        <View style={styles.rowMiddle}>
          <FontAwesomeIcon icon={faMoon} size={30} />
          <Text style={styles.text}>Night theme</Text>
          <Switch />
        </View>
        <View style={styles.rowMiddle}>
          <FontAwesomeIcon icon={faLanguage} size={30} />
          <Text style={styles.text}>Language</Text>
          <FontAwesomeIcon icon={faChevronRight} size={20} />
        </View>
        <View style={styles.rowMiddle}>
          <FontAwesomeIcon icon={faFont} size={30} />
          <Text style={styles.text}>Font size</Text>
          <FontAwesomeIcon icon={faChevronRight} size={20} />
        </View>
        <View style={styles.rowMiddle}>
          <FontAwesomeIcon icon={faBell} size={30} />
          <Text style={styles.text}>Notifications</Text>
          <Switch />
        </View>
        <View style={styles.rowMiddle}>
          <FontAwesomeIcon icon={faCopyright} size={30} />
          <Text style={styles.text}>Privacy and Copyright</Text>
          <FontAwesomeIcon icon={faChevronRight} size={20} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("SplashScreen")}>
          <View style={styles.row}>
            <Text style={styles.text}>
              App info and version (splash screen)
            </Text>
            <FontAwesomeIcon icon={faChevronRight} size={20} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetText}>Reset all data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: ThemeColours.mainBackground,
    display: "flex",
    flex: 1,
  },
  view: {
    padding: 17,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    borderColor: ThemeColours.highlight,
    borderWidth: 1,
    backgroundColor: "white",
  },
  headerText: {
    color: ThemeColours.highlight,
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  rowMiddle: {
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
  resetButton: {
    padding: 13,
    backgroundColor: "tomato",
    borderRadius: 10,
    alignItems: "center",
    width: 150,
    alignSelf: "center",
  },
  resetText: {
    color: "white",
    fontSize: 16,
  },
});

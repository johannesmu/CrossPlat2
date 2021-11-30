import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeColours } from "./ThemeColours";

export function AllTasks() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>All tasks</Text>
      <View style={styles.view}>
        <View style={styles.rowMiddle}>
          <Text style={styles.text}>On-going Tasks</Text>
          <Text style={styles.text}>#</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Completed Tasks</Text>
          <Text style={styles.text}>#</Text>
        </View>
      </View>
      <View style={styles.view}>
        <Text style={{ color: "grey", fontSize: 16 }}>(other data)</Text>
      </View>
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
    paddingBottom: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
});

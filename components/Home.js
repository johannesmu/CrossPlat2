// Imports
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ThemeColours } from "./ThemeColours";
import { ListItem } from "./ListItem";
import { AllTasks } from "./AllTasks";
import { Settings } from "./Settings";

import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlusCircle,
  faCheckSquare,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

export function Home(props) {
  const navigation = useNavigation();
  const [listData, setListData] = useState();

  // Go to sign in
  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: "Signin" }] });
    }
    console.log(props.user);
  }, [props.auth]);

  // Get data
  useEffect(() => {
    setListData(props.data);
  }, [props.data]);

  const data = { time: new Date().getTime(), user: Math.random() * 100 };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.time}</Text>
    </View>
  );

  // CODE FROM PREVIOUS PROTOTYPE

  //const [data, setData] = useState([])
  const [validInput, setValidInput] = useState(false);
  const [input, setInput] = useState();
  const [appInit, setAppInit] = useState(true);
  const [sortAsc, setSortAsc] = useState(false);

  // useEffect ( () => {
  //   if(appInit){
  //     getData()
  //     setAppInit(false)
  //   }
  //   else {
  //     storeData()
  //   }
  // }, [data])  // Will only run if there is a change in data

  // Validate input
  const onTextChange = (value) => {
    setInput(value);
    if (value.length > 0) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  };

  // Add new task
  const onSubmit = () => {
    // const id = new Date().getTime().toString()
    // const item = {id: id, name: input, status: false}
    // setData([...data, item])
    // setInput(null)
    // setValidInput(false)
  };

  // Delete task
  const onDelete = (id) => {
    // let items = [...data]
    // let newData = items.filter( (item) => {
    //   if(item.id !== id){
    //     return item
    //   }
    // })
    // setData(newData)
  };

  // Set task's status (done/not done)
  const changeStatus = (id) => {
    let items = [...data];
    items.forEach((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
    });
    setData(items);
  };

  // // Retain data
  // const storeData = async() => {
  //   const stringified = JSON.stringify(data)
  //   try {
  //     await AsyncStorage.setItem("listData", stringified)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // // Get raved data
  // const getData  = async () => {
  //   try {
  //     const stringified = await AsyncStorage.getItem("listData")
  //     setData ( (stringified !== null) ? JSON.parse(stringified) : []   )
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }

  // Sort FlatList
  const sortData = () => {
    let items = [...data];
    if (sortAsc) {
      items.sort((item1, item2) => {
        return item1.id - item2.id;
      });
    } else {
      items.sort((item1, item2) => {
        return item2.id - item1.id;
      });
    }
    setData(items);
    setSortAsc(!sortAsc);
  };

  // Delete all tasks marked as completed
  const deleteAllCompleted = () => {
    let items = [...data];
    let newItems = items.filter((item) => {
      if (item.status == false) {
        return item;
      }
    });
    setData(newItems);
  };

  // FlatList's items
  const Renderer = ({ item }) => (
    <ListItem
      text={item.name}
      delete={onDelete}
      id={item.id}
      status={item.status}
      done={changeStatus}
    />
  );

  // Sort buttons code
  const SortButton = () => {
    if (sortAsc) {
      return (
        // Wrapping the icons in TouchableOpacity so they're easier to click on
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faSortAmountUp}
            size={25}
            style={{ color: "#3d5187" }}
            onPress={sortData}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faSortAmountDown}
            size={25}
            style={{ color: "#3d5187" }}
            onPress={sortData}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Tasks</Text>
          <SortButton />
        </View>
        <SearchBar
          lightTheme
          placeholder="Search"
          containerStyle={styles.searchContainerStyle}
          inputContainerStyle={{ backgroundColor: "white", fontSize: 16 }}
          // onChangeText={this.updateSearch}
          // value={search}
        />
        <View>
          <FlatList
            data={data}
            // keyExtractor={ (item) => item.id }
            // renderItem={Renderer}
          />
        </View>

        <View style={styles.addTask}>
          <FontAwesomeIcon
            style={{ color: "lightgrey" }}
            icon={faPlusCircle}
            size={25}
          />
          <TextInput
            style={styles.input}
            onChangeText={onTextChange}
            placeholder="New task"
            value={input}
            placeholderTextColor="silver"
          />
          <FontAwesomeIcon
            icon={faCheckSquare}
            size={35}
            //onPress={onSubmit}
            style={validInput ? styles.icon : styles.iconDisabled}
            disabled={validInput ? false : true}
          />
        </View>
      </View>
      <View style={styles.deleteAllContainer}>
        <TouchableOpacity onPress={deleteAllCompleted}>
          <Text style={styles.deleteAllText}>Delete all completed</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Button
          title="All Tasks test"
          onPress={() => navigation.navigate("Alltasks")}
        />
        <Button
          title="Settings test"
          onPress={() => navigation.navigate("Settings")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.add("users", data);
          }}
        >
          <Text>Add something</Text>
        </TouchableOpacity>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColours.turquoise,
    padding: 10,
  },

  container: {
    padding: 15,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: ThemeColours.mainBackground,
    //marginTop: Constants.statusBarHeight,
  },
  listContainer: {
    flex: 1,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: ThemeColours.highlight,
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  // Search bar
  searchContainerStyle: {
    backgroundColor: "transparent",
    padding: 0,
    marginBottom: 10,
  },
  // Add new task
  addTask: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    backgroundColor: ThemeColours.highlight,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  input: {
    color: "white",
    fontSize: 16,
    padding: 5,
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  icon: {
    color: "lightblue",
  },
  iconDisabled: {
    color: "grey",
  },
  // Delete all button
  deleteAllContainer: {
    backgroundColor: "tomato",
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  deleteAllText: {
    fontSize: 16,
    color: "white",
    padding: 15,
  },
});

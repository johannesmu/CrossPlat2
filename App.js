import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// My components
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { Home } from "./components/Home";
import { Signout } from "./components/Signout";
import { TabNavigation } from "./components/TabNavigation";
// Firebase imports
import { firebaseConfig } from "./Config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { AllTasks } from "./components/AllTasks";

// Initialise Firebase
const FBapp = initializeApp(firebaseConfig);
const FSdb = initializeFirestore(FBapp, { useFetchStreams: false });
const FBauth = getAuth();

const Stack = createNativeStackNavigator();

export default function App() {
  // Use states
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [signupError, setSignupError] = useState();
  const [signinError, setSigninError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    onAuthStateChanged(FBauth, (user) => {
      if (user) {
        setAuth(true);
        setUser(user);
        console.log("authed");
        if (!data) {
          getData();
        }
      } else {
        setAuth(false);
        setUser(null);
      }
    });
  });

  // Sign up code
  const SignupHandler = (email, password) => {
    setSignupError(null);
    createUserWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setAuth(true);
      })
      .catch((error) => {
        setSignupError(error.code);
      });
  };

  // Sign in code
  const SigninHandler = (email, password) => {
    signInWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setAuth(true);
        console.log(userCredential.user.uid);
      })
      .catch((error) => {
        const message = error.code.includes("/")
          ? error.code.split("/")[1].replace(/-/g, " ")
          : error.code;
        setSigninError(message);
      });
  };

  // Sign out code
  const SignoutHandler = () => {
    signOut(FBauth)
      .then(() => {
        setAuth(false);
        setUser(null);
      })
      .catch((error) => console.log(error.code));
  };

  // Add data from firebase
  const addData = async (FScollection, data) => {
    // Add data to a collection with automatic id
    //const ref = await addDoc(collection(FSdb, FScollection), data )
    const ref = await setDoc(
      doc(FSdb, `users/${user.uid}/documents/${new Date().getTime()}`),
      data
    );
    console.log(ref.id);
  };

  // Get data from firebase
  const getData = () => {
    console.log("...getting data", user);
    const FSquery = query(collection(FSdb, `users/${user.uid}/documents`));
    const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
      let FSdata = [];
      querySnapshot.forEach((doc) => {
        let item = {};
        item = doc.data();
        item.id = doc.id;
        FSdata.push(item);
      });
      setData(FSdata);
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" options={{ title: "Sign up" }}>
          {(props) => (
            <Signup
              {...props}
              handler={SignupHandler}
              auth={auth}
              error={signupError}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Signin" options={{ title: "Sign in" }}>
          {(props) => (
            <Signin
              {...props}
              auth={auth}
              error={signinError}
              handler={SigninHandler}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: "Home",
            headerRight: (props) => (
              <Signout {...props} handler={SignoutHandler} user={user} />
            ),
          }}
          component={TabNavigation}
        >
          {(props) => <Home {...props} auth={auth} add={addData} data={data} />}
        </Stack.Screen>
        <Stack.Screen
          name="Alltasks"
          options={{ headerTitle: "All Tasks" }}
          component={TabNavigation}
        >
          {(props) => (
            <AllTasks
            // {...props} auth={auth} add={addData} data={data}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Settings"
          options={{ headerTitle: "Settings" }}
          component={TabNavigation}
        >
          {(props) => (
            <Settings
            // {...props} auth={auth} add={addData} data={data}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

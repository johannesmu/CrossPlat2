import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// My components
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { Signout } from "./components/Signout";
import { TabNavigation } from "./components/TabNavigation";
import { SplashScreen } from "./components/SplashScreen";

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
import { ThemeColours } from "./components/ThemeColours";


// Initialise Firebase
const FBapp = initializeApp(firebaseConfig);
const FSdb = initializeFirestore(FBapp, { useFetchStreams: false });
const FBauth = getAuth();

const Stack = createNativeStackNavigator();

export default function App() {
  // Use states
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const [signupError, setSignupError] = useState();
  const [signinError, setSigninError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    onAuthStateChanged(FBauth, (user) => {
      if (user) {
        setAuth(true);
        setUser(user);
        //console.log(user.uid);
        // if (!data) {
        //   getData();
        // }
      } else {
        setAuth(false);
        setUser(null);
      }
    });
  });

  useEffect( () => {
    if( user && !data ) {
      getData()
    }
  }, [user] )

  // Firebase sign up handler
  const SignupHandler = (email, password) => {
    setSignupError(null);
    createUserWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setAuth(true);
        // Add user to the 'user' collection
        addUser(userCredential.user);
      })
      .catch((error) => {
        setSignupError(error.code);
      });
  };

  // Add user to Firebase collection 'users' with UID as documet name
  const addUser = async (user) => {
    await setDoc(doc(FSdb, "users", `${user.uid}`), {
      email: `${user.email}`,
    });
  };

  // Sign in code
  const SigninHandler = (email, password) => {
    signInWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setAuth(true);
        //console.log(userCredential.user.uid);
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

  // Get data from firebase
  const getData = () => {
    console.log('...data')
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
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
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
          name="TabNavigation"
          options={{
            headerTitle: "Home",
            headerRight: (props) => (
              <Signout {...props} handler={SignoutHandler} />
            ),
            headerStyle: {
              backgroundColor: ThemeColours.mainBackground,
            },
          }}
        >
          { (props) => <TabNavigation {...props} 
                        auth={auth} 
                        user={user}  
                        data={data}
                      /> }
        </Stack.Screen>
        {/* <Stack.Screen
          name="Home"
          options={{
            headerTitle: "Home",
            headerRight: (props) => (
              <Signout {...props} handler={SignoutHandler} user={user} />
            ),
            headerStyle: {
              backgroundColor: ThemeColours.mainBackground,
            },
          }}
        >
          {(props) => (
            <TaskHome
              {...props}
              auth={auth}
              //data={data}
            />
          )}
        </Stack.Screen> */}
        {/* <Stack.Screen
          name="Alltasks"
          options={{
            headerTitle: "All Tasks",
            headerStyle: {
              backgroundColor: ThemeColours.mainBackground,
            },
          }}
        >
          {(props) => <AllTasks {...props} />}
        </Stack.Screen> */}
        {/* <Stack.Screen
          name="Settings"
          options={{
            headerTitle: "Settings",
            headerStyle: {
              backgroundColor: ThemeColours.mainBackground,
            },
          }}
        >
          {(props) => <Settings {...props} />}
        </Stack.Screen> */}
        <Stack.Screen
          name="SplashScreen"
          options={{
            headerTitle: "App info",
            headerStyle: {
              backgroundColor: ThemeColours.mainBackground,
            },
            headerShown: false
          }}
        >
          {(props) => <SplashScreen {...props} time="3000" auth={auth}/>}
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

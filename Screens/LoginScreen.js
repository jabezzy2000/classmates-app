import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import { Alert } from 'react-native';


Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('cWrnoL69586jYWVZfCu3NUJUZnQwAEBXBzxAxf2h','5asERhXmcU16wX6GdALhKLfrCVliBFZi69CDotkv');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          value={username}
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          value={password}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity onPress={() => {signIn(username, password, navigation)}} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text
        >
        
      </TouchableOpacity>
      <Button
        style={styles.Button}
        onPress={() => {{navigation.navigate("SignUp")}}} 
        title= "sign up"
        placeholderTextColor = "003f5c">
      </Button>
      
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    height: 45,
    flex: 1,
    padding: 10,
    marginBottom: 10,
    marginLeft: 20,
    
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
    marginTop: 10,
    backgroundColor: "#00ffff",
  },
  Button: {
    backgroundColor: '00ffff',
    textAlign: "center",
    placeholderTextColor:'#003f5c',
    height: 10,
    width: 10,
    marginBottom: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
  },
  inputView: {
    backgroundColor: "#00ced1",
    borderRadius: 30,
    width: "70%",
    height: 60,
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
  },
});

async function signIn(username, password, navigation) {
  return await Parse.User.logIn(username, password)
  .then(async (loggedInUser) => {
    // logIn returns the corresponding ParseUser object
    Alert.alert(
      'Success!',
      `User ${loggedInUser.get('username')} has successfully signed in!`,
    );
    // To verify that this is in fact the current user, currentAsync can be used
    const currentUser = await Parse.User.currentAsync();
    console.log(loggedInUser === currentUser);
    // Navigation.navigate takes the user to the screen named after the one
    // passed as parameter
    navigation.navigate('Home');
    return true;
  })
  .catch((error) => {
    // Error can be caused by wrong parameters or lack of Internet connection
    Alert.alert('Error!', error.message);
    return false;
  });
}

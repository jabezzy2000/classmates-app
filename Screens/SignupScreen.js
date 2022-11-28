import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import { Alert } from 'react-native';



Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
Parse.initialize('cWrnoL69586jYWVZfCu3NUJUZnQwAEBXBzxAxf2h','5asERhXmcU16wX6GdALhKLfrCVliBFZi69CDotkv');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function SignUpScreen({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={username}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={password}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.signUpBtn}
      onPress={() => {addUser(username, password, navigation)}}>
        <Text style={styles.loginText}>Create account</Text>
      </TouchableOpacity>
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
  signUpBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
    marginTop: 10,
    backgroundColor: "#00ffff",
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

async function addUser(username, password, navigation) {
  return await Parse.User.signUp(username, password)
  .then((createdUser) => {
    // Parse.User.signUp returns the already created ParseUser object if successful
  
    Alert.alert(
      'Success!',
      `User ${createdUser.get('username')} was successfully created!`,
    );
    test(createdUser)
    // Navigation.navigate takes the user to the screen named after the one
    // passed as parameter
    navigation.navigate('Home');
    return true;
    
  })
  .catch((error) => {
    // signUp can fail if any parameter is blank or failed an uniqueness check on the server
    Alert.alert('Error!', error.message);
    return false;
  });
  
  }
  async function test(createdUser){
    const currentUser = await Parse.User.currentAsync();
    console.log(createdUser === currentUser);
  }


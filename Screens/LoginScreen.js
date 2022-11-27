import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';




Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
Parse.initialize('cWrnoL69586jYWVZfCu3NUJUZnQwAEBXBzxAxf2h','5asERhXmcU16wX6GdALhKLfrCVliBFZi69CDotkv');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          // value={username}
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity onPress={() => {{navigation.navigate("Home")}}} style={styles.loginBtn}>
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

async function addPerson(username, password) {
  try {
    //create a new Parse Object instance
    const newPerson = new Parse.User();
    //define the attributes you want for your Object
    newPerson.setUsername(username);
    newPerson.setPassword(password);
    //save it on Back4App Data Store
    await newPerson.save();
  } catch (error) {
    console.log('Error saving new person: ', error);
  }
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';




Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
Parse.initialize('cWrnoL69586jYWVZfCu3NUJUZnQwAEBXBzxAxf2h','5asERhXmcU16wX6GdALhKLfrCVliBFZi69CDotkv');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>This is the LogIn Screen Screen</Text>
      <StatusBar style="auto" />
      <Button
        style={{fontSize: 20, color: 'green'}}
        styleDisabled={{color: 'red'}}
        onPress={() => {addPerson()}} 
        title= "Press Me">
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
});

async function addPerson() {
  try {
    //create a new Parse Object instance
    const newPerson = new Parse.User();
    //define the attributes you want for your Object
    newPerson.setUsername("Donald");
    newPerson.setPassword("1234");
    //save it on Back4App Data Store
    await newPerson.save();
  } catch (error) {
    console.log('Error saving new person: ', error);
  }
}

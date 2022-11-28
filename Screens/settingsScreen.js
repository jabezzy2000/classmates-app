import React, {FC, ReactElement} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import Parse from 'parse/react-native';
import {StackActions} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';



export default function UserLogOut({navigation}){
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <TouchableOpacity onPress={() => {doUserLogOut(navigation)}} style={styles.logoutBtn}>
            <Text style={styles.loginText}>LOGOUT</Text
            >     
          </TouchableOpacity>
          </View>
        );

  async function doUserLogOut(navigation) {
    return await Parse.User.logOut()
      .then(async () => {
        // To verify that current user is now empty, currentAsync can be used
        const currentUser = await Parse.User.currentAsync();
        if (currentUser === null) {
          Alert.alert('Success!', 'No user is logged in anymore!');
        }
        // Navigation dispatch calls a navigation action, and popToTop will take
        // the user back to the very first screen of the stack
        navigation.navigate("Login");
        return true;
      })
      .catch((error) => {
        Alert.alert('Error!', error.message);
        return false;
      });
  };

  }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
          logoutBtn: {
            width: "80%",
            borderRadius: 25,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 100,
            marginTop: 10,
            backgroundColor: "#00ffff",
          }

    });

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';





export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>This is the LogIn Screen Screen</Text>
      <StatusBar style="auto" />
      <Button
        style={{fontSize: 20, color: 'green'}}
        styleDisabled={{color: 'red'}}
        onPress={() => {navigation.navigate("Home")}} 
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

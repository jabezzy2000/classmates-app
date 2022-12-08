import HomeScreen from "./Screens/Homescreen";
import SecondScreen from "./Screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ThirdScreen from "./Screens/ChatScreen";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignupScreen";
import  UserLogOut  from "./Screens/settingsScreen";


export default function App() {
  return (
    <NavigationContainer>
     <StackNavigator/>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
const heading = "Classmates"
export function StackNavigator(){
  return(<Stack.Navigator>
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options = {{title: "Login"}}
   />
    <Stack.Screen name="Home" component={HomeTab} 
      options = {{title: heading}}/>
      <Stack.Screen name="Profile" component={SecondScreen} 
      options = {{title: heading}}/>
      <Stack.Screen name="chat" component={ThirdScreen} 
      options = {{title: heading}}/>
      <Stack.Screen name = "SignUp" component = {SignUpScreen}
      options = {{title: heading}}/>
      <Stack.Screen name = "Settings" component = {UserLogOut}
      options = {{title: heading}}/>
</Stack.Navigator>);
}

const Tab = createBottomTabNavigator();
const HomeTab = () =>{
  return (
    <Tab.Navigator>
        <Tab.Screen
        name = "Home1"
        component={HomeScreen}
        options = {{title: "Home"}}/>
         <Tab.Screen
        name = "Chat"
        component={ThirdScreen}
        options = {{title: "Chat"}}/>
         <Tab.Screen
        name = "Profile"
        component={SecondScreen}
        options = {{title: "Profile"}}/>
        <Tab.Screen
        name = "settings"
        component={UserLogOut}
        options = {{title: "settings"}}/>
      </Tab.Navigator>
  );
} 



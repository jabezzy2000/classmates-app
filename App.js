import HomeScreen from "./Screens/HomeScreen";
import SecondScreen from "./Screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ThirdScreen from "./Screens/ChatScreen";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/Loginscreen";


export default function App() {
  return (
    <NavigationContainer>
     <StackNavigator/>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
export function StackNavigator(){
  return(<Stack.Navigator>
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options = {{title: "Login"}}
   />
    <Stack.Screen name="Home" component={HomeTab} 
      options = {{title: "Home"}}/>
      <Stack.Screen name="Profile" component={SecondScreen} 
      options = {{title: "Profile"}}/>
      <Stack.Screen name="chat" component={ThirdScreen} 
      options = {{title: "Chat"}}/>
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
      </Tab.Navigator>
  );
} 



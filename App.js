import HomeScreen from "./Screens/HomeScreen";
import SecondScreen from "./Screens/SecondScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ThirdScreen from "./Screens/ThirdScreen";

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
        name = "Home"
        component={HomeScreen}
        options = {{title: "Home"}}
        />
        <Tab.Screen
        name = "Chat"
        component={ThirdScreen}
        options = {{title: "Chat"}}
        />
        <Tab.Screen
        name = "Settings"
        component={SecondScreen}
        options = {{title: "Settings"}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  
  );
}



import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LudoBoardScreen from "../screens/LudoBoardScreen";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import { navigationRef } from "../helpers/NavigationUtil";

const Stack = createNativeStackNavigator();




const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={()=>({
            headerShown: false,
        })}>
            <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            <Stack.Screen  name="HomeScreen" component={HomeScreen}
            options={{
                animation:'fade',
            }}/>
            <Stack.Screen
            name='LudoBoardScreen'
            component={LudoBoardScreen}
            options={{
                animation:'fade',
            }}></Stack.Screen>
      </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation

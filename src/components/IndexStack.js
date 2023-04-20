import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import IndexScreen from '../screens/IndexScreen'
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack=createNativeStackNavigator();
export default function IndexStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Index" component={IndexScreen} options={{title:"Inicio"}}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title:"Iniciar sesión"}}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{title:"Registrarse"}}/>
        </Stack.Navigator>
    )
}
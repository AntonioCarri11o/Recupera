import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import NewPersonScreen from '../screens/NewPersonScreen'

const Stack= createNativeStackNavigator();

export default function NewPersonStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="newPerson" component={NewPersonScreen} options={{title:"Nuevo Contacto"}}/>
        </Stack.Navigator>
    )
}
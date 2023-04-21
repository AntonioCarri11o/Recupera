import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';;
import NotesScreen from '../screens/NotesScreen';

const Stack=createNativeStackNavigator();
export default function NotesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='notes' component={NotesScreen} options={{title:"Notas"}}/>
        </Stack.Navigator>
    )
}
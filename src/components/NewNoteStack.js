import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewNoteScreen from '../screens/NewNoteScreen';

const Stack=createNativeStackNavigator();

export default function NewNoteStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="newNote" component={NewNoteScreen} options={{title:"Nueva"}}/>
        </Stack.Navigator>
    )
}
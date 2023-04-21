import React, {useEffect, useState} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Icon} from 'react-native-elements'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import IndexStack from './IndexStack';
import NewPersonStack from './NewPersonStack';
import NewNoteStack from './NewNoteStack';
import NotesStack from './NotesStack';
import ProfileStack from './ProfileStack';

const Tab= createBottomTabNavigator();

export default function AppNavigation(){
    const [session, setSession]=useState(null)
    useEffect(()=>{const auth=getAuth(); onAuthStateChanged(auth,(user)=>{setSession(user? true:false);})},[])
    return session?(
        <Tab.Navigator screenOptions={({route})=>({headerShown:false, tabBarActiveTintColor:"grey", tabBarInactiveTintColor:"black", tabBarIcon:({color,size})=>showIcons(route,color,size)})}>
            <Tab.Screen
            name='IndexStack'
            component={IndexStack}
            options={{title:"Personas"}}/>
            <Tab.Screen 
            name='NewPersonStack'
            component={NewPersonStack}
            options={{title:"Nueva Persona"}}/>
            <Tab.Screen
            name='NewNoteStack'
            component={NewNoteStack}
            options={{title:"Nueva Nota"}}/>
            <Tab.Screen
            name='NotesStack'
            component={NotesStack}
            options={{title:"Notas"}}/>
            <Tab.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{title:"Perfil"}}/>
        </Tab.Navigator>        
    ):(<IndexStack/>)
}
function showIcons(route,color,size){
    let icono;
    if(route.name==="IndexStack"){
        icono="account-box-multiple";

    }
    if(route.name==="NewPersonStack"){
        icono="account-plus";
    }
    if(route.name==="NewNoteStack"){
        icono="note-plus";
    }
    if(route.name==="NotesStack"){
        icono="notebook";
    }
    if(route.name==="ProfileStack"){
        icono="account-circle"
    }
    return(
        <Icon type='material-community' name={icono} color={color} size={size}/>
    )
}
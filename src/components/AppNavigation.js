import React, {useEffect, useState} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Icon} from 'react-native-elements'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import IndexStack from './IndexStack';
import NewPersonStack from './NewPersonStack';

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
            options={{title:"Nueva Persona"}}
            />
        </Tab.Navigator>
    ):(<IndexStack/>)
}
function showIcons(route,color,size){
    let icono;
    if(route.name==="IndexStack"){
        icono="format-list-bulleted-square";

    }
    if(route.name==="NewPersonStack"){
        icono="account-plus";
    }
    if(route.name==="profile"){
        icono="account-outline";
    }
    return(
        <Icon type='material-community' name={icono} color={color} size={size}/>
    )
}
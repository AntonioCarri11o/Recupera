import React, {useEffect, useState} from "react";
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import {useNavigation} from '@react-navigation/native'
import LoginScreen from "./LoginScreen";
import { collection, onSnapshot,query, orderBy } from "@firebase/firestore";
import Person from "../components/person/Person";
import { database, firebaseApp } from "../utils/firebase";

export default function IndexScreen(){
    const [persons, setPersons]=useState([]);
    const [session, setSession]=useState(null);
    useEffect(()=>{const auth=getAuth(); onAuthStateChanged(auth,(user)=>{
        setSession(user ? true:false);
    })},[])
    useEffect(()=>{
        const collectionRef=collection(database,'persons');
        const q=query(collectionRef,orderBy('name','asc'));

        const unsuscribe=onSnapshot(q, querySnapshot=>{
            querySnapshot.docs.map(doc=>(console.log(doc.data())))
            setPersons(
                querySnapshot.docs.map(doc=>({
                    id:doc.id,
                    name:doc.data().name,
                    lastname:doc.data().lastname,
                    phone_number:doc.data().phone_number,
                    email:doc.data().email,
                }))
            )
        })
        return unsuscribe;
    },[])
    return session? (
        <SafeAreaView>
            <ScrollView>
                {persons.map(person => <Person key={person.id} {...person}/>)}
            </ScrollView>
        </SafeAreaView>
            
    ):<LoginScreen/>
}
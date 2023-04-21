import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { collection, onSnapshot, query,orderBy } from 'firebase/firestore';
import { database } from '../utils/firebase';
import Note from '../components/notes/Note';

export default function NotesScreen(){
    const [notes, setNotes]=useState([]);
    useEffect(()=>{
        const collectionRef=collection(database,'notes');
        const q=query(collectionRef,orderBy('title','asc'));

        const unsuscribe=onSnapshot(q,querySnapshot=>{
            querySnapshot.docs.map(doc=>(console.log(doc.data())))
            setNotes(
                querySnapshot.docs.map(doc=>({
                    id:doc.id,
                    title:doc.data().title,
                    content:doc.data().content
                })
                )
                
            )
        })
        return unsuscribe;
    },[])
    return(
        <SafeAreaView>
            <ScrollView>
                {notes.map(note=><Note key={note.id} {...note}/>)}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    
})
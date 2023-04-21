import React, {useState} from 'react';
import { StyleSheet,Text,View } from 'react-native';
import NewNoteForm from '../components/notes/NewNoteForm';
import { useNavigation } from '@react-navigation/native';

export default function NewNoteScreen(){
    return(
        <View>
            <NewNoteForm/>
        </View>        
    )
}
const styles=StyleSheet.create({

})
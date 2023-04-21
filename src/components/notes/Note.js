import React, { useState } from "react";
import { database } from "../../utils/firebase";
import { deleteDoc,doc,updateDoc } from "@firebase/firestore";
import { StyleSheet, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import Modal from "../common/Modal";
import UpdateNoteForm from "./UpdateNoteForm";

export default function Note({
    id,
    title,
    content
}){
    const [showModal,setShowModal]=useState(false);
    const [contained, setContained]=useState(null);
    const onClose=()=>{setShowModal((prevState)=>!prevState),setContained(<UpdateNoteForm close={onClose} id={id} title={title} content={content}/>)}

    return(
        <View style={styles.container} >
            <ListItem containerStyle={styles.row} onPress={onClose}>
             <Icon type="material-community" name="note" iconStyle={styles.icon}/>
             <View style={styles.column}>
                <Text style={styles.text}>{" "+title}</Text>
             </View>
            </ListItem>            
            <Modal visible={showModal} close={onClose}>{contained}</Modal>
        </View>
    )
}
const styles=StyleSheet.create({
    text:{
        fontSize:15
    },
    row:{
        flexDirection:'row',
        verticalAlign:'center',
        width:"100%",
    },
    column:{
        flexDirection:'column',
    },
    container:{
        backgroundColor:"#C8C8C8",
        marginLeft:20,
        marginRight:20,
        padding:0,
        verticalAlign:'center'
    },
    icon:{
        fontSize:45
    }
})
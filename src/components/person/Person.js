import React, { useState } from "react";
import { database } from "../../utils/firebase";
import { deleteDoc,doc,updateDoc } from "@firebase/firestore";
import { StyleSheet, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import Modal from "../common/Modal";
import UpdatePersonForm from "./UpdatePersonForm";

export default function Person({
    id,
    name,
    lastname,
    phone_number,
    email
}){
    const [showModal,setShowModal]=useState(false);
    const [contained,setContained]=useState(null);
    const onClose=()=>{setShowModal((prevState)=>!prevState),
        setContained(<UpdatePersonForm id={id}/>)};
    return(
        <View style={styles.container} >
            <ListItem containerStyle={styles.row} onPress={onClose}>
             <Icon type="material-community" name="account" iconStyle={styles.icon}/>
             <Text style={styles.text}>{" "+name+" "+lastname}</Text>
            </ListItem>            
            <Modal visible={showModal} close={onClose}>{contained}</Modal>
        </View>
        
    )
}
const styles=StyleSheet.create({
    text:{
        alignSelf:'center',
        fontSize:15
    },
    row:{
        flexDirection:'row',
        verticalAlign:'center',
        width:"100%",
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


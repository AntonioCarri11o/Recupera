import React ,{useState}from "react";
import {StyleSheet, Text,View} from 'react-native';
import { useNavigation } from "@react-navigation/core";
import NewPersonForm from "../components/person/NewPersonForm";


export default function NewPerson(){
    return(
        <View style={styles.contentForm}>
          <NewPersonForm/>        
        </View>
    )
}
const styles=StyleSheet.create({
    contentForm:{
        marginHorizontal:30,
      },
      text:{
        marginTop:15,
        marginHorizontal:10
      },
      textBtn:{
        fontWeight:"bold",
        color:"#0D5BD7"
      }
})
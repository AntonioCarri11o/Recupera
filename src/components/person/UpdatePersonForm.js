import React, { useState } from "react";
import {Input,Button, Icon}from 'react-native-elements';
import { StyleSheet,Text,View } from "react-native";
import {useFormik} from 'formik'
import * as yup from 'yup';
import {database} from '../../utils/firebase'
import {collection, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {useNavigation} from '@react-navigation/native'
export default function UpdatePersonForm(props){
    const navigation=useNavigation();
    const [name, setName]=useState(props.name);
    const [lastname, setLastname]=useState(props.lastname);
    const [phone_number,setPhone_Number]=useState(props.phone_number);
    const [email,setEmail]=useState(props.email);
    const onDelete=()=>{
        const docRef=doc(database,'persons',props.id);
        deleteDoc(docRef);
        props.close();
    }
    const formik=useFormik({
        initialValues:{
            name:name,
            lastname:lastname,
            phone_number:phone_number,
            email:email
        },
        validationSchema:yup.object({
            name:yup.string().required("Campo obligatorio"),
            lastname:yup.string().required("Campo obligatorio"),
            phone_number:yup.string().required("Campo obligatorio"),
            email:yup.string().required("Campo obligatorio"),
        }),
        validateOnChange:false,
        onSubmit:async(formValue)=>{
            try{
                const docRef=doc(database, 'persons',props.id)
                await updateDoc(docRef,{
                    name:name,
                    lastname:lastname,
                    phone_number:phone_number,
                    email:email
                })
                props.close();
            }catch(error){
                console.log(error);
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Error al Actualizar"
                })
            }
        }
    })
    return(
        <View style={styles.viewForm}>
            <Input placeholder="Nombre"
            value={name}
            containerStyle={styles.input}
            leftIcon={<Icon type="material-community" name="account" iconStyle={styles.icon}/>}
            onChangeText={(text)=>{formik.setFieldValue("name",text); setName(text)}}
            errorMessage={formik.errors.name}
            />
            <Input placeholder="Apellidos"
            value={lastname}
            containerStyle={styles.input}
            leftIcon={<Icon type="material-community" name="account" iconStyle={styles.icon}/>}
            onChangeText={(text)=>{formik.setFieldValue("lastname",text); setLastname(text)}}
            errorMessage={formik.errors.lastname}
            />
            <Input placeholder="Teléfono"
            value={phone_number}
            containerStyle={styles.input}
            leftIcon={<Icon type="material-community" name="phone" iconStyle={styles.icon}/>}
            onChangeText={(text)=>{formik.setFieldValue("phone_number",text); setPhone_Number(text)}}
            errorMessage={formik.errors.phone_number}
            />
            <Input placeholder="Email"
            value={email}
            containerStyle={styles.input}
            leftIcon={<Icon type="material-community" name="email" iconStyle={styles.icon}/>}
            onChangeText={(text)=>{formik.setFieldValue("email",text); setEmail(text)}}
            errorMessage={formik.errors.email}
            />
            <View style={styles.row}>
                <Button title="Eliminar" containerStyle={styles.containerBtn} buttonStyle={styles.btnDel}
                onPress={onDelete} loading={formik.isSubmitting} />                   
                <Button title="Actualizar" containerStyle={styles.containerBtn} buttonStyle={styles.btn}
                onPress={formik.handleSubmit} loading={formik.isSubmitting}/> 
             
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    viewForm:{
        marginTop:30
      },
      input:{
        width:"100%",
        margginTop:20
      },
      icon:{
        color:"#C1C1C1"
      },
      containerBtn:{
        width:"40%",
        margin:10,
        alignSelf:"center"
      },
      btn:{
        backgroundColor:"blue"
      },
      btnDel:{
        backgroundColor:"red",
      },
      row:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center',
      }
})
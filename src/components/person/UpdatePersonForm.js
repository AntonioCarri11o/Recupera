import React, {useState} from "react";
import {Input,Button, Icon}from 'react-native-elements';
import { StyleSheet,Text,View } from "react-native";
import {useFormik} from 'formik'
import * as yup from 'yup';
import {database} from '../../utils/firebase'
import {collection, addDoc} from 'firebase/firestore';
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {useNavigation} from '@react-navigation/native'
export default function UpdatePersonForm(props){
    const navigation=useNavigation();
    const formik=useFormik({
        initialValues:{
            name:"",
            lastname:"",
            phone_number:"",
            email:""
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
                await addDoc(collection(database,'persons'),formValue);
                navigation.navigate('Index')
            }catch(error){
                console.log(error);
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Error al registrar"
                })
            }
        }
    })
    return(
        <View style={styles.viewForm}>
            <Input placeholder="Nombre"
            value={props.name}
            containerStyle={styles.input}
            leftIcon={<Icon type="material-community" name="account" iconStyle={styles.icon}/>}
            onChangeText={text=>formik.setFieldValue("name",text)}
            errorMessage={formik.errors.name}
            />
            <Input placeholder="Apellidos"
            containerStyle={styles.input}
            leftIcon={<Icon type="material-community" name="account" iconStyle={styles.icon}/>}
            onChangeText={text=>formik.setFieldValue("lastname",text)}
            errorMessage={formik.errors.lastname}
            />
            <Input placeholder="Teléfono"
            containerStyle={styles.input}
            leftIcon={<Icon type="material-community" name="phone" iconStyle={styles.icon}/>}
            onChangeText={text=>formik.setFieldValue("phone_number",text)}
            errorMessage={formik.errors.phone_number}
            />
            <Input placeholder="Email"
            containerStyle={styles.input}
            leftIcon={<Icon type="material-community" name="email" iconStyle={styles.icon}/>}
            onChangeText={text=>formik.setFieldValue("email",text)}
            errorMessage={formik.errors.email}
            />
            <Button title="Actualizar" containerStyle={styles.containerBtn} buttonStyle={styles.btn}
            onPress={formik.handleSubmit} loading={formik.isSubmitting}/> 
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
        width:"95%",
        marginTop:20,
        alignSelf:"center"
    
      },
      btn:{
        backgroundColor:"blue"
      }
})
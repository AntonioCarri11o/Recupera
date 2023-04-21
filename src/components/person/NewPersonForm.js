import React, {useState} from "react";
import {Input,Button, Icon}from 'react-native-elements';
import { StyleSheet,Text,View } from "react-native";
import {useFormik} from 'formik'
import * as yup from 'yup';
import {database} from '../../utils/firebase'
import {collection, addDoc} from 'firebase/firestore';
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {useNavigation} from '@react-navigation/native'
/*
const [person, setPerson]=useState({
    name:"",
    lastname:"",
    phone_number:"",
    email:""
})
*/


export default function NewPersonForm(){
    const navigation=useNavigation();
    const [name,setName]=useState(null);
    const [lastname,setLastname]=useState(null);
    const [phone_number,setPhone_Number]=useState(null);
    const [email, setEmail]=useState(null);
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
                await addDoc(collection(database,'persons'),formValue);
                Toast.show({
                    type:'success',
                    position:'bottom',
                    text1:"Exito!",
                    text2:"Contacto añadido correctmente"
                })
                setName(null);
                setLastname(null);
                setPhone_Number(null);
                setEmail(null);
            }catch(error){
                console.log(error);
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Error",
                    text2:"Ha ocurrido un error al registrar"
                })
            }
        }
    })
    return(
        <View style={styles.viewForm}>
            <Text>Nuevo contacto</Text>
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
            <Button title="Registrar" containerStyle={styles.containerBtn} buttonStyle={styles.btn}
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
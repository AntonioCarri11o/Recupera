import React, {useState} from "react";
import { StyleSheet, Text,View } from "react-native";
import {Input, Button,Icon} from 'react-native-elements';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation} from '@react-navigation/native'

export default function LoginForm(){
    const [password, setPassword]= useState(false);
    const navigation=useNavigation();
    const showPass=()=>{
        setPassword(!password);
    };
    const formik=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema:yup.object({
            email:yup.string().email("Formato de email incorrecto").required("Campo obligatorio"),
            password:yup.string().required("Campo obligatorio")
        }),
        validateOnChange:false,
        onSubmit:async(formValue)=>{
            try{
                const auth=getAuth();
                await signInWithEmailAndPassword(
                    auth,formValue.email,formValue.password
                );
                navigation.navigate("Index");
            }catch(error){
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Usuario o contraseña incorrectos"
                })
            }
        }
    })
    return(
        <View style={styles.viewForm}>
            <Text>Iniciar sesión</Text>
            <Input placeholder="Correo"
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon}/>}
            onChangeText={text=>formik.setFieldValue("email",text)}/>

            <Input placeholder="Contraseña"
            secureTextEntry={password?false:true}
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name={password?'eye-off-outline':'eye-outline'} iconStyle={styles.icon} onPress={showPass}/>}
            onChangeText={text=>formik.setFieldValue("password",text)}
            errorMessage={formik.errors.password}
            />
            <Button title="Iniciar Sesión"
            containerStyle={styles.containerBtn}
            buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting}/>            
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
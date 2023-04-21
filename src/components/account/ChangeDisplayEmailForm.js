import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button,Icon} from 'react-native-elements'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Toast  from 'react-native-toast-message';
import {getAuth,reauthenticateWithCredential,EmailAuthProvider, updateEmail} from 'firebase/auth';


export default function ChangeDisplayEmailForm(props) {
    const {close,onReload}=props;
    const [password, setPassword] = useState(false);
    const  formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:yup.object({
            email:yup.string().email("Formato de email requerido").required("El email es obligatorio"),
            password:yup.string().required("La contraseña es obligatoria")
        }),
        validateOnChange:false,
        onSubmit: async(formValue)=>{
            try{
                const user=getAuth().currentUser;
                const credentials=EmailAuthProvider.credential(user.email,formValue.password);
                reauthenticateWithCredential(user,credentials);
                await updateEmail(user,formValue.email);
                onReload();
                close();
            }catch(error){
                console.log(error)
                Toast.show({    
                    type:"error",
                    position:"bottom",
                    text1:"Error al cambiar el email",
                })
            }
        }
        
    });
    const showPass=()=>{
        setPassword(!password);
    }
  return (
    <View>
        <Input placeholder='Email' rightIcon={{type:"material-community",
      name:"account-circle-outline",color:"#c2c2c2"}} 
      containerStyle={styles.input} 
      onChangeText={(text)=>formik.setFieldValue("email",text)} 
      errorMessage={formik.errors.email}/>
      <Input placeholder='Contraseña' 
        secureTextEntry={password ? false:true} 
        containerStyle={styles.input} rightIcon={{type:"material-community",
        name:password ? "eye-off-outline":"eye-outline",color:"#c2c2c2",onPress:showPass}} 
        onChangeText={(text)=>formik.setFieldValue("password",text)}
        errorMessage={formik.errors.password}/>
        <Button title={"Cambiar Email"} containerStyle={styles.btnContainer} buttonStyle={styles.btnStyle} onPress={formik.handleSubmit} loading={formik.isSubmitting}/>
    </View>
  )

}
const styles = StyleSheet.create({})
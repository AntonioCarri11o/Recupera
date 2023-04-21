import { StyleSheet, View } from 'react-native'
import React ,{useState}from 'react'
import { Input, Button} from 'react-native-elements'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Toast  from 'react-native-toast-message';
import {getAuth,updatePassword,reauthenticateWithCredential,EmailAuthProvider} from 'firebase/auth';

export default function ChangeDisplayPasswordForm(props) {
    const {close}=props;
    const [password, setPassword] = useState(false);
    const [newPassword,setNewPassword]=useState(false);
    const [repeatNewPassword,setRepeatNewPassword]=useState(false);
    const formik = useFormik({
        initialValues:{
          password:"",
          newPassword:"",
          repeatNewPassword:""
        },
        validationSchema:yup.object({
          password:yup.string().required("Contraseña obligatoria"),
          newPassword:yup.string().required("Nueva Contraseña Obligatoria"),
          repeatNewPassword:yup.string().required("Nueva Contraseña obligatoria").oneOf([yup.ref("newPassword")],"Las nuevas contraseñas deben ser iguales"),
        }),
        validateOnChange:false,
        onSubmit: async(formValue)=>{
          try {
            const user=getAuth().currentUser;
            const credentials=EmailAuthProvider.credential(user.email,formValue.password);
            reauthenticateWithCredential(user,credentials);
            await updatePassword(user,formValue.newPassword);
            close();
          } catch (error) {  
            Toast.show({
              type:"error",
              position:"bottom",
              text1:"Error al cambiar contraseña",
            })
          }
        }
      });

      const showPass=()=>{
        setPassword(!password);
    };
    const showNewPass=()=>{
        setNewPassword(!newPassword);
    }
    const showRepeatedPass=()=>{
        setRepeatNewPassword(!repeatNewPassword);
    }
  return (
    <View style={styles.viewForm}>
      <Input placeholder='Contraseña Actual' 
        secureTextEntry={password ? false:true} 
        containerStyle={styles.input} rightIcon={{type:"material-community",
        name:password ? "eye-off-outline":"eye-outline",color:"#c2c2c2",onPress:showPass}} 
        onChangeText={(text)=>formik.setFieldValue("password",text)}
        errorMessage={formik.errors.password}/>

        <Input placeholder='Nueva contraseña' 
        secureTextEntry={newPassword ? false:true} 
        containerStyle={styles.input} rightIcon={{type:"material-community",
        name:newPassword ? "eye-off-outline":"eye-outline",color:"#c2c2c2",onPress:showNewPass}} 
        onChangeText={(text)=>formik.setFieldValue("newPassword",text)}
        errorMessage={formik.errors.newPassword}/>

        <Input placeholder='Confirmar nueva contraseña' 
        secureTextEntry={repeatNewPassword ? false:true} 
        containerStyle={styles.input} rightIcon={{type:"material-community",
        name:repeatNewPassword ? "eye-off-outline":"eye-outline",color:"#c2c2c2",onPress:showRepeatedPass}} 
        onChangeText={(text)=>formik.setFieldValue("repeatNewPassword",text)}
        errorMessage={formik.errors.repeatNewPassword}/>
        <Button title={"Cambiar Contraseña"} containerStyle={styles.btnContainer} buttonStyle={styles.btnStyle} onPress={formik.handleSubmit} loading={formik.isSubmitting}/>
    </View>
  )
}

const styles = StyleSheet.create({})
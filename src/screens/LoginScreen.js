import React from "react";
import {View,Text,StyleSheet} from 'react-native'
import LoginForm from "../components/account/LoginForm";
import {useNavigation} from '@react-navigation/native'

export default function LoginScreen(){
    const navigation=useNavigation()
    const register=()=>{
        navigation.navigate('RegisterScreen')
    }
    return(
        <View>
            <View style={styles.contentForm}>
                <LoginForm/>
                <Text style={styles.text}>¿Aún no tienes cuenta?
                    <Text style={styles.txtBtn} onPress={register}>{" "}Registrate</Text>
                </Text>
            </View>
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
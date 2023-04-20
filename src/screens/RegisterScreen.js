import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import RegisterForm from '../components/account/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function RegisterScreen(){
    return(
        <KeyboardAwareScrollView>
            <View style={styles.viewForm}>
                <Text>Registrarse</Text>
                <RegisterForm/>
            </View>
        </KeyboardAwareScrollView>
    )
}
const styles=StyleSheet.create({
    viewForm:{
        marginHorizontal:30
      }
})
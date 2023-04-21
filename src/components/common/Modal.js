import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Modal(props){
    const {visible,close,children, type}=props;
    return type?(
        <Overlay isVisible={visible} onBackdropPress={close} overlayStyle={styles.overlay}>
            {children}
        </Overlay>
    ):<Overlay isVisible={visible} onBackdropPress={close} overlayStyle={styles.overlay}>
            <KeyboardAwareScrollView>
            {children}
            </KeyboardAwareScrollView>  
        </Overlay>

}
const styles=StyleSheet.create({
    overlay:{
        backgroundColor:"#fff",
        height:"auto",
        width:"90%"
    }
})
import React, {useState} from 'react';
import {Input,Button} from 'react-native-elements';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { database } from '../../utils/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function NewNoteForm(){
    const navigation=useNavigation();
    const [content, setContent]=useState(null);
    const [title,setTitle]=useState(null);
    const formik=useFormik({
        initialValues:{
            title:title,
            content:content
        },
        validationSchema:yup.object({
            title:yup.string().required("Campo obligatorio"),
            content:yup.string()
        }),
        validateOnChange:false,
        onSubmit:async(formValue)=>{
            try{
                await addDoc(collection(database,'notes'),formValue);
                navigation.navigate('newNote');
                Toast.show({
                    type:'success',
                    text1:'Exito',
                    text2:"Nota guardada con éxito",
                    position:'top',
                })
                setTitle(null);
                setContent(null);
            }catch(error){
                console.log(error);
                Toast.show({
                    type:"error",
                    position:"top",
                    text1:"Error al registrar"
                })
            }
        }
    })

    return(
        <View style={styles.content}>
            <Input
            value={title}
            placeholder='Título'
            onChangeText={(text)=>{formik.setFieldValue('title',text); setTitle(text);}}
            errorMessage={formik.errors.title}
            containerStyle={styles.input} style={styles.title}/>
            <TextInput
            value={content}
            multiline={true}
            onChangeText={(text)=>{formik.setFieldValue('content',text); setContent(text)}}
            numberOfLines={20}
            style={styles.note}/>
            <Button title="Guardar"
            containerStyle={styles.containerBtn}
            buttonStyle={styles.btn}
            onPress={formik.handleSubmit} loading={formik.isSubmitting}/>
        </View>
    )
}

const styles=StyleSheet.create({
    content:{
        margin:20,
    },
    input:{
        borderColor:"#C8C8C8",
        borderWidth:1,
        borderRadius:10,
        width:"100%",
    },
    title:{
        borderBottomWidth:0
    },
    note:{
        padding:5,
        justifyContent:'flex-start',
        textAlignVertical:'top',
        backgroundColor:"#C8C8C8",
        fontSize:20
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

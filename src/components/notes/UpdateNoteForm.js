import React, {useState} from 'react';
import {Input,Button} from 'react-native-elements';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { database } from '../../utils/firebase';
import { updateDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function UpdateNoteForm(props){
    const navigation=useNavigation();
    const [content, setContent]=useState(props.content);
    const [title,setTitle]=useState(props.title);
    const onDelete=()=>{
        const docRef=doc(database,'notes',props.id);
        deleteDoc(docRef);
        props.close();
    }
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
                const docRef=doc(database,'notes',props.id)
                await updateDoc(docRef,{title:title,content:content})
                props.close();
                Toast.show({
                    type:'success',
                    text1:'Exito',
                    text2:"Nota guardada con éxito",
                    position:'top',
                })
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
            <View style={styles.row}>
                <Button title="Eliminar"
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btnDel}
                onPress={onDelete}
                loading={formik.isSubmitting}            
                />
                <Button title="Guardar"
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}/>                
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    row:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center',
    },
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
        width:"40%",
        margin:10,
        alignSelf:"center"
      },
      btn:{
        backgroundColor:"blue"
      },
      btnDel:{
        backgroundColor:"red"
      }
})

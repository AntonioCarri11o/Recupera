import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Avatar,text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import {getAuth,updateProfile}from 'firebase/auth'
import {getStorage,ref,uploadBytes,getDownloadURL}from 'firebase/storage'

export default function ProfileInfo(props) {
    const{setTextLoading,setVisibleLoading} = props;
    const {uid, photoURL,displayName,email}=getAuth().currentUser;
    const [photo,setPhoto]=useState(photoURL);
    const changePhoto=async()=>{
        const result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[3,4]
        });
        if(!result.canceled)uploadPhoto(result.uri);
    };
    const uploadPhoto=async(uri)=>{
        setVisibleLoading(true)
        setTextLoading("Updating...");
        const response=await(fetch(uri));
        const blob=await response.blob();
        const storage =getStorage();
        const refStorage=ref(storage,`imgProfile/${uid}`);
        uploadBytes(refStorage,blob).then((snapshot)=>{
            updatePhoto(snapshot.metadata.fullPath);
        });
    }
    const updatePhoto=async(imgPath)=>{
        setTextLoading("Actualizando foto")
        const storage=getStorage();
        const refImg=ref(storage,imgPath);
        const urlImg= await getDownloadURL(refImg);
        const auth=getAuth();
        updateProfile(auth.currentUser,{photoURL:urlImg});
        setPhoto(urlImg);
        setVisibleLoading(false);

    }
  return (
    <View style={styles.viewPhoto}>
      <Avatar
      size="large"
      rounded={true}
      icon={{type:"material", name:"person"}}
      containerStyle={styles.avatar}
      source={{uri:photo}}
      >

        <Avatar.Accessory size={25} onPress={changePhoto}/>
      </Avatar>
      <View>
            <Text style={styles.nameUser}>{displayName||"USUARIO"}</Text>
            <Text>{email}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    viewPhoto:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        margin:20,
        paddingVertical:10,
        paddingHorizontal:5,
        backgroundColor:"#577AFF",
        borderRadius:10,
        width:"60%"
    },
    avatar:{
        marginRight:20,
        backgroundColor:"#0D5BD7"
    },
    nameUser:{
        fontWeight:"bold",
        paddingBottom:5,

    }
})
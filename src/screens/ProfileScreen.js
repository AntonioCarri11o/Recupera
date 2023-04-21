import React,{useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import {getAuth,signOut}from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
import ProfileOptions from '../components/account/ProfileOptions';
import ProfileInfo from '../components/account/ProfileInfo';

export default function ProfileScreen(){
    const navigation = useNavigation();
    const [visibleLoading, setVisibleLoading] = useState(false);
    const [textLoading,setTextLoading] = useState('');
    const [reload, setReload] =useState(false);
    const onReload=()=>setReload((prevState)=>!prevState);
    const cerrarSesion= async()=>{
        const auth=getAuth();
        console.log(auth);
        await signOut(auth);//elimina la sesion
        navigation.navigate('Index');
        
    }
    return(
        <View>
            <ProfileInfo setTextLoading={setTextLoading} setVisibleLoading={setVisibleLoading} onReload={onReload} />
            <ProfileOptions onReload={onReload}/>
            <Button
            title="Cerrar sesión"
            onPress={cerrarSesion}
            buttonStyle={styles.button}
            titleStyle={styles.title}/>
        </View>

    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#C80000",
        width:"80%",
        borderTopWidth:1,
        borderBottomWidth:1,
        borderTopColor:"#e3e3e3",
        borderBottomColor:"#e3e3e3",
        marginTop:30,
        alignSelf:"center",
        paddingVertical:10,

    },
    title:{
        color:"#fff"
    },
    cont:{
      color:"#000",
    }
})
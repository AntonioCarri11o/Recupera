import React, {useState} from 'react'
import {StyleSheet, Text, View } from 'react-native'
import Modal from '../common/Modal'
import {Icon, ListItem} from 'react-native-elements'
import {map} from 'lodash';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeDisplayEmailForm from './ChangeDisplayEmailForm';
import ChangeDisplayPasswordForm from './ChangeDisplayPasswordForm';
import Location from '../common/Location';

export default function ProfileOptions(props){
    const {onReload}=props;
    const [showModal, setshowModal] = useState(false);
    const [contained, setConteined] = useState(null);
    const onClose=()=>{setshowModal((prevState)=>!prevState)};
    const selectComponent=(key)=>{
        onClose();
        if(key==="map"){
            setConteined(<Location close={onClose}/>);
        }
        if(key==="displayName"){
            setConteined(<ChangeDisplayNameForm close={onClose} onReload={onReload}/>);
        }
        if(key==="email"){
            setConteined(<ChangeDisplayEmailForm close={onClose} onReload={onReload}/>);
        }
        if(key==="password"){
            setConteined(<ChangeDisplayPasswordForm close={onClose}/>);
        }
    }
    const optionsMenu=getOptions(selectComponent,onClose);
  return (
    <View>
      {map(optionsMenu,(option,index)=>(
        <ListItem key={index} onPress={option.onPress}>
            <Icon type='material-community'
            name={option.nameIconLeft}
            color={option.colorIcon} />
            <ListItem.Content>
                <ListItem.Title>{option.title}</ListItem.Title>
            </ListItem.Content>
            <Icon type={option.typeIcon}
            name={option.nameIconRight}
            color={option.colorIcon}/>
        </ListItem>
      ))}
        <Modal visible={showModal} close={onClose} type="map">{contained}</Modal>
    </View>
  )
}
function getOptions(selectComponent,onClose){
    return [
        {
            title:"Mapa",
            typeIcon:"material-community",
            nameIconLeft:"map",
            colorIcon:"#CCC",
            nameIconRight:"chevron-right",
            onPress:()=>selectComponent("map")
        },        
        {
            title:"Cambiar Nombre",
            typeIcon:"material-community",
            nameIconLeft:"account-circle",
            colorIcon:"#CCC",
            nameIconRight:"chevron-right",
            onPress:()=>selectComponent("displayName")
        },
        {
            title:"Cambiar Contraseña",
            typeIcon:"material-community",
            nameIconLeft:"lock-reset",
            colorIcon:"#CCC",
            nameIconRight:"chevron-right",
            onPress:()=>selectComponent("password")
        },
        {
            title:"Cambiar email",
            typeIcon:"material-community",
            nameIconLeft:"email",
            colorIcon:"#CCC",
            nameIconRight:"chevron-right",
            onPress:()=>selectComponent("email")
        }
    ]
}
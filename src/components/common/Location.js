import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import MapView,{Marker,Circle} from 'react-native-maps'

export default function Maps(props) {
    const {close}=props;
    const [region, setRegion] = useState(
        {
            latitude: 18.852885,
            longitude: -99.202924,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0521,            
        }
    )
  return (
    <View style={styles.viewContainer}>
        <MapView 
        style={styles.map}
        region={region}
        >
            <Marker
            key={1}
            coordinate={{latitude:18.852885, longitude:-99.202924}}
            title='Utez'
            description='Victoria magistraaaal!!'
            image={{uri:"https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png"}}
            >
            </Marker>
            <Circle
                radius={200}
                center={{latitude:18.852885, longitude:-99.202924}}
                strokeWidth={3}
                strokeColor='#0D5BD7'
                fillColor={"rgba(13,91,215,0.2)"}/>
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    viewContainer:{
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
        width:"auto",
        height:"auto",
        padding:0,
        marginBottom:-75
    },
    map:{
        width:"100%",
        height:"100%",
    }
})
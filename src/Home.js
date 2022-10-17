import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    TextInput,
}
    from 'react-native'

import auth from '@react-native-firebase/auth'
import Icon from "react-native-vector-icons/MaterialIcons";
import database from '@react-native-firebase/database'

export default function Home({ navigation, route }) {
    const [cuser, setcuser] = useState(route.params.user)

    const [id, setid] = useState();
    const [name, setname] = useState();
    const [position, setposition] = useState();
    const [users, setusers] = useState([])

    useEffect(()=>{
        const onloading = database().ref("users").on("value",(snapshot)=>{
            setusers([])
            snapshot.forEach((user)=>{
                setusers((before)=>[...before,user.val()])
            })
        })
        
        return()=>{
            database().ref("users").off('value',onloading)
        }

    },[])
    const addUser = () => {
        let key;
        if(id!=null)
        {
            key = id;
        }else{
            key = database().ref("users").push().key
        }
        let passingData = {
            id:key,
            name:name,
            position:position
        }
        database().ref("users/"+key).set(passingData)
        .then(()=>{
            Alert.alert('Data saved and added')
            setname('')
            setid('')
            setposition('')
        }).catch(()=>{
            Alert.alert("error occured")
        })

    }
    const deleteUser = (item) => {
        database().ref("users/"+item.id).remove();

    }
    const deleteAllUser = () => {
        database().ref("users").remove()
        Alert.alert('alert', 'all data deleted')
    }
    const changeUser = (item) => {
        setid(item.id)
        setname(item.name)
        setposition(item.position)

    }

    const signOut = () => {
        auth().signOut().
            then(
                Alert.alert('info', 'signed out successfully'),
                setcuser(null),
                navigation.navigate('Login')
            ).
            catch(
                (error) => {
                    Alert.alert(JSON.stringify(error))
                }
            )
    }


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home</Text>
            <TextInput value={name}placeholder="name" style={{ borderWidth: 1, width: 200 }} onChangeText={(text) => { setname(text) }} />
            <TextInput value={position}placeholder="position" style={{ borderWidth: 1, width: 200 }} onChangeText={(text) => { setposition(text) }} />
            <View style={{ flexDirection: 'row' }}>
                <Icon name="save" size={30} onPress={()=> addUser() } />
                <Icon name="delete" size={30} onPress={ deleteAllUser } />
                <Icon name='logout' size={35} color='lightblue' onPress={signOut} />
            </View>
            <View>
                {
                
                    users.map((item)=>{
                        return(
                            
                            <View key={item.id} style={{flexDirection:'row',width:'100%',backgroundColor:'white',width:200}} >
                                <Text>{item.name}</Text>
                                <Text>{item.position}</Text>
                              
                                <Icon name="delete" size={30} onPress={()=>deleteUser(item) }/>
                                <Icon name='logout' size={30} onPress={()=>changeUser(item)} />
                                
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}
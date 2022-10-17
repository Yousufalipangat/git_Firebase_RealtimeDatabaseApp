import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import database from '@react-native-firebase/database'
import auth from "@react-native-firebase/auth";
import {
    Button,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
}
    from 'react-native'

const reference = database().ref('userData');

export default function Register() {
    const [focused, setfocused] = useState([false, false])
    const naviagtion = useNavigation();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [user, setUser] = useState()
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(
            (user) => {
                setUser(user);
            }
        )
        return subscriber;
    }, [])

    
    const signUp = () => {
        auth().createUserWithEmailAndPassword(email, password)
            .then((snapshot) => {
                Alert.alert('successfully signed up')
                naviagtion.navigate('Home',{user:snapshot.user})
                
            }
            ).catch((error) => {
                Alert.alert(JSON.stringify(error.message))
            }
            )
        }
      
        return (
            <View style={style.container}>
                <View style={{ width: 350, height: 300, justifyContent: 'center', alignItems: 'center' }}>

                    <TextInput
                        placeholder="E-mail"
                        
                        onChangeText={(text) => setemail(text)}

                        style={focused[0] ? style.focusedInputText : style.nonFocusedInputText} onFocus={() => setfocused([true, false])} />


                    <TextInput
                        placeholder="Password"
                        maxLength={10}
                        onChangeText={(text) => setpassword(text)}
                        secureTextEntry={true}
                        style={focused[1] ? style.focusedInputText : style.nonFocusedInputText} onFocus={() => setfocused([false, true])} />
                    <TouchableOpacity
                        onPress={signUp}
                        style={{ backgroundColor: '#1f8dba', width: '60%', borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#87CEEB', marginTop: 10, width: '60%', borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => naviagtion.navigate('Login')}
                    >
                        <Text style={{ color: 'white' }}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    
}
const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',


    },
    focusedInputText: {
        width: '60%',
        borderWidth: 2,
        marginVertical: 10,
        borderRadius: 7,
        borderColor: '#1f8dba',
        paddingLeft: 10

    },
    nonFocusedInputText: {
        width: '60%',
        borderWidth: 2,
        marginVertical: 10,
        borderRadius: 7,
        borderColor: '#ddd',
        paddingLeft: 10
    }

})
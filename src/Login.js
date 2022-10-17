import React, { useState } from "react";
import auth from '@react-native-firebase/auth'
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

export default function Login({navigation}){

const [focused,setfocused] = useState([false,false])
const [email, setemail] = useState('');
const [password, setpassword] = useState('');
const signIn=()=>{
auth().signInWithEmailAndPassword(email,password)
.then((snapshot)=>{
    Alert.alert('info','signed in successfully')
   
    navigation.navigate('Home',{user:[snapshot.user]})
}
).catch((error)=>{
    Alert.alert(error.message)
}

)

}

    return(
        <View style={style.container}>
            <View style={{width:350,height:300,justifyContent:'center',alignItems:'center'}}>
                <TextInput 
                placeholder="User ID"
                onChangeText={(text) => setemail(text)}
                
                style={focused[0]?style.focusedInputText:style.nonFocusedInputText} onFocus={()=>setfocused([true,false])} />
                <TextInput 
                placeholder="Password"
                maxLength={10}
                onChangeText={(text) => setpassword(text)}
                secureTextEntry={true}
                style={focused[1]?style.focusedInputText:style.nonFocusedInputText} onFocus={()=>setfocused([false,true])}/>
                <TouchableOpacity
                onPress={signIn}
                style={{backgroundColor:'#1f8dba',width:'60%',borderRadius:10,height:50,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white'}}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',


    },
    focusedInputText:{
        width:'60%',
        borderWidth:2,
    marginVertical:10     ,
    borderRadius:7,  
    borderColor:'#1f8dba' ,
    paddingLeft:10

    },
    nonFocusedInputText:{
        width:'60%',
        borderWidth:2,
    marginVertical:10     ,
    borderRadius:7,  
    borderColor:'#ddd' ,
    paddingLeft:10
}

})
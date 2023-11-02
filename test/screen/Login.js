import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Button } from "react-native-elements";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../firebase/firebaseconfig";

export default function Login({navigation}) {
      const [email, setEmail] = useState('');
      const [password, setpassword] = useState('');

      const loginUser = async () => {
        signInWithEmailAndPassword(authentication, email, password)
        .then(()=> console.log('user logged in'))
      }
      useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
          if(user){
            navigation.navigate('Home')
          }else{
            console.log('no user')
            navigation.canGoBack() && navigation.popToTop();
          }
        })
      }, [])

    return(
        <View style = {styles.container}>
            <Input
                placeholder='Enter email'
                label='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                leftIcon={{type: 'material', name: 'email'}}
                />
            <Input
                placeholder='Enter pass'
                label='pass'
                value={password}
                onChangeText={text => setpassword(text)}
                leftIcon={{type: 'material', name: 'lock'}}
                secureTextEntry
                />
                <Button
                style={styles.btn}
                title='Login'
                onPress={loginUser}
                //onPress={() => navigation.navigate('Home')}
                />
                <Button
                style={styles.btn}
                onPress={() => navigation.navigate('Register')}
                title='SignUp'
                />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    btn:{
      marginTop: 10
    }
  });
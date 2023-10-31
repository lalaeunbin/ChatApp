import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { authentication, db } from "../firebase/firebaseconfig";

export default function Home() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const docsRef = collection(db, 'users');
        const q = query(docsRef, where('userUID', '!=', authentication?.currentUser?.uid));
        const docsSnap = onSnapshot(q,(onSnap) => {
            let dat = [];
            onSnap.docs.forEach(user => {
                data.push([...user.data()])
                setUsers(data)
                console.log(user.data())
            })
        })
    }
    useEffect(() => {
        getUsers();
    },[])
    
    return (
        <View><Text>Home Page</Text></View>
    )
}

const styles = StyleSheet.create({})

//import { FlatList } from "react-native-web";
//import { Button, ListItem } from "react-native-elements";
//import { Navigation } from "react-native-navigation";
/**
 * export default function Home({Navigation}) {
    
    const [users, setUsers] = useState([]);

    const docsSnap = onSnapshot(q, (onSnap) => {
        let data = [];
        onSnap.docs.forEach(user => {
            data.push({...user.data()})
            setUsers(data)
            console.log(user.data())

        })
    })
    const getUsers = async () => {
        const docsRef = collection(db, 'users');
        const q = query(docsRef, where('userUID', '!=', authentication?.currentUser?.uid));
    }
}
   <>
            <FlatList
            dat={users}
            key={user => user.email}
            renderItem={({item}) =>
            <ListItem
            onPress={() => Navigation.navigate('Chat')}
            title={item.username}
            subTitle={item.email}
            image={item.avaterUrl}
            />
            }
            />
            <Button
            title='Logout'
            onPress={logoutUser}
            />
        </>
 */
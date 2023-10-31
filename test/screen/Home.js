import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { authentication, db } from "../firebase/firebaseconfig";
import { FlatList } from "react-native-web";
import { ListItem } from "../components/ListItem";

export default function Home() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const docsRef = collection(db, 'users');
        const q = query(docsRef, where('userUID', '!=', authentication?.currentUser?.uid));
        const docsSnap = onSnapshot(q,(onSnap) => {
            let data = [];
            onSnap.docs.forEach(user => {
                data.push({...user.data()})
                setUsers(data)
                console.log(user.data())
            })
        })
    }
    useEffect(() => {
        getUsers();
    },[])
    
    return (
        <FlatList
            data={users}
            key={user => user.email}
            renderItem={({item}) =>
            <ListItem
            //onPress={() => Navigation.navigate('Chat',{name: item.username, uid:item.userUID})}
            title={item.name}
            subTitle={item.email}
            image={item.avaterUrl}
            />
            }
        />
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

//<View><Text>Home Page</Text></View>
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
            data={users}
            key={user => user.email}
            renderItem={({item}) =>
            <ListItem
            onPress={() => Navigation.navigate('Chat',{name: item.username, uid:item.userUID})}
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
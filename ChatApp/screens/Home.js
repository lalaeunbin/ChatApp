import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { authentication, db } from "../firebase/firebaseconfig";

export default function Home() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const docsRef = collection(db, 'users');
        const q = query(docsRef, where('userUID', '!=', authentication?.currentUser?.uid));
        const docsSnap = onSnapshot(q, (onSnap) => {
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
         <View>
            <Text>Tdlkfjadslk</Text>
         </View>
    )
}
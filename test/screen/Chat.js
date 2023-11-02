import React, {useState, useEffect, useCallback} from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, Text, view, ScrollView, Button } from "react-native";
import { authentication } from "../firebase/firebaseconfig";
import { text } from "react-native-communications";
import { addDoc, collection, serverTimestamp, doc, query, onSnapshot, orderBy} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

export default function Chat({route}) {
  const uid = route.params.uid
  const [messages, setMessages] = useState([]);
  const currentUser = authentication?.currentUser?.uid;

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  useEffect(() => {
    const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;
    const docref = doc(db, 'chatrooms', chatId);
    const colRef = collection(docref, 'messages');
    const q = query(colRef, orderBy('createdAt', "desc"));
    const docSnap = onSnapshot(q, (onSnap) => {
    const allMsg =  onSnap.docs.map(mes => {
      if(mes.data().createdAt){
        return{
          ...mes.data(),
          createdAt: mes.data().createdAt.toDate()
        }
      }
      else{
        return{
          ...mes.data(),
          createdAt: new Date()
        }
      }
        
        
      })
      setMessages(allMsg)
    })


  },[])

  const onSend = useCallback((messagesArray = []) => {
    const msg = messagesArray[0];
    // console.log(myMsg)
    const myMsg = {
      ...msg,
      sentBy:currentUser,
      sendTo: uid
      //chatrooms/1233431242
    }
    //console.log(myMsg)
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))
    const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;

    const docref = doc(db, 'chatrooms', chatId);
    const colRef = collection(docref, 'messages');
    const chatSnap = addDoc(colRef, {
      ...myMsg,
      createdAt: serverTimestamp(),
    })

  }, [])
    return (
      <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: currentUser,
      }}
    />
    )
}

  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  /*
  export default function Chat({route}) {
  const uid = route.params.uid
  const [messages, setMessages] = useState([]);
  const currentUser = authentication?.currentUser?.uid;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  const onSend = useCallback((messagesArray = []) => {
    const msg = messagesArray[0];
    const myMsg = {
      msg,
      sentBy: currentUser,
      sentTo:uid
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))
    const chatId = uid > curr
  }, [])
    return (
      <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: currentUser
      }}
    />
    )
    }
  {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
  */
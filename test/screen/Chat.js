import React, {useState, useEffect, useCallback} from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, Text, view, ScrollView, Button } from "react-native";
import { authentication } from "../firebase/firebaseconfig";
import { text } from "react-native-communications";

export default function Chat() {
  const [messages, setMessages] = useState([])

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
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    )
  }, [])
    return (
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
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
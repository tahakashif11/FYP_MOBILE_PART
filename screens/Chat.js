import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import * as ImagePicker from 'expo-image-picker';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'chats'), orderBy('createdAt', 'desc')),
      querySnapshot => {
        console.log('querySnapshot unsubscribe');
        const newMessages = querySnapshot.docs.map(doc => {
          const messageData = doc.data();
          return {
            _id: doc.id,
            createdAt: messageData.createdAt?.toDate() || new Date(),
            text: messageData.text,
            user: messageData.user,
            image: messageData.image
          };
        });
        setMessages(newMessages);
      }
    );

    return unsubscribe;
  }, []);

  const handleSend = useCallback(
    async messages => {
      try {
        const message = messages[0];
        const { _id, createdAt, text, user, image } = message;

        const messageData = {
          _id,
          createdAt: serverTimestamp(),
          text: text || '', // Ensure text is not undefined
          user,
          image: image || null // Set image to null if undefined
        };

        await addDoc(collection(db, 'chats'), messageData);
      } catch (error) {
        console.log('Error sending message: ', error);
      }
    },
    []
  );

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        const image = result.assets[0].uri;
        const imageMessage = {
          _id: new Date().getTime().toString(),
          createdAt: new Date(),
          user: {
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          },
          image
        };
        handleSend([imageMessage]);
      }
    }
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopColor: colors.lightGray,
          backgroundColor: colors.white
        }}
        primaryStyle={{ alignItems: 'center' }}
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: 'https://i.pravatar.cc/300'
      }}
      renderInputToolbar={renderInputToolbar}
      renderActions={() => (
        <TouchableOpacity
          onPress={handleImagePick}
          style={{ marginBottom: 5, marginRight: 5 }}
        >
          <AntDesign name="plus" size={24} color={colors.gray} />
        </TouchableOpacity>
      )}
    />
  );
}

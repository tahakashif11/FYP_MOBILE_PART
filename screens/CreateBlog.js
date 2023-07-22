import React, { useState, useEffect } from 'react';
import {
   View,
   TextInput,
   Text,
   StyleSheet,
   Image,
   ScrollView,
   TouchableOpacity,
} from 'react-native';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {
   getAuth,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   onAuthStateChanged,
} from 'firebase/auth';
import {
   getFirestore,
   doc,
   setDoc,
   getDoc,
   updateDoc,
   collection,
   addDoc,
   serverTimestamp,
} from 'firebase/firestore';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { globalStyles } from '../utils/globalStyles';

let oldCoverImageURL;

export default function CreateBlog({ navigation, route }) {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [coverImg, setCoverImg] = useState(null);

   let id = route.params?.id;
   const uid = getAuth().currentUser.uid;

   useEffect(() => {
      if (id) {
         getBlogData(id);
      }
   }, [id]);

   function onUploadImage() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.addEventListener('change', (e) => {
         const file = e.target.files[0];
         setCoverImg(file);
      });
      input.click();
   }

   function onCheck() {
      if (id) {
         onUpdate(id);
         return;
      }
      onCreate();
   }

   async function getDownloadURL(uid, imageName) {
      const storageRef = ref(getStorage(), `${uid}/images/${imageName}`);
      const snapshot = await uploadBytes(storageRef, coverImg);
      return snapshot.ref.getDownloadURL();
   }

   async function onCreate() {
      if (!title && !content) {
         return false;
      }
      navigation.navigate('Home');

      try {
         const downloadURL = await getDownloadURL(uid, coverImg.name);

         const docRef = await addDoc(collection(getFirestore(), 'usersBlog', uid, 'blogs'), {
            title,
            content,
            coverImage: downloadURL,
            createdAt: serverTimestamp(),
         });

         console.log('Document written with ID: ', docRef.id);
      } catch (error) {
         console.log(error);
      }
   }

   async function onUpdate(id) {
      navigation.navigate('Home');
      try {
         let downloadURL = oldCoverImageURL;

         if (oldCoverImageURL !== coverImg.name) {
            downloadURL = await getDownloadURL(uid, coverImg.name);
         }

         const blogRef = doc(getFirestore(), 'usersBlog', uid, 'blogs', id);
         await updateDoc(blogRef, {
            title,
            content,
            coverImage: downloadURL,
            lastUpdate: serverTimestamp(),
         });

         console.log('Document updated with ID: ', id);
      } catch (error) {
         console.log(error);
      }
   }

   function getBlogData(id) {
      const blogRef = doc(getFirestore(), 'usersBlog', uid, 'blogs', id);
      getDoc(blogRef)
         .then((snapshot) => {
            const data = snapshot.data();
            setTitle(data.title);
            setContent(data.content);
            setCoverImg(data.coverImage);
            oldCoverImageURL = data.coverImage;
         })
         .catch((error) => console.log(error));
   }
   return (
      <ScrollView
         style={globalStyles.primaryContainer}
         keyboardShouldPersistTaps={'always'}
      >
         <Text style={{ ...globalStyles.headingText, margin: 10 }}>Create A Blog</Text>
         <View
            style={styles.inputContainer}
         >
            <Text style={styles.label}>Title</Text>
            <TextInput
               style={styles.input}
               multiline={true}
               numberOfLines={2}
               value={title}
               onChangeText={(text) => setTitle(text)}
            />
         </View>

         <View
            style={styles.inputContainer}
         >
            <Text style={styles.label}>Content</Text>
            <TextInput
               style={styles.input}
               multiline={true}
               numberOfLines={10}
               value={content}
               onChangeText={(text) => setContent(text)}
               underlineColorAndroid='transparent'
            />
         </View>

         <View style={{ flexDirection: 'row', margin: 20 }}>
            <Image
               style={styles.image}
               source={{ uri: coverImg }}
               resizeMode='cover'
            />
            <TouchableOpacity
               style={styles.touchabelBtn}
               onPress={onUploadImage}
            >
               <Text style={globalStyles.btnText}>Upload Cover Image</Text>
            </TouchableOpacity>
         </View>

         <FontAwesome
            name='check-circle'
            color='purple'
            size={44}
            style={styles.uploadBtn}
            onPress={onCheck}
         />
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   input: {
      borderWidth: 1,
      borderColor: 'gray',
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 2,
      padding: 10,
      textAlignVertical: 'top',
      fontSize: 16

   },
   label: {
      fontSize: 18,
      margin: 10,
      fontFamily: 'Nunito-Regular',

   },
   touchabelBtn: {
      ...globalStyles.primaryTouchableBtn,
      width: 200,
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center'
   },
   image: {
      width: 50,
      height: 50,
   },
   uploadBtn: {
      position: 'absolute',
      top: 10,
      right: 10,
      shadowOffset: {
         width: 1,
         height: 2
      },
      shadowOpacity: 0.5,
      elevation: 10,
   }
})
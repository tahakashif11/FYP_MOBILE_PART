import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { db, collection, addDoc, serverTimestamp } from '../firebase';

const HomeBlog = () => {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [feedback, setFeedback] = useState(null);

   const handleCreateBlog = async () => {
      try {
         if (!title || !content) {
            setFeedback('Please enter a title and content');
            return;
         }

         if (title.length > 50) {
            setFeedback('The title is too long');
            return;
         }

         const blogRef = collection(db, 'blogs');
         await addDoc(blogRef, {
            title: title,
            content: content,
            createdAt: serverTimestamp(),
         });

         setTitle('');
         setContent('');
         setFeedback('Blog created successfully');
      } catch (error) {
         console.log('Error while creating blog:', error);
         setFeedback('Error while creating blog');
      }
   };

   const handleCancel = () => {
      setTitle('');
      setContent('');
      setFeedback(null);
   };

   return (
      <View style={styles.container}>
         <View style={styles.field}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
               style={styles.input}
               placeholder="Enter title"
               value={title}
               onChangeText={(text) => setTitle(text)}
            />
         </View>
         <View style={styles.field}>
            <Text style={styles.label}>Content:</Text>
            <TextInput
               style={[styles.input, styles.multiline]}
               placeholder="Enter content"
               value={content}
               onChangeText={(text) => setContent(text)}
               multiline={true}
               numberOfLines={5}
            />
         </View>
         <View style={styles.buttons}>
            <Button title="Create Blog" onPress={handleCreateBlog} />
            <Button title="Cancel" onPress={handleCancel} color="grey" />
         </View>
         {feedback && <Text style={styles.feedback}>{feedback}</Text>}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      padding: 20,
   },
   field: {
      marginBottom: 10,
   },
   label: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
   },
   input: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
   },
   multiline: {
      height: 100,
      textAlignVertical: 'top',
   },
   buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
   },
   feedback: {
      marginTop: 10,
      color: 'green',
   },
});
export default HomeBlog;
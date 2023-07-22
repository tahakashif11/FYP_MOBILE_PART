import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db, collection, query, onSnapshot } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(db, 'blogs'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setBlogs(docs);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleBlogPress = (blog) => {
    navigation.navigate('BlogDetail', { blog });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleBlogPress(item)}>
      <View style={styles.blog}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  blog: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});

export default BlogList;

import React from 'react';
import { View, Text } from 'react-native';

const BlogDetail = ({ route }) => {
  const { blog } = route.params;

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        {blog.title}
      </Text>
      <Text style={{ fontSize: 18 }}>{blog.content}</Text>
    </View>
  );
};

export default BlogDetail;

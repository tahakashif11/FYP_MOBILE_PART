// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function NotificationScreen() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const getSavedNotifications = async () => {
//       try {
//         const savedNotifications = await AsyncStorage.getItem('notifications');
//         if (savedNotifications) {
//           setNotifications(JSON.parse(savedNotifications));
//         }
//       } catch (error) {
//         console.log('Error retrieving notifications:', error);
//       }
//     };

//     getSavedNotifications();
//   }, []);

//   const renderNotification = ({ item }) => (
//     <View>
//       <Text>{item.title}</Text>
//       <Text>{item.body}</Text>
//     </View>
//   );

//   return (
//     <View>
//       <Text>Previous Notifications</Text>
//       {notifications.length > 0 ? (
//         <FlatList
//           data={notifications}
//           renderItem={renderNotification}
//           keyExtractor={(item) => item.identifier}
//         />
//       ) : (
//         <Text>No notifications available</Text>
//       )}
//     </View>
//   );
// }
import React from 'react';
import { View } from 'react-native';
import {  WebView } from 'react-native-webview';



const NotificationScreen = () => {
  // Extract the video ID from the YouTube URL
  const videoId = 'bPrdwzjmocs';

  return (
    <View style={{ flex: 1 }}>
      <YouTubeVideo videoId={videoId} />
    </View>
  );
};
const YouTubeVideo = ({ videoId }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: videoUrl }}
        allowsFullscreenVideo
        scalesPageToFit
      />
    </View>
  );
};

export default NotificationScreen;
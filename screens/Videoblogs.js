// import React from 'react';
// import { View, ScrollView, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const videos = [
//   { id: 'xNQlkEXHwW0', title: 'The ULTMATE 1' },
//   { id: '1mlN0yuxoLE', title: 'Video 2' },
//   { id: 'RoxKbyst0To', title: 'Video 3' },
//   { id: 'lo792RZ245Y', title: 'Video 4' },
//   { id: '5p5DgAigceU', title: 'Video 5' },
// ];

// const Videoblogs = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {videos.map((video) => (
//         <View key={video.id} style={styles.videoContainer}>
//           <YouTubeVideo videoId={video.id} />
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const YouTubeVideo = ({ videoId }) => {
//   const videoUrl = `https://www.youtube.com/embed/${videoId}`;

//   return (
//     <WebView
//       style={styles.webview}
//       source={{ uri: videoUrl }}
//       allowsFullscreenVideo
//       scalesPageToFit
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingVertical: 16,
//   },
//   videoContainer: {
//     marginBottom: 16,
//   },
//   webview: {
//     flex: 1,
//     aspectRatio: 16 / 9,
//   },
// });


import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const videos = [
  { id: 'xNQlkEXHwW0', title: 'The ULTMATE 1' },
  { id: '1mlN0yuxoLE', title: 'Video 2' },
  { id: 'RoxKbyst0To', title: 'Video 3' },
  { id: 'lo792RZ245Y', title: 'Video 4' },
  { id: '5p5DgAigceU', title: 'Video 5' },
];

const Videoblogs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {videos.map((video) => (
        <View key={video.id} style={styles.videoContainer}>
          <YouTubeVideo videoId={video.id} />
          <Text style={styles.videoTitle}>{video.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const YouTubeVideo = ({ videoId }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <WebView
      style={styles.webview}
      source={{ uri: videoUrl }}
      allowsFullscreenVideo
      scalesPageToFit
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  videoContainer: {
    marginBottom: 24,
  },
  webview: {
    flex: 1,
    aspectRatio: 16 / 9,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default Videoblogs;
import React, { View } from 'react';
import { WebView } from 'react-native-webview';

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
export default YouTubeVideo
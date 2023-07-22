import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';

const Maps = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapSt}
        initialRegion={{
          latitude: 33.69456414704009,
          longitude: 73.0332678883396,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: 33.67234901131849, longitude: 73.06454535194575 }}
        />
        <Marker
          coordinate={{ latitude: 33.71204302987969, longitude: 73.05103816195043 }}
        />
        <Marker
          coordinate={{ latitude: 33.665959106624314, longitude: 73.00428978353044 }}
        />
        <Marker
          coordinate={{ latitude: 33.69609776538388, longitude: 73.06139230190219 }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#3d3015',
  },
  mapSt: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;

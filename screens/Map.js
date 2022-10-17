import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

const Map = ({ navigation }) => {
   const [selectedLocation, setSelectedLocation] = useState();
   const region = {
      latitude: 37.78,
      longitude: -122.43,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
   };

   function selectLocationHandler(event) {
      const lat = event.nativeEvent.coordinate.latitude;
      const lng = event.nativeEvent.coordinate.longitude;
      setSelectedLocation({ lat, lng });
   }

   const savePickedLocationHandler = useCallback(() => {
      if (!selectedLocation) {
         return Alert.alert('No Location picked', 'You have to pick a location on the map first');
      }
      navigation.navigate('AddPlace', {
         pickedLat: selectedLocation.lat,
         pickedLng: selectedLocation.lng
      });
   }, [navigation, selectedLocation]);

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: ({ tintColor }) => <IconButton color={tintColor} icon='save' size={24} onPress={savePickedLocationHandler} />
      });
   }, [navigation, savePickedLocationHandler]);

   return (
      <MapView
         style={styles.screen}
         initialRegion={region}
         onPress={selectLocationHandler}
      >
         {selectedLocation &&
            <Marker
               title='Picked Location'
               coordinate={{
                  latitude: selectedLocation.lat,
                  longitude: selectedLocation.lng
               }}
            />
         }
      </MapView>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1
   }
});

export default Map;
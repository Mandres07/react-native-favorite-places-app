import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location';
import { useEffect, useState } from 'react';
import { getAddress, getMapPreview } from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

const LocationPicker = ({ onPickLocation }) => {
   const [pickedLocation, setPickedLocation] = useState();
   const [locationPermission, requestLocationPermission] = useForegroundPermissions();
   const isFocused = useIsFocused();
   const navigation = useNavigation();
   const route = useRoute();

   useEffect(() => {
      if (isFocused && route.params) {
         const mapPickedLocation = {
            lat: route.params.pickedLat,
            lng: route.params.pickedLng
         };
         setPickedLocation(mapPickedLocation);
      }
   }, [route, isFocused]);

   useEffect(() => {
      async function handleLocation() {
         if (pickedLocation) {
            const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
            onPickLocation({ ...pickedLocation, address });
         }
      }
      handleLocation();
   }, [pickedLocation, onPickLocation])

   async function verifyLocationPermission() {
      if (locationPermission.status === PermissionStatus.UNDETERMINED) {
         const permissionResponse = await requestLocationPermission();
         return permissionResponse.granted;
      }
      if (locationPermission.status === PermissionStatus.DENIED) {
         Alert.alert('Insufficient Permissions', 'You need to grant location permission to use this feature.');
         return false;
      }
      return true;
   }

   async function getLocationHandler() {
      const hasPermissions = await verifyLocationPermission();
      if (!hasPermissions) {
         return;
      }
      const location = await getCurrentPositionAsync();
      setPickedLocation({
         lat: location.coords.latitude,
         lng: location.coords.longitude
      });
   }

   function pickOnMapHandler() {
      navigation.navigate('Map');
   }

   let locationPreview = <Text>No location picked yet.</Text>;
   if (pickedLocation) {
      locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />;
   }

   return (
      <View>
         <View style={styles.mapPreview}>
            {locationPreview}
         </View>
         <View style={styles.action}>
            <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   mapPreview: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary100,
      borderRadius: 4,
      overflow: 'hidden'
   },
   action: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
   },
   image: {
      width: '100%',
      height: '100%'
   }
});

export default LocationPicker;
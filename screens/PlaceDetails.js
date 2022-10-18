import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../util/database';

const PlaceDetails = ({ route, navigation }) => {
   const [placeDetails, setPlaceDetails] = useState();
   const placeId = route.params.placeId;

   useEffect(() => {
      async function loadPlaceData() {
         const place = await fetchPlaceDetails(placeId);
         setPlaceDetails(place);
         navigation.setOptions({
            title: place.title
         });
      }
      loadPlaceData();
   }, [placeId]);

   function showOnMapHandler() {
      navigation.navigate('Map', {
         initialLat: placeDetails.location.lat,
         initialLng: placeDetails.location.lng
      });
   }

   if (!placeDetails) {
      return <View style={styles.fallback}>
         <Text>Loading Place data...</Text>
      </View>
   }

   return (
      <ScrollView>
         <Image style={styles.image} source={{ uri: placeDetails.imageUri }} />
         <View style={styles.location}>
            <View style={styles.addressContainer}>
               <Text style={styles.address}>{placeDetails.address}</Text>
            </View>
            <OutlinedButton icon='map' onPress={showOnMapHandler}>View on Map</OutlinedButton>
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   fallback: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   image: {
      height: '35%',
      minHeight: 300,
      width: '100%'
   },
   location: {
      justifyContent: 'center',
      alignItems: 'center'
   },
   addressContainer: {
      padding: 20,
   },
   address: {
      color: Colors.primary500,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16
   }
});

export default PlaceDetails;
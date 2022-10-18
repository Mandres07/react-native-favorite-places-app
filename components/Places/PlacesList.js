import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

const PlacesList = ({ places }) => {
   const navigation = useNavigation();
   if (!places || places.length === 0) {
      return <View style={styles.container}>
         <Text style={styles.text}>
            No places added yet - start adding some!
         </Text>
      </View>
   }

   function selectPlaceHandler(id) {
      navigation.navigate('PlaceDetails', { placeId: id });
   }

   return (
      <FlatList
         style={styles.list}
         data={places}
         keyExtractor={item => item.id}
         renderItem={({ item }) => (
            <PlaceItem place={item} onSelect={selectPlaceHandler} />
         )}
      />
   );
};

const styles = StyleSheet.create({
   list: {
      margin: 24
   },
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   text: {
      fontSize: 16,
      color: Colors.primary200
   }
});

export default PlacesList;
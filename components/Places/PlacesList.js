import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

const PlacesList = ({ places }) => {
   if (!places || places.length === 0) {
      return <View style={styles.container}>
         <Text style={styles.text}>
            No places added yet - start adding some!
         </Text>
      </View>
   }
   return (
      <FlatList
         data={places}
         keyExtractor={item => item.id}
         renderItem={({ item }) => (
            <PlaceItem place={item} />
         )}
      />
   );
};

const styles = StyleSheet.create({
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
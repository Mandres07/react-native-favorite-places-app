import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const PlaceItem = ({ place, onSelect }) => {
   return (
      <Pressable style={{}} onPress={onSelect}>
         <Image source={{ uri: place.imageUri }} />
         <View>
            <Text>{place.title}</Text>
            <Text>{place.address}</Text>
         </View>
      </Pressable>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   }
});

export default PlaceItem;
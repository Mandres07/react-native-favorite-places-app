import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

const ImagePicker = ({ onTakeImage }) => {
   const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
   const [pickedImage, setPickedImage] = useState();

   async function verifyCameraPermissions() {
      if (cameraPermissions.status === PermissionStatus.UNDETERMINED) {
         const permissionResponse = await requestCameraPermissions();
         return permissionResponse.granted;
      }
      if (cameraPermissions.status === PermissionStatus.DENIED) {
         Alert.alert('Insufficient Permissions', 'You need to grant camera permission to use this feature.');
         return false;
      }
      return true;
   }

   async function TakeImageHandler() {
      const hasPermissions = await verifyCameraPermissions();
      if (!hasPermissions) {
         return;
      }
      const image = await launchCameraAsync({
         allowsEditing: true,
         aspect: [16, 9],
         quality: 0.5
      });
      setPickedImage(image.uri);
      onTakeImage(image.uri);
   }

   let imagePreview = <Text>No image taken yet.</Text>;
   if (pickedImage) {
      imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
   }

   return (
      <View>
         <View style={styles.imageContainer}>
            {imagePreview}
         </View>
         <OutlinedButton icon='camera' onPress={TakeImageHandler}>
            Take image
         </OutlinedButton>
      </View>
   );
};

const styles = StyleSheet.create({
   imageContainer: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary100,
      borderRadius: 4,
      overflow: 'hidden'
   },
   image: {
      width: '100%',
      height: '100%'
   }
});

export default ImagePicker;
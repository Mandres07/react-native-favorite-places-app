import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

const ImagePicker = (props) => {
   const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();

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
      console.log(image);
   }

   return (
      <View style={styles.container}>
         <View></View>
         <Button title='Take Image' onPress={TakeImageHandler} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   }
});

export default ImagePicker;
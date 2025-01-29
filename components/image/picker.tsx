import React, { useState } from 'react';
import { View, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppText } from '../typography';
import { AppIcon } from '../icon';

export default function AppImagePicker({image, setImage}: any) {

  const pickImage = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View className='mt-5'>
      <TouchableOpacity onPress={pickImage} className='p-5 rounded-full w-full flex-row justify-between items-center bg-gray-300'>
        <AppText color='#4b5563'>Select Image</AppText>

        <AppIcon
          type='Entypo'
          name='upload-to-cloud' 
          color='#4b5563'
        />
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image?.uri }}
          className='w-full h-[300px] rounded-lg mt-5'
          resizeMode='cover'
        />
      )}
    </View>
  );
}

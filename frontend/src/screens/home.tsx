import { Text, View, Button } from 'react-native';
import React from 'react';
import { RootStackParamList } from '../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { logout } from '../services/auth';


type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation}: Props) => {
  
  return (
    <View>
      <Text>Home</Text>
      <Button title='Đăng xuất' onPress={() => logout(navigation)} />
    </View>
  )
}

export default Home
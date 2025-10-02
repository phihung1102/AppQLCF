import { Text, View, Button } from 'react-native';
import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Home = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <View>
      <Text>Home</Text>
      <Button title='Đăng xuất' onPress={() => logout()} />
    </View>
  )
}

export default Home;
import React, {JSX} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../ui/screens/Login';
import HomeScreen from '../ui/screens/Home';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Stack = createNativeStackNavigator();

function AppNavigator(): JSX.Element {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isLoggedIn ? <Stack.Screen name="Login" component={LoginScreen} /> :
      <Stack.Screen name="Home" component={HomeScreen} />}
    </Stack.Navigator>
  );
}

export default AppNavigator;

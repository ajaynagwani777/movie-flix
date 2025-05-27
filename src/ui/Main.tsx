import React, {JSX} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AppNavigator from '../router';

function Main(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'default' : 'dark-content'}
      />
      <NavigationContainer documentTitle={{enabled: false}}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
});

export default Main;

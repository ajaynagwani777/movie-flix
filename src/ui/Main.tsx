import React, {JSX, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AppNavigator from '../router';
import useLanguage from './hooks/useLanguage';
import i18n from '../i18n';

function Main(): JSX.Element {
  const language = useLanguage();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
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

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {initFirbase} from './src/utils/firebase';
import AppNavigation from './src/components/AppNavigation';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message'

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <>
    <NavigationContainer>
      <AppNavigation/>
    </NavigationContainer>
    <Toast/>
    </>
  );
}

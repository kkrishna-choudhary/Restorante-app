import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View ,Image} from 'react-native';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
    
    <NavigationContainer>  
      <Provider store={store}> 
        <PersistGate 
            loading={<Loading />}
            persistor={persistor}> 
            <Main/>
        </PersistGate>
      </Provider>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    
  },
});

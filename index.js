/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import App from './App.js';
import {name as appName} from './app.json';
import {magic_store} from './src/redux_store/index.js';
import {ocean_theme} from './src/theme/ocean.js';

const MagicApp = () => {
  return (
      <Provider store={magic_store}>
        <NavigationContainer>
          <PaperProvider theme={ocean_theme}>
            <App/>
          </PaperProvider>
        </NavigationContainer>
      </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MagicApp);

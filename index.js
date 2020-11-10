/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './App.js';
import {name as appName} from './app.json';

const MagicApp = () => {
  return (
      <PaperProvider>
        <App/>
      </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => MagicApp);

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

import {
  Header,
} from 'react-native/Libraries/NewAppScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './src/component/Home.js';
import {PreloadScreen} from './src/component/preloadScreen.js';
import {Setting} from './src/component/Setting.js';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView>
            <Header/>
            {global.HermesInternal == null ? null : (
                <PreloadScreen/>
            )}
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="Setting" component={Setting}/>
            </Stack.Navigator>
          </ScrollView>
        </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({});

export default App;

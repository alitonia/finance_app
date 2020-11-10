import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import {
  Header,
} from 'react-native/Libraries/NewAppScreen';
import {PreloadScreen} from './src/component/preloadScreen.js';

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
            <View>

            </View>
          </ScrollView>
        </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({});

export default App;

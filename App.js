import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import TabNavigator from './AppNavigator/TabNavigator';
import { Provider } from './context/context';

axios.defaults.baseURL = 'https://6cef0689.ngrok.io'


export default class App extends React.Component {
  render(){
    return (
      <Provider>
        <NavigationContainer>
          <TabNavigator/>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});

/**
 * ScrollView: 
 * contentContainerStyle : all content
 * style: 100vh
 */


 /**
  * AppNavigator
  * Api4 : const Stack = createStackNavigator({
  *  screenName: {
  *     screen: Component
  *   }
  * }, [optional])
  * App.js : 
  * AppContainer = createAppContainer(Stack)
  * return (<AppContainer/>)
  * 
  * Apiv5: Bên trên
  */
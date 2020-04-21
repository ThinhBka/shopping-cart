import React from 'react';
import { Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoriesScreen from '../screens/Categories';
import CategoryScreen from '../screens/Category';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../assets/icon.png')}
    />
  );
}


export default function AppNavigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Home' }}/>
      <Stack.Screen 
        name="Category"
        component={CategoryScreen} 
        initialParams={{ title: 'test' }} 
        options={({ route }) => ({ 
          title: route.params.title,
          // headerTitle: props => <LogoTitle {...props} />, change thay title
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 14
          },
          headerRight: () => (
          <Icon
            name='align-justify'
            size={24}
            color='white'
          />
          ),
        })}/>
    </Stack.Navigator>
  )
}
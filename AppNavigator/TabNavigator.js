import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigator from './StackNavigator';
import CartScreen from '../screens/Cart';
import SettingsScreen from '../screens/Settings';
import OrderScreen from '../screens/Order';
import { formatToTal } from '../helper/uils';
import { ShopContext } from '../context/context';

const CartStack = createStackNavigator();

const CartStackScreen = () => (
  <CartStack.Navigator>
    <CartStack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }}/>
  </CartStack.Navigator>
)

const OrderStack = createStackNavigator();

const OrderStackScreen = () => (
  <OrderStack.Navigator>
    <OrderStack.Screen name="Order" component={OrderScreen} options={{ title: 'Order' }}/>
  </OrderStack.Navigator>
)

const SettingStack = createStackNavigator();

const SettingStackScreen = () => (
  <SettingStack.Navigator>
    <SettingStack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Setting' }}/>
  </SettingStack.Navigator>
)

const Tab = createBottomTabNavigator();

export default function TabNaviagtor(){
  return(
    <ShopContext.Consumer>
      {({ total }) => (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'ios-home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if(route.name === 'Order'){
              iconName = 'md-wallet';
            } else if(route.name === 'Cart'){
              iconName = 'ios-cart';
            }
            if(route.name !== 'Cart'){
              return <Ionicons name={iconName} size={size} color={color} />;
            }else{
              return <IconWithBadge name={iconName} size={size} color={color} badgeCount={total} />;
            }
            
          },
        })}
        tabBarOptions={{
          activeTintColor: '#4B89BA',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={StackNavigator} />
        <Tab.Screen name="Cart" component={CartStackScreen} />
        <Tab.Screen name="Order" component={OrderStackScreen} />
        <Tab.Screen name="Settings" component={SettingStackScreen} />
      </Tab.Navigator>
      )}
    </ShopContext.Consumer>
  )
}

const IconWithBadge = ({ name, badgeCount, color, size }) => {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -3,
            top: 0,
            borderColor: '#ffffff',
            borderWidth: 1.5,
            backgroundColor: 'red',
            borderRadius: 7,
            width: 14.5,
            height: 14.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 6.5, fontWeight: 'bold' }}>
            {formatToTal(badgeCount)}
          </Text>
        </View>
      )}
    </View>
  );
}
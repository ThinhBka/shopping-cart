import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  FlatList,
  StyleSheet
} from 'react-native';
import OrderItem from './orderProduct';
import { formatPrice } from '../helper/uils';

const getTotal = (cartItems) => {
  const result = cartItems.reduce((item, current) => item + Number(current.quality)*Number(current.price), 0);
  return formatPrice(result);
}

export default function OrderListItem(props){
  const { order } = props;
  const date = new Date(Number(Object.keys(order)[0]));
  const dateConvert = date.toLocaleString();
  const data = Object.values(order)[0];
  const cost = getTotal(data);
  return(
    <View style={styles.shadow}>
      <Text style={styles.pages}>Hóa Đơn</Text>
      <View style={styles.container}>
        <FlatList 
          data={data} 
          renderItem={ ({item}) => <OrderItem product={item}/>}
          keyExtractor ={item => `${item._id}`}
          contentContainerStyle={styles.container}
        />
      </View>
      <View style={styles.boxTotal}>
        <Text style={styles.total}>Tổng</Text>
        <Text style={styles.cost}>{cost}</Text>
      </View>
      <Text style={styles.timeBuy}>{dateConvert}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: '#fff',
    overflow: "hidden",
    padding: 10,
    paddingTop: 25,
    paddingBottom: 80
  },
  pages: {
    color: '#ddd',
    position: 'absolute',
    top: 20,
    fontSize: 18,
    fontWeight: '700',
    zIndex: 10,
    left: 130
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  boxTotal: {
    position: 'absolute',
    bottom: 45,
    left: 30
  },
  total: {
    fontSize: 12,
    color: '#ddd'
  },
  cost: {
    fontSize: 14
  },
  timeBuy: {
    fontSize: 12,
    position: 'absolute',
    right: 35,
    bottom: 50,
    color: '#ddd'
  }
})
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Button,
  FlatList,
  StyleSheet
} from 'react-native';
import OrderItem from './orderProduct';
import { formatPrice } from '../helper/uils';
import axios from 'axios';

export default class OrderListItem extends React.Component{

  state = {
    order: [],
    data: [],
    cost: 0,
    dateConvert: ''
  }

  componentDidMount(){
    const { product } = this.props;
    const date = new Date(Number(Object.keys(product)[0]));
    const dateConvert = date.toLocaleString();
    const data = Object.values(product)[0];
    const cost = this.getTotal(data);
    this.setState({
      cost,
      data,
      dateConvert
    })
  }

  getTotal = (cartItems) => {
    const result = cartItems.reduce((item, current) => item + Number(current.quality)*Number(current.price), 0);
    return formatPrice(result);
  }
  
  deleteItem = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if(!userId){
        return navigation.navigate('Login');
      }
      const res = await axios.get(`/order/${userId}`)
      await this.promisedSetState({ order: res.data[0].order});
      const { product } = this.props;
      const { order } = this.state;
      let orders = JSON.parse(JSON.stringify(order));
      await this.promisedSetState({ data: []})
      const idx = orders.findIndex(item => Object.keys(product)[0] === Object.keys(item)[0])
      const x = [...orders.slice(0, idx), ...orders.slice(idx+1)];
      // // Update item
      await axios.post('/order',{
        'order': x,
        'id': userId
      })
    } catch (error) {
      console.error(error)
    }
  }

  promisedSetState = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        resolve('Done')
      });
    });
  }

  render(){
    const { cost, dateConvert, data } = this.state;
    return(
      <>
      {data.length > 0 ? (
        <View style={styles.shadow}>
          <Text style={styles.pages}>Hóa Đơn</Text>
          <TouchableOpacity activeOpacity={0.4} onPress={this.deleteItem} style={styles.deleteBtn}>
            <Image source={{uri: 'https://img.icons8.com/android/24/000000/trash.png'}} style={styles.iconDelete}/>
          </TouchableOpacity>
          
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
      ): null}
      </>
    )
  }
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
  deleteBtn: {
    position: 'absolute',
    zIndex: 20,
    right: 16,
    top: 20
  },
  iconDelete: {
    width: 25,
    height: 25
  },
  pages: {
    color: '#ddd',
    position: 'absolute',
    top: 10,
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
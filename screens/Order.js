import React from 'react';
import { View, Text, SafeAreaView, AsyncStorage, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import OrderListItem from '../components/OrderListItem'

export default class OrderScreen extends React.Component{
  state = {
    order: []
  }

  componentDidMount = () => {
    const { navigation } = this.props
    this._unsubscribe = navigation.addListener('focus', async () => {
      const userId = await AsyncStorage.getItem('userId');
      if(!userId){
        return navigation.navigate('Login');
      }
      const res = await axios.get(`/order/${userId}`)
      await this.promisedSetState({ order: res.data[0].order})
    });
  }

  getSnapshotBeforeUpdate = async (prevProps, prevState) => {
    const { navigation } = this.props
    const userId = await AsyncStorage.getItem('userId');
    if(!userId){
      return navigation.navigate('Login');
    }
    const res = await axios.get(`/order/${userId}`);
    await this.promisedSetState({ order: res.data[0].order})
    //TODO: Fix call api
  }

  componentWillUnmount(){
    this._unsubscribe();
  }
  promisedSetState = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        resolve('Done')
      });
    });
  }

  handleDelete = async () => {
    const userId = await AsyncStorage.getItem('userId');
    await axios.post('/order/delete', {
      'id': userId
    })
    this.setState({
      order: []
    })
  }
  render(){
    const { order } = this.state;
    return(
      <SafeAreaView>
        <View style={{height: 553}}>
          {order.length > 0 ? (
          <FlatList 
            data={order}
            renderItem={ ({item, index}) => (
              <View style={styles.wrapper}>
                <OrderListItem product={item} idx={index}/>
              </View>
            )}
            keyExtractor ={item => `${Object.keys(item)[0]}`}
            contentContainerStyle={styles.container}
          />): <Text style={styles.noProduct}>No History!</Text>}
        </View>
        <View style={styles.border1}>
          <View style={styles.boxInfo}>
            <Text style={styles.total}></Text>
          </View>
          <TouchableOpacity style={styles.buyBorder} onPress={this.handleDelete}>
            <Text style={styles.buy}>Delete History</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  noProduct: {
    color: '#ddd',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 200
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8
  },
  container: {
    paddingHorizontal: 8,
    paddingTop: 16
  },
  border1: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding: 8,
    backgroundColor: '#fff',
    width: 500,
    height: 80,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  boxInfo: {
    padding: 8
  },
  cost: {
    fontSize: 18
  },
  total: {
    fontSize: 13,
    color: '#ddd'
  },
  buyBorder: {
    justifyContent: 'center',
    marginLeft: 170,
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    padding: 8,
    backgroundColor: '#33CFFF'
  },
  buy: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600'
  }
});
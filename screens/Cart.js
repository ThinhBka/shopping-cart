import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Dimensions, Alert, AsyncStorage } from 'react-native';
import { ShopContext } from '../context/context';
import CartListItem from '../components/CartListItem';
import axios from 'axios';


export default class CartScreen extends React.Component{

  state = {
    order: []
  }

  componentDidMount = async () => {
    const { navigation } = this.props
    const userId = await AsyncStorage.getItem('userId');
    const res = await axios.get('/order')
    const idx = res.data.findIndex(item => item._id === userId);
    if(idx === -1){
      return navigation.navigate('Login');
    }
    await this.promisedSetState({ order: res.data[idx].order})
  }

  handleBuy = async (cartItems) => {
    if(cartItems.length > 0){
      const { navigation } = this.props;
      const userId = await AsyncStorage.getItem('userId');
      // recomend nên update trong componenDidUpdate
      const res = await axios.get('/order')
      const idx = res.data.findIndex(item => item._id === userId);
      if(idx === -1){
        return navigation.navigate('Login');
      }
      await this.promisedSetState({ order: res.data[idx].order})
      const { order } = this.state;
      const orders = [...order, {[Date.now()]: cartItems}];
      const token = await AsyncStorage.getItem('token');
      // check mua token het han yeu cau dang nhap lai
      // if(!token){
      //   return navigation.navigate('Login');
      // }
      // const res = await axios.get('/checkToken',{
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Authorization': token
      //   }
      // })
      // const userId = res.data.userId;
      if(!userId){
        return navigation.navigate('Login');
      }
  
      await axios.post('/order',{
        'id': userId,
        'order': orders
      })
      Alert.alert('Thanks You', 'Bạn mua hàng thành công!')
    }
    Alert.alert('Bạn có biết ? ', 'Bạn chưa mua gì? =))')
  }

  promisedSetState = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        resolve('Done')
      });
    });
  }

  render(){
    const windowHeight = Dimensions.get('window').height;
    return(
      <SafeAreaView>
        <ShopContext.Consumer>
          {({ cartItems, addToCart, removeFromCart, resetBuy, toTalCost }) => (
            <View style={{height: 553}}>
              {cartItems.length > 0 ? (
              <FlatList 
                data={cartItems}
                renderItem={ ({item}) => (
                <View style={styles.wrapper}>
                  <CartListItem product={item} addToCart={() => addToCart(item)} removeFromCart={() => removeFromCart(item)}/>
                </View>
                )}
                keyExtractor ={item => `${item.id}`}
                contentContainerStyle={styles.container}
              />): <Text style={styles.noProduct}>No Product!</Text>}
              <View style={styles.border1}>
                <View style={styles.boxInfo}>
                  <Text style={styles.total}>Tổng:</Text>
                  <Text style={styles.cost}>{toTalCost === '' ? '0K' : toTalCost}</Text>
                </View>
                <TouchableOpacity style={styles.buyBorder} onPress={() => {this.handleBuy(cartItems); resetBuy()}}>
                  <Text style={styles.buy}>ĐẶT HÀNG</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
         </ShopContext.Consumer>
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
  loading: {
    flex: 1,
    justifyContent: 'center'
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
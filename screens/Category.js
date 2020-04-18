import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Product from '../components/ProductListIem';
import { ShopContext } from '../context/context'

export default class Category extends React.Component {
  /**
   * Apiv5
   * Sử dụng ở App.js thay đổi trực tiếp truyền thông qua options
   * Lấy data của params truyền vào qua route.params
   * 
   * Apiv4 (Cách dưới)
   * Lấy data của params truyền vào với method getParam('keyParams', [default params])
   *
   * static navigationOptions = ({ navigation }) => {
   *  return {
   *     title: navigation.getParam('title')
   *  }
   * }
   */

  constructor(props){
    super(props);
    this.state = {
      product: [],
      isReady: false
    }
  }
  componentDidMount(){
    const { route } = this.props;
    axios.get(`/product`)
      .then(res => 
        {
          let data1 = [];
          let data = res.data;
          for (const key of data) {
            if(key.categories.includes(route.params.product)){
              data1.push(key)
            }
          }
          this.setState({product: data1, isReady: true})
        })
      .catch(err => console.error(err))
  }

  render(){
    const { product } = this.state;
    const { navigation } = this.props;
    if (!this.state.isReady) {
      return (
        <View style={[styles.loading]}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ); }

    return (
      <SafeAreaView>
        <FlatList 
          data={product}
          numColumns={2}
          renderItem={ ({item}) => (
          <View style={styles.wrapper}>
            <ShopContext.Consumer>
              {
                ({ addToCart }) => (
                  <Product product={item} onAddToCart={() => addToCart(item)}/>
                )
              }
            
            </ShopContext.Consumer>
          </View>
          )}
          keyExtractor ={item => `${item.id}`}
          contentContainerStyle={styles.container}
        />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

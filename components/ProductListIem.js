import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet
} from 'react-native';

import { formatPrice } from '../helper/uils';

export default function ProductListItem(props){
  const { product, onAddToCart } = props;
  return(
    <View style={styles.shadow}>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: product.images[0].url }}/>
        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <TouchableOpacity 
            onPress={() => { 
              Alert.alert(
              'Check',
              `Bạn muốn thêm ${product.name} vào giỏ`,
              [
                {text: 'OK', onPress: () => onAddToCart()},
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                }
              ]
              )}}
            >
              <Text style={styles.cartText}>Buy+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: '#fff',
    overflow: "hidden"
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  cartText: {
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#2f95dc'
  },
  info: {
    padding: 8
  },
  img: {
    height: 150,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  name: {
    fontSize: 16,
    marginBottom: 8
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    fontSize: 16,
    color: '#888',
    flex: 1
  }
})
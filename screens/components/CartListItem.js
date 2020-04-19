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

export default function CartListItem(props){
  const { product, addToCart, removeFromCart } = props;
  return(
    <View style={styles.shadow}>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: product.images[0].url }}/>
        <View style={styles.info}>
          <View style={styles.priceRow}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>
          <View style={styles.controll}>
            <TouchableOpacity style={styles.addCart} onPress={addToCart}>
              <Text style={styles.cartText}>+</Text>
            </TouchableOpacity>
            <Text>{product.quality}</Text>
            <TouchableOpacity style={styles.removeCart} onPress={removeFromCart}>
              <Text style={styles.cartText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    padding: 16
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
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 3,
    position: 'absolute',
    top: 0,
    left: 3
  },
  info: {
    flexDirection: 'row',
    padding: 8
  },
  controll: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 60,
    alignItems:'center'
  },
  img: {
    padding: 16,
    height: 80,
    width: 80,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  name: {
    fontSize: 14,
    marginBottom: 4
  },
  priceRow: {
   paddingLeft: 16
  },
  price: {
    fontSize: 15,
    color: '#888',
    flex: 1
  },
  addCart: {
    backgroundColor: '#ddd',
    width: 25,
    height: 25,
    borderRadius: 15,
    marginRight: 10
  },
  removeCart: {
    backgroundColor: '#ddd',
    width: 25,
    height: 25,
    borderRadius: 15,
    marginLeft: 10
  }
})
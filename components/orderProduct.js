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

export default function OrderProduct(props){
  const { product } = props;
  return(
    <>
    {product ? (
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: product.images[0].url }}/>
        <View style={styles.info}>
          <View style={styles.priceRow}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>
          <View style={styles.controll}>
            <Text>{product.quality}</Text>
          </View>
        </View>
      </View>
    ): null}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    overflow: "hidden",
    paddingBottom: 8,
    paddingTop: 25,
    marginLeft: 40,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
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
    padding: 8,
    height: 80,
    width: 80,
    paddingTop: 20,
    borderRadius: 4,
  },
  name: {
    fontSize: 14,
    marginBottom: 4
  },
  priceRow: {
   paddingLeft: 16,
   marginTop: 20
  },
  price: {
    fontSize: 15,
    color: '#888',
    flex: 1
  },
})
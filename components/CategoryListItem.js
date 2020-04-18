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
import Work from '../assets/sketch.png';
// C2: change source = require('../assets/sketch.png');

// cancelable = true : click outside don't close alert
const showAlert = () => {
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}

export default function CategoryListItem(props){
  const { category, onPress } = props;
  return(
    <TouchableOpacity activeOpacity={0.4} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{ category.name }</Text>
        <Image style={styles.categoryImage} source={Work}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width:0, height: 0 }
  },
  categoryImage: {
    width: 64,
    height: 64
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: 8,
    fontWeight: '700'
  }
})
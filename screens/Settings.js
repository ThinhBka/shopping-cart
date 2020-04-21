import React from 'react';
import { View, AsyncStorage, StyleSheet, Text, SafeAreaView, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Avatar, Rating  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';

export default class SettingsScreen extends React.Component{

  state = {
    data: [],
    image: '',
    info: {},
    address: '',
    phone: '',
    email: ''
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', async () => {
      this.getPermissionAsync();
      const userId = await AsyncStorage.getItem('userId');
      if(!userId){
        return navigation.navigate('Login');
      }
      const res = await axios.get(`/setting/${userId}`);
      const info = res.data[0].info;
      const { phone, address, email, image } = info;
      await this.promisedSetState({ phone, address, email, image })
    });
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  handleLogOut = async () => {
    const { navigation } = this.props;
    return navigation.navigate('Login');
  }

  handleSaveData = async () => {
    const { phone, email, address, image } = this.state;
    const userId = await AsyncStorage.getItem('userId');
    const info = {
      phone,
      email,
      address,
      image
    }
    await axios.post('/setting', {
      'settings': info,
      'id': userId
    })
    Alert.alert(
      'Thông báo',
      'Cảm ơn bạn đã cung cấp thông tin'
    )
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  promisedSetState = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        resolve('Done')
      });
    });
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
    Alert.alert('Thông báo', 'Cảm ơn bạn đã đánh giá!');
  }

  componentWillUnmount(){
    this._unsubscribe();
  }
  render(){
    let { image, email, phone, address } = this.state;
    return(
      <SafeAreaView>
        <ScrollView>
        <View style={styles.contaniner}>
          <Avatar
            source={{
              uri:
                image ? image : '',
            }}
            rounded icon={{ name: 'user', type: 'font-awesome' }}
            size="xlarge"
            showEditButton
            onEditPress={this._pickImage}
          />
        </View>
        <View style={styles.address}>
          <Text style={styles.addressText}>Edit Address</Text>
          <TextInput
            onChangeText={(address) => this.setState({ address })}
            placeholder='address here'
            style={styles.inputAddress}
            value={address}
          />
          <Icon
            name='address-card'
            size={24}
            color='black'
            style={styles.iconAddress}
          />
        </View>
        <View style={styles.email}>
          <Text style={styles.emailText}>Edit Email</Text>
          <TextInput
            placeholder='Email edit here'
            onChangeText={(email) => this.setState({ email })}
            style={styles.inputEmail}
            value={email}
          />
          <Icon
            style={styles.iconEmail}
            name='suitcase'
            size={24}
            color='black'
          />
        </View>
        <View style={styles.phone}>
          <Text style={styles.phoneText}>Edit Phone</Text>
          <TextInput
            onChangeText={(phone) => this.setState({ phone })}
            placeholder='Phone edit here'
            style={styles.inputPhone}
            value={phone}
          />
          <Icon
            style={styles.iconPhone}
            name='phone'
            size={24}
            color='black'
          />
        </View>
        <View style={styles.feaback}>
          <Text style={styles.feabackText}>You love App ❤</Text>
          <Rating
            ratingColor= "#000"
            ratingBackgroundColor= "#ddd"
            onFinishRating={this.ratingCompleted}
            style={styles.votes}
          />
        </View>
        <View style={styles.boxBtn}>
          <TouchableOpacity style={styles.btnSave} onPress={this.handleSaveData}>
            <Text style={styles.btnSaveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogOut} onPress={this.handleLogOut}>
            <Text style={styles.btnLogOutText}>Log Out</Text>
            <Icon
              name='sign-out'
              size={24}
              color='black'
            />
          </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  contaniner: {
    flex: 1, 
    alignItems: 'center',
    paddingTop: 20, 
    justifyContent: 'flex-start'
  },
  feabackText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ddd',
    textAlign: 'center',
    paddingBottom: 10
  },
  feaback: {
    marginBottom: 10
  },
  boxBtn: {
    flexDirection: 'row',
    paddingVertical: 20
  },
  btnSave: {
    width: 100,
    height: 50,
    paddingTop: 10,
    marginLeft: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 8
  },
  btnSaveText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#4FC3F7'
  },
  btnLogOut: {
    backgroundColor: '#fff',
    marginLeft: 50,
    height: 50,
    paddingTop: 10,
    borderRadius: 5,
    padding: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnLogOutText: {
    fontWeight: '600',
    fontSize: 14,
    paddingRight: 5,
    paddingBottom: 20
  },
  address: {
    paddingTop: 50,
    padding: 24,
    paddingBottom: 8,
    position: 'relative'
  },
  addressText: {
    fontSize: 14,
    fontWeight: '500'
  },
  inputAddress: {
    fontSize: 14,
    padding: 8,
    paddingLeft: 36,
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  iconAddress: {
    position: 'absolute',
    top: 80,
    left: 25
  },
  email: {
    padding: 24,
    position: 'relative'
  },
  emailText: {
    fontSize: 14,
    fontWeight: '500'
  },
  inputEmail: {
    fontSize: 14,
    padding: 8,
    paddingLeft: 36,
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  iconEmail: {
    position: 'absolute',
    top: 55,
    left: 25
  },
  phone: {
    padding: 24,
  },
  phoneText: {
    fontSize: 14,
    fontWeight: '500'
  },
  inputPhone: {
    fontSize: 14,
    padding: 8,
    paddingLeft: 36,
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  iconPhone: {
    position: 'absolute',
    top: 55,
    left: 25
  },
})
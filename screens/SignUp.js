import React from 'react';
import {  
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  Image
} from 'react-native';
import axios from 'axios'

export default class SignUpScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      againPassword: '',
      errors: [],
      data:[]
    }
  }
  componentDidMount = async () => {
    await AsyncStorage.removeItem('token');
  }
  handleSignUp = async () => {
    const { navigation } = this.props;
    const { username, password, againPassword } = this.state;
    const errors = [];

    if(password !== againPassword){
      errors.push('password');
    }
    this.setState({
      errors
    })
    setTimeout(() => {
      this.setState({
        errors: []
      })
    },2000)
    if(!errors.length){
      const res = await axios.post('/check/register', {
        'username': username,
        'password': password
      })
      if(res.status === 200){
        return navigation.navigate('Login');
      }
    }
  }
  render(){
    const { errors } = this.state;
    return(
      <SafeAreaView style={styles.container}>
        <Text style={styles.SignUp}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/50/000000/contacts.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/50/000000/key.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/50/000000/key.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Config Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(againPassword) => this.setState({againPassword})}/>
        </View>
        {errors.includes('password') ? <Text style={styles.error}> Password different. Check again pls</Text> : null}

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleSignUp()}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableHighlight>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    position: 'absolute',
    bottom: 130,
  },
  SignUp: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 25
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
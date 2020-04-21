import React from 'react';
import { 
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Image 
} from 'react-native';
import axios from 'axios';


export default class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
      data:[],
      errors: [],
      loading: false
    }
  }

  componentDidMount = async () =>{
    const { navigation } = this.props;
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      const res = await axios.get('/api/users');
      await this.promisedSetState({ data: res.data });
    } catch (error) {
      console.error(error)
    }
    // this._unsubscribe = navigation.addListener('state', async () => {
    //   try {
    //     await AsyncStorage.removeItem('token');
    //     await AsyncStorage.removeItem('userId');
    //     const res = await axios.get('/api/users');
    //     await this.promisedSetState({ data: res.data });
    //   } catch (error) {
    //     console.error(error)
    //   }
    // })
  }

  promisedSetState = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        resolve('Done')
      });
    });
  }

  // componentWillUnmount(){
  //   this._unsubscribe();
  // }

  handleLogin = async () => {
    const { navigation } = this.props;
    const { username, password, data } = this.state;
    const errors = [];
    let errorUser = null;
    let errorPassword = null;
    
    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    data.forEach(item => {
      if(username === item.username){
        errorUser = item.username;
      }
      if(password === item.password){
        errorPassword = item.password
      }
    })
    if(!errorUser){
      errors.push("username");
    }
    if(!errorPassword){
      errors.push("password");
    }

    const T1 = setTimeout(() => {
      this.setState({
        loading: false,
        errors
      })
    }, 2000)
    setTimeout(() => {
      if(T1){
        clearTimeout(T1);
      }
      this.setState({
        errors: []
      })
    }, 4000)
    if (!errors.length) {
      const res = await axios.post('/check/login',{
        'username': username,
        'password': password
      })
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('userId', res.data.userId);
      this.setState({ errors, loading: false }, () => {
        return navigation.navigate("Home");
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.SignIn}>Sign In</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/50/000000/contacts.png'}}/>
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(username) => this.setState({username})}/>
        </View>
        {errors.includes('username') ? <Text style={styles.error}>User not found</Text> : null}
        {
          loading ? (
            <>
              <View style={styles.background}></View>
              <View style={styles.spinner}><ActivityIndicator size="large" color="#0000ff" /></View>
            </>
          ) : null
        }
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/50/000000/key.png'}}/>
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>
        {errors.includes('password') ? <Text style={styles.error1}>Password not found</Text> : null}

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('SignUp')}>
            <Text>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('SignUp')}>
            <Text>Sign Up!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
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
    position: 'absolute',
    zIndex: 2,
    fontSize: 12,
    top: 205,
    left: 120
  },
  error1: {
    color: 'red',
    position: 'absolute',
    zIndex: 2,
    fontSize: 12,
    top: 265,
    left: 120
  },
  SignIn: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20
  },
  spinner: {
    position: 'absolute',
    zIndex: 14,
    top: 250
  },
  background: {
    backgroundColor: '#eee',
    position: 'absolute',
    zIndex:1,
    opacity: .6,
    width: 500,
    top: 0,
    height: 600
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
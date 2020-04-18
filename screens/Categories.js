import React from 'react';
import { AppLoading } from 'expo'
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import Category from '../components/CategoryListItem';
import { Asset } from 'expo-asset';
import axios from 'axios';

export default class Categories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      loadding: true
    }
  }
  componentDidMount(){
    // const authOptions = {
    //   method: 'POST',
    //   url: 'http://10.254.147.184:7777/auth/oauth/token',
    //   data: qs.stringify(data),
    //   headers: {
    //       'Authorization': token,
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   json: true
    // };
    // axios(authOptions);
    axios.get('/categories')
      .then(res => this.setState({categories: res.data, loadding: false}))
      .catch(err => console.error(err))
  }
  async _cacheResourcesAsync() {
    const images = [require('../assets/Group.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    }); 
    return Promise.all(cacheImages);
  }

  render(){
    const { categories, loadding } = this.state;
    const { navigation } = this.props;
    if (loadding) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ loadding: false })}
          onError={console.warn}
        />
    ); }
    return (
      <SafeAreaView>
        <FlatList 
          data={categories} 
          renderItem={ ({item}) => <Category category={item} onPress={() => navigation.navigate('Category', { title: item.name, product: item.id })}/>}
          keyExtractor ={item => `${item.id}`}
          contentContainerStyle={styles.container}
        />
      </SafeAreaView>
    );
  }
}

/* { categories.map(item => <Category key={item.id} category={item}/>) }  <=> FlatList */
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 16, 
    paddingRight: 16
  },
});

/**
 * ScrollView: 
 * contentContainerStyle : all content
 * style: 100vh
 */


 /**
  * Define Option Naviagtor
  * C1: Apov4 define in class child component 
  * static navigationOptions = {
  *   title: 'Home'
  * }
  * Apiv5
  * C2: define in props in App.js (Parent component)
  */
 
  /**
   * navigation Object
   * naviagte: chuyển sang trang 1 lần với params k update
   * push: chuyển sang trang update với params truyền vào mới (chồng thành các stack - data xếp chồng lên nhau search stack-heap)
   * goBack: quay lại đỉnh stack (navigate: 1, push: tổng đỉnh stack)
   * popToTop: quay lại first screen
   */
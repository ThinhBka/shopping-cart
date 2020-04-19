import React from 'react';
import { formatPrice } from '../helper/uils';


export const ShopContext = React.createContext({
  total: 0,
  toTalCost: '',
  cartItems: [],
  addToCart: product => {},
  removeFromCart: product => {},
  getTotal: () => {}
})

export class Provider extends React.Component{
  state = {
    cartItems: [],
    total: 0,
    toTalCost: ''
  }
  addToCart = product => {
    let { cartItems } = this.state;
    console.log(product , cartItems);
    let newData = [];
    const idx = cartItems.findIndex(item => item._id === product._id);
    if(idx !== -1){
      newData = {...cartItems[idx], quality: cartItems[idx].quality+1}
      cartItems[idx] = newData;
    }else{
      newData = {...product, quality: 1};
      cartItems = cartItems.concat(newData);
    }
    this.setState({cartItems}, () => {
      this.getTotal();
    })
  };

  removeFromCart = product => {
    let { cartItems } = this.state;
    let newData = [];
    const idx = cartItems.findIndex(item => item._id === product._id);
    if(product.quality > 1){
      newData = {...product, quality: product.quality - 1}
      cartItems[idx] = newData;
    }else{
      newData = [...cartItems.slice(0,idx), ...cartItems.slice(idx+1)];
      cartItems = newData;
    }
    this.setState({cartItems}, () => {
      this.getTotal();
    })
  };
  getTotal = () => {
    const { cartItems } = this.state;
    const result = cartItems.reduce((item, current) => item + Number(current.quality)*Number(current.price), 0);
    const quanityUpdate = cartItems.reduce((item, current) => item + Number(current.quality), 0);
    if(quanityUpdate || result){
      this.setState({
        total: quanityUpdate,
        toTalCost: formatPrice(result)
      })
    }
  }
  render(){
    const { cartItems, total, toTalCost } = this.state;
    return (
      <ShopContext.Provider
        value={{
          total,
          toTalCost,
          cartItems,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          getTotal: this.getTotal
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
};


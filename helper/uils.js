const formatPrice = (price) => {
  if(Number(price) > 1000){
    return `${Math.floor(Number(price)/1000)}K`
  }else{
    return price
  }
}

const formatToTal = (value) => {
  if(Number(value) > 9){
    return '9+'
  }
  return value;
}
export {
  formatPrice,
  formatToTal
}
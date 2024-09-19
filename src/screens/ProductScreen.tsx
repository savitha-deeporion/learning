import { RouteProp } from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';




interface Props {
  theme: boolean;
  handleTheme: () => void;
 
}
const products={"category": "men's clothing", "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "id": 1, "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "price": 109.95, "rating": {"count": 120, "rate": 3.9}, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"}
class ProductScreen extends React.Component<Props> {
  render() {
    const {theme, handleTheme, route} = this.props;
    const {
      category,
      description,
      image,
      price,
      rating: {count, rate},
      title,
    } = route.params;
    


    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleTheme}>
          <Text>{theme ? 'Welcome' : 'Welcome Back'}</Text>
          
        </TouchableOpacity>
        <View style={styles.itemcontainer}>
          <Image source={{uri: image}} width={100} height={100}></Image>
          <Text>{category}</Text>

          <Text>{description}</Text>

          <Text>{title}</Text>
          <Text>${price}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 'auto',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  itemcontainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    gap: 5,
  },
});
export default ProductScreen;

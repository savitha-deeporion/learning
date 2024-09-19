

import React from 'react';
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Login from './Forminput ';



type RootStackParamList = {
  Productscreen: { id: number; title: string; price: number; category: string; description: string; image: string };
};

type ProductsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Productscreen'>;
type ProductsScreenRouteProp = RouteProp<RootStackParamList, 'Productscreen'>;

interface Props {
  navigation: ProductsScreenNavigationProp;
  
}

interface Products {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: {
    count: number;
    rate: number;
  };
  image: string;
}

interface State {
  name: string;
  products: Products[];
  loading: boolean;
  error: string | null;
  theme: boolean;
  count: number;
  cart: Products[];
}

interface Item {
  item: Products;
}

class Products extends React.Component<Props, State> {
  //timer: NodeJS.Timeout | null = null;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      name: 'Savitha',
      products: [],
      loading: true,
      error: null,
      theme: false,
      count: 0,
      cart: [],
    };
  }
  fetchData(){
    console.log("fetching")
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((json) => {
 
      this.setState({
        products: json,
        loading: false,
      });
    })
    .catch((error) => {
      this.setState({
        loading: false,
        error: 'Failed to load products.',
      });
    });
  }

  componentDidMount(): void {
   this.fetchData()
  }

  // componentWillUnmount(): void {
  //   if (this.timer) {
  //     clearInterval(this.timer);
  //     this.timer = null;
  //   }
  // }
componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
  if(prevState.count !== this.state.count){
    this.fetchData()
  }
}
  handleTheme = () => {
    this.setState({ theme: !this.state.theme });
  };

  handleIncrease = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleAddCart = (item: Products): void => {
    this.setState((prevState) => ({ cart: [...prevState.cart, item] }));
  };
  filterCategory=()=>{
  const updated=[... this.state.products]
 const data= updated.filter((item)=>item.title.toLowerCase().startsWith("mens"))
 this.setState({products:data})
  }
  

  renderItem = ({ item }: Item) => {
    const { image, title, price } = item;
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Productscreen', item)}
        testID={`product-item-${item.id}`}
        >
        <Image source={{ uri: image }} height={100} style={styles.image} />
        <Text>{title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>${price}</Text>
          <TouchableOpacity onPress={() => this.handleAddCart(item)}>
            <Text style={{ fontWeight: 'bold' }}>Add Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

    );
  };

  render() {
    const { products, loading, error, count, cart } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      );
    }

    // if (error) {
    //   return (
    //     <View style={styles.container}>
    //       <Text>{error}</Text>
    //     </View>
    //   );
    // }

    return (
      <View style={styles.container}>
       
         <Text>{count}</Text>
        <Button title="increase" onPress={() => this.handleIncrease()} />
        <Text>Cart-{cart.length}</Text>
        <Button title='filter' onPress={this.filterCategory}></Button>
        <FlatList
        testID='flatlist'
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
          numColumns={2}
          contentContainerStyle={styles.boxcontainer}
          showsVerticalScrollIndicator={false}
         
        /> 
       
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '45%',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  boxcontainer: {
    paddingHorizontal: 20,
    columnGap: 10,
    rowGap: 10,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
});

export default Products;

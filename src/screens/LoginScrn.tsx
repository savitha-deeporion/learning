import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Button,
} from 'react-native';
import React, {Component} from 'react';
import User from '../utils/mock';
interface LoginState {
  email: string;
  phoneNumber: string;
  errorMessage: string;
  products: [];
  loading: boolean;
  error: string;
}

export default class LoginScrn extends Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      phoneNumber: '',
      errorMessage: '',
      products: [],
      loading: false,
      error: '',
    };
  }
  handleChange = (name: string, value: string) => {
    this.setState({[name]: value} as unknown as Pick<
      LoginState,
      keyof LoginState
    >);
  };

  fetchData() {
    // this.setState({
    //   loading: true,
    // });

    User.get()
      .then(json => {
        this.setState({
          products: json,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: 'error occured',
        });
      });
  }

  // componentDidMount(): void {
  //   this.fetchData();
  // }
  validate(){
  const {phoneNumber,email} = this.state
  if(phoneNumber.length >10 ||phoneNumber.length <10 ) 
  {
    this.setState({error:"number length should be 10 digits"})
    return false
  }
 
else if ( email == ""){
  this.setState({error:"email  should not be empty"})
  return false
}


  return true
  }
  handleSubmit=()=>{
    
    if(this.validate()){
this.setState({error:"no error"})
    }
   

  }

  render() {
    const {email, phoneNumber, errorMessage, loading, error, products} =
      this.state;

  
    return (
      <View>
        {loading?  <ActivityIndicator
          size="small"
          testID="loading-indicator"></ActivityIndicator>:
          <>
          <Text>LoginScrn</Text>
        <Text>{error}</Text>
        <TextInput
          testID="textinputs"
          value={this.state.phoneNumber}
          placeholder="phonenumber"
          onChangeText={value => this.handleChange('phoneNumber', value)}
          
          ></TextInput>
        <TextInput
          testID="textinput"
          value={email.toUpperCase()}
          placeholder="email"
          onChangeText={value => this.handleChange('email', value)}
          style={{borderWidth: 0.5, margin: 10}}></TextInput>
          <Button title='login' onPress={this.handleSubmit}></Button>
        <Text testID="emailvalue">{email}</Text>
        {products.map((data, index) => {
          return (
            <View key={index}>
              <Text>{data.name}</Text>
            </View>
          )
        })}
        </>

         }
        


      </View>
    );
  }
}

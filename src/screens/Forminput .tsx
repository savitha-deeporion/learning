import React, { Component, ContextType } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import ThemeButton from './themescreen';
import { ProfileContext } from '../context/ThemeContext';

interface LoginState {
  email: string;
  phoneNumber: string;
  errorMessage: string;
}

class Login extends Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      phoneNumber: '',
      errorMessage: ''
    };
  }
  static contextType?: React.Context<any> | undefined=ProfileContext
  
  


  validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  handleSubmit = () => {
    const { email, phoneNumber } = this.state;

    if (!this.validateEmail(email)) {
      this.setState({ errorMessage: 'Invalid email format' });
      return;
    }

    if (!this.validatePhoneNumber(phoneNumber)) {
      this.setState({ errorMessage: 'Invalid phone number format' });
      return;
    }

    
    this.setState({ errorMessage: '' });
    Alert.alert('Login Successful', `Email: ${email}\nPhone Number: ${phoneNumber}`);
  };
  handleInputChange=(name:string,value:string):void=>{
this.setState({[name]:value} as Pick<LoginState,keyof LoginState>)
  }
  componentDidMount() {
    this.initProfile();
  }
  initProfile() {
    const context = this.context;
    //Let's fill the context with some value! You can get it from db too.
    const profileData = {
      fullName: 'John Doe',
      username: 'johndoe',
      region: 'EU',
      age: 20
    }
    //Call our setProfile method that we declared in App Component.
    context.setProfile(profileData);
    console.log(context.profile)
  }

  render() {
    const { email, phoneNumber, errorMessage } = this.state;
    const {profile}=this.context

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(value) => this.handleInputChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(value) => this.handleInputChange('phoneNumber', value)}
          keyboardType="numeric"
        />
        
        
        
        <Button title="Login" onPress={this.handleSubmit} />
        <Text>{profile?.fullName}</Text>
        <Text>{profile?.username}</Text>
        <Text>{profile?.region}</Text>
       



{/* <ThemeButton theme={true} handleTheme={() => console.log('Toggle theme')} /> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    justifyContent: 'center',
    padding: 20,
    
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default Login;

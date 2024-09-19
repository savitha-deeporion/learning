/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {SafeAreaView, StyleSheet, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Products from './src/screens/Productsdisplay';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from './src/screens/ProductScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileContext } from './src/context/ThemeContext';
import Login from './src/screens/Forminput ';
import LoginScrn from './src/screens/LoginScrn';
import PhoneNumberForm from './src/screens/PhoneNumberForm';
import LocationSelector from './src/screens/picker';

// const Stack=createStackNavigator()
//   const  Tab=createBottomTabNavigator()
  interface Profile{
    name:string;
    number:string;
    email:string;
    

  }
class App extends React.Component{
  setProfile=(profile:Profile):void=>{
    this.setState(()=>({profile:profile}))
  }
  state = {
    profile: null,
    setProfile: this.setProfile,
  }
  
render(){
  return (
  //  <ProfileContext.Provider value={this.state}>
  //   <NavigationContainer >
      
  //     <Tab.Navigator initialRouteName='Products' screenOptions={{headerShown:false}}>
  //     <Tab.Screen name="Products" component={Products} ></Tab.Screen>
  //     <Tab.Screen name="Productscreen" component={ProductScreen}></Tab.Screen>
  //     <Tab.Screen name="login" component={Login}></Tab.Screen>
      
         
  //         </Tab.Navigator>
  //         </NavigationContainer>
  //         </ProfileContext.Provider>
  <Products></Products>
  
      // <LoginScrn></LoginScrn>
      // <PhoneNumberForm></PhoneNumberForm>
      //<LocationSelector/>
       
      );
}
 
}

export default App;

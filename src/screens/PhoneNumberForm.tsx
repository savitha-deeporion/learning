import React, { Component } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

class PhoneNumberForm extends Component {
  state = {
    phoneNumber: '',
    loading: false,
    error: '',
    success: '',
  };

  validatePhoneNumber = () => {
    const { phoneNumber } = this.state;
    return phoneNumber.length === 10;
  };

  handleSubmit = async () => {
    if (!this.validatePhoneNumber()) {
      this.setState({ error: 'Invalid phone number' });
      return;
    }
    
    this.setState({ loading: true });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', 
    //     {
    //     method: 'POST',
    //     body: JSON.stringify({ phoneNumber: this.state.phoneNumber }),
    //   }
    );
      const result = await response.json();
      console.log("result",result[0].address.city)
      this.setState({ success: "Phone number submitted successfully" });
    } catch (e) {
      this.setState({ error: 'Submission failed' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { phoneNumber, loading, error, success } = this.state;

    return (
      <View>
        <TextInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={(text) => this.setState({ phoneNumber: text })}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
        {loading && <ActivityIndicator />}
        {error ? <Text>{error}</Text> : null}
        {success ? <Text>{success}</Text> : null}
      </View>
    );
  }
}

export default PhoneNumberForm;

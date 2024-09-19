// LocationSelector.tsx
import React, { Component } from 'react';
import { View, Text ,StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Dummy data
const data = {
  countries: [
    { id: 1, name: 'USA', states: [
      { id: 1, name: 'California', districts: ['Los Angeles', 'San Francisco'] },
      { id: 2, name: 'New York', districts: ['New York City', 'Buffalo'] }
    ]},
    { id: 2, name: 'Canada', states: [
      { id: 1, name: 'Ontario', districts: ['Toronto', 'Ottawa'] },
      { id: 2, name: 'Quebec', districts: ['Montreal', 'Quebec City'] }
    ]}
  ]
};

interface State {
  selectedCountry: string;
  selectedState: string;
  selectedDistrict: string;
  states: { id: number, name: string, districts: string[] }[];
  districts: string[];
}

class LocationSelector extends Component<{}, State> {
  state: State = {
    selectedCountry: '',
    selectedState: '',
    selectedDistrict: '',
    states: [],
    districts: []
  };

  handleCountryChange = (value: string) => {
    const countryId = parseInt(value);
    const country = data.countries.find(c => c.id === countryId);

    if (country) {
      this.setState({
        selectedCountry: country.name,
        selectedState: '',
        selectedDistrict: '',
        states: country.states,
        districts: []
      });
    }
  };

  handleStateChange = (value: string) => {
    const stateId = parseInt(value);
    const state = this.state.states.find(s => s.id === stateId);

    if (state) {
      this.setState({
        selectedState: state.name,
        selectedDistrict: '',
        districts: state.districts
      });
    }
  };

  handleDistrictChange = (value: string) => {
    this.setState({
      selectedDistrict: value
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Country:</Text>
        <Picker
          selectedValue={this.state.selectedCountry}
          onValueChange={this.handleCountryChange}
          style={styles.picker}
          testID="country-picker"
        >
          <Picker.Item label="Select Country" value="" />
          {data.countries.map(country => (
            <Picker.Item key={country.id} label={country.name} value={country.id.toString()} />
          ))}
        </Picker>

        <Text>State:</Text>
        <Picker
          selectedValue={this.state.selectedState}
          onValueChange={this.handleStateChange}
          style={styles.picker}
          enabled={this.state.selectedCountry !== ''}
          testID="state-picker"
        >
          <Picker.Item label="Select State" value="" />
          {this.state.states.map(state => (
            <Picker.Item key={state.id} label={state.name} value={state.id.toString()} />
          ))}
        </Picker>

        <Text>District:</Text>
        <Picker
          selectedValue={this.state.selectedDistrict}
          onValueChange={this.handleDistrictChange}
          style={styles.picker}
          enabled={this.state.selectedState !== ''}
          testID="district-picker"
        >
          <Picker.Item label="Select District" value="" />
          {this.state.districts.map(district => (
            <Picker.Item key={district} label={district} value={district} />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  }
});

export default LocationSelector;

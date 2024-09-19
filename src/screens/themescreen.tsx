import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

interface Props {
  theme: boolean;
  handleTheme: () => void;
}

class ThemeButton extends React.Component<Props> {

  static defaultProps: {
      theme: boolean; // Default to light mode
      handleTheme: () => void;
  };
 
  render() {
    const { theme, handleTheme } = this.props;
    
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleTheme}>
          <Text>{theme ? 'Dark Mode' : 'Light Mode'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ThemeButton.defaultProps = {
  theme: false, // Default to light mode
  handleTheme: () => console.log('Default theme handler'),
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default ThemeButton;

import React, { Component } from 'react';
import { View, TextInput, Text, FlatList } from 'react-native';

interface Item {
  id: number;
  name: string;
}

interface State {
  searchTerm: string;
  items: Item[];
  filteredItems: Item[];
}

export default class SearchComponent extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      items: [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Cherry' },
        { id: 4, name: 'Date' },
        { id: 5, name: 'Elderberry' },
      ],
      filteredItems: [],
    };
  }

  componentDidMount() {
    this.setState({ filteredItems: this.state.items });
  }

  handleSearch = (text: string) => {
    const filteredItems = this.state.items.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ searchTerm: text, filteredItems });
  };

  render() {
    const { searchTerm, filteredItems } = this.state;

    return (
      <View>
        <TextInput
          testID="search-input"
          placeholder="Search"
          value={searchTerm}
          onChangeText={this.handleSearch}
        />
        <FlatList
          testID="item-list"
          data={filteredItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Text testID='text'>{item.name}</Text>}
        />
      </View>
    );
  }
}

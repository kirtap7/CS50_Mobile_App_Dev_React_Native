import React from 'react';
import {
  Button,
  SectionList,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';

import Row from './Row.js'
import Header from './Header.js'

const renderItem = ({ item }) => (
  <Row value={item} />
);

const renderSectionHeader = ({ section }) => (
  <Header title={section.sectionTitle} />
);

const toArray = val => (val instanceof Array ? val : [val]);

const DATA = {
  primitiveString: 'hello',
  array: ['one', 2, '3', 'four'],
  primitiveNumber: 123,
  array2: ['abc', '789'],
};

export default class App extends React.Component {
  state = {
    obj: DATA,
    showForm: false,
    formKey: '',
    formValue: '',
  };

  displayForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
      formKey: '',
      formValue: '',
    }));
  };

  setFormKey = key => {
    this.setState({
      formKey: key,
    });
  };

  setFormValue = value => {
    this.setState({
      formValue: value,
    });
  };

  modifyElement = (key, value) => {
    this.setState(prevState => {
      //if value of key is an array, add new value at the beginning of the array
      if (prevState.obj[key] instanceof Array) {
        return {
          obj: { ...prevState.obj, [key]: [value, ...prevState.obj[key]] },
        };
      } //else add new or replace element
      else {
        return { obj: { ...prevState.obj, [key]: value } };
      }
    });
  };

  render() {
    const sections = Object.keys(this.state.obj).map(key => ({
      sectionTitle: key,
      data: toArray(this.state.obj[key]),
    }));

    return (
      <View style={styles.container}>
        <Button title="Add/Edit element" onPress={() => this.displayForm()} />
        {this.state.showForm && [
          <Text style={{ textAlign: 'center' }}> {'Enter a Key'} </Text>,
          <TextInput
            style={styles.inputBox}
            onChangeText={value => this.setFormKey(value)}
            value={this.state.formKey}
          />,
          <Text style={{ textAlign: 'center' }}> {'Enter a Value'} </Text>,
          <TextInput
            style={styles.inputBox}
            onChangeText={value => this.setFormValue(value)}
            value={this.state.formValue}
          />,
          <Button
            title="Submit"
            onPress={() => {
              this.modifyElement(this.state.formKey, this.state.formValue);
              this.displayForm();
            }}
          />,
        ]}
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    paddingTop: Constants.statusBarHeight,
  },
  inputBox: {
    height: 25,
    width: 200,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'center',
    fontSize: 18,
    textAlign: 'center',
  },
});

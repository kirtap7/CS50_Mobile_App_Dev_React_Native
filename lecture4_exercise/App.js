import React from 'react';
import {Button,SectionList,StyleSheet,View,Text,TextInput} from 'react-native';
import Constants from 'expo-constants';

import Row from './Row.js'
import Header from './Header.js'
import ModifyElement from './ModifyObject.js'

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
  };

  displayForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
    }));
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
    this.displayForm();
  };

  render() {
    const sections = Object.keys(this.state.obj).map(key => ({
      sectionTitle: key,
      data: toArray(this.state.obj[key]),
    }));

    return (
      <View style={styles.container}>
        <Button title="Add/Edit element" onPress={() => this.displayForm()} />
        {this.state.showForm && <ModifyElement onSubmit={this.modifyElement}/>}
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
});

import React from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

export default class ModifyElement extends React.Component {
  state = {
    formKey: '',
    formValue: '',
  };

  setFormKey = formKey => {
    this.setState({formKey});
  };

  setFormValue = formValue => {
    this.setState({formValue});
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.formKey, this.state.formValue);
  };

  render() {
    return (
      <View>
        <Text style={{ textAlign: 'center' }}> {'Enter a Key'} </Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={value => this.setFormKey(value)}
          value={this.state.formKey}
        />
        <Text style={{ textAlign: 'center' }}> {'Enter a Value'} </Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={value => this.setFormValue(value)}
          value={this.state.formValue}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

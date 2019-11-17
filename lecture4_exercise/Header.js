import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types'

const Header = props => (
  <View>
    <Text style={styles.header}>{props.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    color:'darkblue',
    backgroundColor: 'white',
    marginLeft: 10,
    fontSize: 20,
  },
});

Header.propTypes = {
  value: PropTypes.string
}

export default Header
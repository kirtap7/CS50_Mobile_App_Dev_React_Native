import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types'

const Row = props => (
  <View >
    <Text style={styles.row}>{props.value}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    padding: 15,
    marginLeft: 10,
    fontSize: 18,
  },
});

Row.propTypes = {
  value: PropTypes.any,
}

export default Row
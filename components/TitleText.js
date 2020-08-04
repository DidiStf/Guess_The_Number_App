import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BodyText = ({ children, style }) => (
  <Text style={{ ...styles.titleText, ...style }}>{children}</Text>
);

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
});

export default BodyText;

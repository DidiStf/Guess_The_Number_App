import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BodyText = ({ children, style }) => (
  <Text style={{ ...styles.bodyText, ...style }}>{children}</Text>
);

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans',
  },
});

export default BodyText;

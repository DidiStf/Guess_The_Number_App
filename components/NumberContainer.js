import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BodyText from './BodyText';

import colors from '../constants/colors';

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.numberContainer}>
      <BodyText style={styles.number}>{children}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: colors.accent,
    fontSize: 22,
  },
});

export default NumberContainer;

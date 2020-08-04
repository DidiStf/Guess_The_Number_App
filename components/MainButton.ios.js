import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import colors from '../constants/colors';

const MainButton = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={{ ...styles.mainButton, style }}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
  mainButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
});

export default MainButton;

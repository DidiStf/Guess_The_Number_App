import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import colors from '../constants/colors';

const MainButton = ({ children, onPress, style }) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={onPress}>
        <View style={{ ...styles.mainButton, style }}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonText: {
    color: colors.background,
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

import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colors from '../constants/colors';

import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';

const GameOverView = ({ navigation }) => {
  const rounds = navigation.getParam('rounds');
  const userNumber = navigation.getParam('userNumber');
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );

  const handleNewGame = () => {
     navigation.popToTop();
  };

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <ScrollView>
      <View style={styles.gameOverView}>
        <TitleText>The Game is Over!</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            width: availableDeviceWidth * 0.7,
            height: availableDeviceWidth * 0.7,
            marginVertical: availableDeviceHeight / 20,
          }}>
          <Image
            source={require('../assets/images/success.png')}
            style={styles.image}
          />
        </View>
        <View
          style={{
            ...styles.resultContainer,
            marginVertical: availableDeviceHeight / 40,
          }}>
          <BodyText
            style={{
              ...styles.resultText,
              fontSize: availableDeviceHeight < 600 ? 16 : 20,
            }}>
            Your phone needed <Text style={styles.highlight}>{rounds}</Text>{' '}
            rounds to guess the number{' '}
            <Text style={styles.highlight}>{userNumber}</Text>.
          </BodyText>
        </View>
        <MainButton onPress={handleNewGame}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gameOverView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  resultContainer: {
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: 'center',
  },
});

export default GameOverView;

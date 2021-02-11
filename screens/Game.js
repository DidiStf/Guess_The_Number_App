import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';

import colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.guessListItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameView = ({ navigation }) => {
  const userChoice = navigation.getParam('userChoice');
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const handleNextGuess = (hint) => {
    if (
      (hint === 'lower' && currentGuess < userChoice) ||
      (hint === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert(`Don't try to cheat!`, `You know that this is wrong...`, [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }
    if (hint === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((currentPastGuesses) => [
      nextNumber.toString(),
      ...currentPastGuesses,
    ]);
  };

  const handleGameOver = () => {
    navigation.navigate({
      routeName: 'GameOverView',
      params: {
        rounds: pastGuesses.length,
        userNumber: userChoice,
      },
    });
  };

  useEffect(() => {
    if (currentGuess === userChoice) {
      handleGameOver();
    }
  }, [currentGuess, handleGameOver, userChoice]);

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

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.gameView}>
        <TitleText>Phone's Guess</TitleText>
        <View style={styles.smallScreenControls}>
          <MainButton onPress={() => handleNextGuess('lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => handleNextGuess('greater')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>
        <View
          style={{
            ...styles.listContainer,
            width: availableDeviceWidth > 350 ? '60%' : '80%',
          }}
        >
          <FlatList
            contentContainerStyle={styles.list}
            data={pastGuesses}
            renderItem={(item) => renderListItem(pastGuesses.length, item)}
          ></FlatList>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.gameView}>
      <TitleText>Phone's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card
        style={{
          ...styles.buttonContainer,
          marginTop: availableDeviceHeight > 600 ? 20 : 5,
        }}
      >
        <MainButton onPress={() => handleNextGuess('lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={() => handleNextGuess('greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={(item) => renderListItem(pastGuesses.length, item)}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 400,
    maxWidth: '80%',
  },
  gameView: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  guessListItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    width: '100%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listContainer: {
    flex: 1,
  },
  smallScreenControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
  },
});

export default GameView;

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';

import colors from '../constants/colors';

const StartGameView = ({ navigation }) => {
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );
  const [confirmed, setConfirmed] = useState(false);
  const [enteredValue, setEnteredValue] = useState('');
  const [selectedNumber, setSelectedNumber] = useState(null);
  let confirmedOutput;

  const handleConfirmInput = () => {
    const choosenNumber = parseInt(enteredValue);
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert('Invalud number!', 'Number has to be between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: handleResetInput },
      ]);
      return;
    }
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(parseInt(enteredValue));
    Keyboard.dismiss();
  };

  const handleInputNumber = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const handleResetInput = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const handleStartGame = () => {
    setConfirmed(false);
    setEnteredValue('');
    setSelectedNumber(null);
    navigation.navigate({
            routeName: 'GameView',
            params: {
              userChoice: selectedNumber,
            },
          });
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.startGameView}>
            <TitleText>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                blurOnSubmit
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={handleInputNumber}
                value={enteredValue}
              />
              <View style={styles.buttonsContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Reset'
                    onPress={handleResetInput}
                    color={colors.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Confirm'
                    onPress={handleConfirmInput}
                    color={colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmed ? (
              <Card style={styles.summaryConntainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={handleStartGame}>
                  Start Game
                </MainButton>
              </Card>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  inputContainer: {
    minWidth: 300,
    width: '80%',
    maxWidth: '95%',
    alignItems: 'center',
    marginTop: 10,
  },
  summaryConntainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  startGameView: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
export default StartGameView;

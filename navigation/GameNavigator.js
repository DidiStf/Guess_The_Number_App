import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Game from '../screens/Game';
import GameOver from '../screens/GameOver';
import StartGame from '../screens/StartGame';

import colors from '../constants/colors';

const android = Platform.OS === 'android';

const GameNavigator = createStackNavigator(
  {
    StartGameView: StartGame,
    GameView: Game,
    GameOverView: {
      screen: GameOver,
      navigationOptions: { headerLeft: () => null },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: android ? colors.primary : 'white',
        borderBottomColor: android ? '' : '#ccc',
      },
      headerTintColor: android ? 'white' : colors.primary,
      headerTitle: 'Guess The Number',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontFamily: 'open-sans-bold' },
    },
  }
);

export default createAppContainer(GameNavigator);

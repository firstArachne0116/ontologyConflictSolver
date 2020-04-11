/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

// screens
import Splash from './screens/onboarding/Splash';
import Login from './screens/onboarding/Login';
import RegisterUser from './screens/onboarding/RegisterUser';
import Home from './screens/home/Home';


const Root = createStackNavigator({
  Splash: {
    screen: Splash
  },
  Login: {
    screen: Login
  },
  RegisterUser: {
    screen: RegisterUser
  },
  Home: {
    screen: Home
  },
}, 
{
  initialRouteName: 'Splash',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
  },
})
export default createAppContainer(Root);
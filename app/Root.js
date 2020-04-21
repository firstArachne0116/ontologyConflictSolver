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
import HomeLayout from './screens/home/HomeLayout';
import Category from './screens/Decision/Category';
import Approve from './screens/Decision/Approve';


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
  HomeLayout: {
    screen: HomeLayout
  },
  Category: {
    screen: Category
  },
  Approve: {
    screen: Approve
  }
}, 
{
  initialRouteName: 'Splash',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
  },
})
export default createAppContainer(Root);
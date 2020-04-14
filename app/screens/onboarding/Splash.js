import React from 'react';
import { View, Text, Image } from 'react-native';

import PrimaryButton from '../../components/PrimaryButton';

export default Splash = ( props ) => {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Conflict Solver
        </Text>
        <Image
          source={require('../../assets/images/logo.png')}
        />
      </View>
      <View>
        <PrimaryButton buttonText={'Register User'}
          onPressFunc={() => props.navigation.navigate('RegisterUser')} 
          marginLeft={28} 
          marginRight={28} 
        />
        <PrimaryButton buttonText={'Login'} 
          onPressFunc={() => props.navigation.navigate('Login')}
          bgColor={'#ffffff'} 
          color={'#003458'}
          textBold={'bold'}
          marginLeft={28} 
          marginRight={28}/>
      </View>
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingVertical: 30,
    backgroundColor: 'white',
  },
  text: {
    marginTop: 30,
    marginBottom: 15,
    color: "#003458",
    fontSize: 30,
    textAlign: 'center',
  },
};

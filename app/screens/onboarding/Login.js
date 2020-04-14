import React, {useState, useEffect} from 'react';
import { ScrollView, View } from 'react-native';

import PrimaryButton from '../../components/PrimaryButton';
import FormField from '../../components/FormField';
import PopupAlert from '../../components/PopupAlert';
import NavHeader from '../../components/NavHeader';

import { login } from '../../api/auth';

import {useDispatch} from 'react-redux';

import {setUser} from '../../store/actions/main';

export default Login = ( props ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [errorInfoModal, setErrorInfoModal] = useState(false);


  const dispatch = useDispatch();

  const handleUsername = (s) => {
    setUsername(s);
  }

  const handlePassword = (s) => {
    setPassword(s);
  }

  const onLogin = () => {
    login(username, password).then(result => {
      if (result.data.error) {
        setMessage(result.data.message);
        setErrorInfoModal(true);
      }
      else {
        dispatch(setUser({email: result.data.email, username, expertId: result.data.expertId}));
        props.navigation.navigate('HomePage');
      }
    }).catch( err => {
      console.log(err);
      let msg = 'Connection error. Please check your network connection.';
      switch (err.response.status) {
        case 404:
          msg = "Server not found";
          break;
        case 403:
          msg = "You are forbidden.";
          break;
        case 401:
          msg = "You are unautherized";
          break;
      }
      setMessage(msg);
      setErrorInfoModal(true);
    });
  }
  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <NavHeader
          headerText={'Login'}
          size={22}
          bold={true}
          letterSpacing={1.6}
          navigation={props.navigation}
          onBackFunc={()=>{props.navigation.navigate('Splash')}}
      />
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <FormField marginTop={28} placeholder={'Enter Username'} value={username} onChange={handleUsername}/>
          <FormField placeholder={'Enter Password'} value={password} onChange={handlePassword} password={true} />
        </View>
        <PrimaryButton 
          buttonText={'Login'} 
          onPressFunc={onLogin} 
          marginLeft={20} 
          marginRight={20} 
          marginBottom={40}
          enable={(username != "" && password != "")}
        />
      </View>
      <PopupAlert
        popupTitle="Error"
        message={message}
        isVisible={errorInfoModal}
        handleOK={()=>{setErrorInfoModal(false)}}
      />
    </ScrollView>
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
    width: '100%',
    paddingVertical: 30,
  },
  text: {
    marginTop: 30,
    marginBottom: 15,
    color: "#003458",
    fontSize: 30,
    textAlign: 'center',
  },
};

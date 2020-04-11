import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class NavHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.navigation.goBack();
  }

  render() {
    var onBackFunc = this.props.onBackFunc ? this.props.onBackFunc : this.handleBack;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={()=> onBackFunc()}>
          <Image source={require('../assets/images/back-arrow_2.png')} />
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>&nbsp;{this.props.headerText}</Text>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    padding: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
  backBtn: {
    position: 'absolute',
    left: 5,
    top: 7,
    padding: 10,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 22,
    color: '#003458',
    fontWeight: 'bold'
  },
})
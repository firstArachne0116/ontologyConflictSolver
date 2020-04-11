import React from 'react';
import { View, TouchableOpacity, Text} from 'react-native';

export default PrimaryButton = (props) => {
  var diableState = false;
  if(props.enable != undefined) 
    diableState = !props.enable;
  var borderColor = (props.borderColor ? props.borderColor : '#003458'),
      backgroundColor = (props.bgColor ? props.bgColor : '#003458');
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      borderWidth: 2,
      borderRadius: 8,
      //opacity: (diableState ? 0.2 : 1),
      // width: (props.size ? props.size : '100%'),
      margin: (props.margin ? props.margin : 3),
      marginLeft: (props.marginLeft ? props.marginLeft : 18),
      marginRight: (props.marginRight ? props.marginRight : 18),
      marginTop: (props.marginTop ? props.marginTop : 10),
      marginBottom: (props.marginBottom ? props.marginBottom : 10),
      borderColor: (diableState ? '#BFCFDB' : borderColor),
      backgroundColor: (diableState ? '#BFCFDB' : backgroundColor),
    },
    button: {
      width: (props.size ? props.size : '100%'),
      height: '100%',
      padding: (props.padding ? props.padding : 13),
    },
    buttonText: {
      //fontFamily: "SFProDisplay",
      fontSize: (props.fontSize ? props.fontSize : 18),
      fontWeight: "bold",
      letterSpacing: 0.53,
      textAlign: "center",
      width: '100%',
      height: 24,
      color: (props.color ? props.color : "white"),
    },
  };

  var pressFunc = props.onPressFunc;
  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={diableState} style={styles.button} onPress={() => { if (props.onPressFunc) pressFunc(); }}>
        <Text style={styles.buttonText}>
          {props.buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

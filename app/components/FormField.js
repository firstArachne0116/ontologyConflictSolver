import React from 'react';
import { View, TextInput } from 'react-native';

export default FormField = (props) => {
  const styles = {
    container: {
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: (props.marginTop ? props.marginTop : 0),
    },
    form: {
      width: '100%',
      margin: 8,
      marginLeft: (props.marginLeft ? props.marginLeft : 0),
      marginRight: (props.marginRight ? props.marginRight : 0),
      height: 50,
      borderColor: '#C5C6C5',
      borderWidth: 2,
      borderRadius: 4,
      padding: 10,
      color: '#003458',
      fontSize: 18,
      width: (props.size ? props.size : '100%'),
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.form}
        placeholder={props.placeholder}
        placeholderTextColor={'#99AEBC'}
        value={props.value}
        onChangeText={props.onChange}
        secureTextEntry={props.password ? true : false}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
};

import React, { useState } from 'react';

import { View, Text } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

export default Home = (props) => {
    const auth = useSelector(state => state.main.auth);
    
    return (
        <View>
            <Text>
                Welcome
            </Text>
        </View>
    )
}

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
  
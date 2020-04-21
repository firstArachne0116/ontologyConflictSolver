import React, {useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

export default Home = (props) => {
    const auth = useSelector(state => state.main.auth);
    return (
        <ScrollView style={{backgroundColor:'#ffffff'}}>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>
                    Welcome {auth.username}!
                </Text>
                <Image
                  source={require('../../assets/images/logo.png')}
                />
                <Text style={styles.text}>
                    You have {props.unsolvedCount} unsolved tasks.
                </Text>
                <Text style={styles.text}>
                    To see them, please click Tasks button above.
                </Text>
            </View>
        </ScrollView>
    )
}

const styles={
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        color: '#003458',
        fontStyle: 'italic',
    },
    text: {
        fontSize: 24,
        color: '#003458',
        fontStyle: 'italic',
        textAlign: 'justify',
        width: '100%'
    }
}
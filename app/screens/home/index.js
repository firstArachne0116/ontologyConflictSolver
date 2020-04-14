import React, { useState } from 'react';

import { Dimensions, View, Text, ScrollView } from 'react-native';

import NavTabs from '../../components/NavTabs';

import Home from './Home';
import Task from './Task';

export default HomePage = (props) => {
    const [tabID, setTabID] = useState(0);

    const deviceHeight = Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

    const onChangTab = (id) => {
        setTabID(id);
    }

    const renderContent =  () => {
      if(tabID == 0)
      {
        return (
          <Home navigation={props.navigation}/>
        );
      } 
      else {
        return (
          <Task navigation={props.navigation}/>
        );
      }
    }
    return (
        <View style={styles.container}>
            <View style={{height: 112, display: 'flex', justifyContent: 'center', zIndex: 99999}}>
                <NavTabs active={tabID} changeFunc={onChangTab} navigation={props.navigation}/>
            </View>
            <View style={{marginTop: 18, width: '100%', height: deviceHeight - 220}}>
                { renderContent() }
            </View>
        </View>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    text: {
        marginTop: 30,
        marginBottom: 15,
        color: "#003458",
        fontSize: 30,
        textAlign: 'center',
    },
};
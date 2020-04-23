import React, { useState, useEffect } from 'react';

import { Dimensions, View, Text, ScrollView } from 'react-native';

import NavTabs from '../../components/NavTabs';

import Home from './Home';
import Task from './Task';


import api from '../../api/tasks';
import { set_tasks } from '../../store/actions'
import { set_quality } from '../../store/actions'
import { set_structure } from '../../store/actions'

import { useDispatch, useSelector } from 'react-redux';

const getStructure = (data, structures, index) => {
    structures.push({
        id: index,
        name: data.text
    });
    if (data.children){
        data.children.map(child => {
            index = getStructure(child, structures, ++index);
        })
    }
    return index;
}
export default HomeLayout = (props) => {
    const [tabID, setTabID] = useState(0);
    const auth = useSelector(state => state.main.auth);
    const [unsolvedCount, setUnsolvedCount] = useState(0);
    const dispatch = useDispatch();

    const deviceHeight = Platform.OS === "ios"
        ? Dimensions.get("window").height
        : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

    const onChangTab = (id) => {
        if (id == 0) {
            api.getCount(auth.expertId).then(result=>{
                console.log(result);
                if (result.data.count != unsolvedCount) {
                    setUnsolvedCount(result.data.count);
                }
                setTabID(id);
            })
        }
        else if (id == 1){
            api.getTasks(auth.expertId).then(result=>{
                console.log(result.data);
                dispatch(set_tasks(result.data.task_data));
                setTabID(id);
            });
        }
    }

    useEffect(() => {
        api.getCount(auth.expertId).then(result=>{
            console.log(result);
            if (result.data.count != unsolvedCount) {
                setUnsolvedCount(result.data.count);
            }
        })
        api.getTasks(auth.expertId).then(result=>{
            console.log(result.data);
            dispatch(set_tasks(result.data.task_data));
        });
        api.getStructure().then(result => {
            let structures = [];
            getStructure(result.data, structures, 1);
            console.log(structures);
            dispatch(set_structure(structures));
        });
        api.getQuality().then(result => {
            dispatch(set_quality(result.data.children.map(it => it.text)));
        })
    }, [])

    const renderContent =  () => {
      if(tabID == 0)
      {
          return (
            <Home navigation={props.navigation} unsolvedCount={unsolvedCount}/>
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
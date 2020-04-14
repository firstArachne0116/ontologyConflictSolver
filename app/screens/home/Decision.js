import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, Dimensions, TextInput} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';


import NavHeader from '../../components/NavHeader';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import api from '../../api/tasks';
import { set_options } from '../../store/actions'

export default Decision = (props) => {
    const [task, setTask] = useState(props.navigation.getParam('task',{}));
    const auth = useSelector(state => state.main.auth);
    const options = useSelector(state => state.main.data.options);
    const dispatch = useDispatch();
    const [optionIndex, setOptionIndex] = useState(null);
    const [comment, setComment] = useState(null);
    
    var deviceHeight = Platform.OS === "ios"
        ? Dimensions.get("window").height
        : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

    const getTerm = () => {
        api.getOptions(task.termId).then(result=>{
            console.log(result);
            dispatch(set_options(result.data.options_data));
        });
    }
    useEffect(() => {
        getTerm();
    }, []);
    useEffect(()=>{
        deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
    })

    const submitDecesion = () => {
        if (optionIndex != null){
            api.submitDecesion(auth.expertId, task.conflictId, optionIndex==-1 ? 'None of above' : options[optionIndex].option_,comment).then(result => {
                console.log(result);
                if (result.data.error){

                }
                else {
                    props.navigation.goBack();
                }
            });
        }
    }


    return (
        <ScrollView contentContainerStyle={{backgroundColor: "#fff", flexDirection: 'column', justifyContent: 'space-between'}}>
            <NavHeader
                headerText={task.term}
                size={22}
                bold={true}
                letterSpacing={1.6}
                navigation={props.navigation}
                onBackFunc={()=>{props.navigation.goBack()}}
            />
            <View style={{alignContent: 'center', alignItems: 'center', width: '100%', padding: 10}}>
                <Text style={{...styles.senctence, color: '#555', fontWeight: '800'}}>{task.sentence}</Text>
            </View>
            <View style={{alignContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'green'}}>
                <Text style={{...styles.senctence, color: '#fff'}}>Which of the following category does the word being?</Text>
            </View>
            <ScrollView contentContainerStyle={{padding: 10}} style={{height: deviceHeight - 280}}>
                {
                    options.map((option, index)=> (
                        <TouchableOpacity key={index} onPress={() => {setOptionIndex(index)}}>
                            <View style={styles.option}>
                                <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '30%'}}>
                                    <Text style={{fontSize: 20}}>
                                        {option.option_}
                                    </Text>
                                </View>
                                <Image source={require('../../assets/images/noimage.png')} style={{width: '30%'}}/>
                                <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
                                {
                                    optionIndex == index &&
                                    <Image source={require('../../assets/images/ok.png')} style={{width: 40, height: 40}}/>
                                }
                                </View>
                            </View>
                            <Text style={styles.senctence}>
                                {option.definition}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
                <TouchableOpacity onPress={() => {setOptionIndex(-1)}}>
                    <View style={styles.option}>
                        <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '30%'}}>
                            <Text style={{fontSize: 20}}>
                                None of the above, enter your definition below
                            </Text>
                        </View>
                        <Image source={require('../../assets/images/noimage.png')} style={{width: '30%'}}/>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', width:"30%"}}>
                        {
                            optionIndex == -1 &&
                            <Image source={require('../../assets/images/ok.png')} style={{width: 40, height: 40}}/>
                        }
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput placeholder="Enter or record comment" style={{color: '#003458', width: '75%', marginLeft: 5}} onChangeText={txt => {setComment(txt)}}>{comment}</TextInput>
                <TouchableOpacity style={{...styles.button, backgroundColor: 'green'}}>
                    <FontAwesomeIcon name="microphone" size={20} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.button, backgroundColor: '#013458'}} onPress={() => {submitDecesion()}}>
                    <Image style={{width: 20, height: 20}} source={require('../../assets/images/send-icon.png')} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = {
    senctence: {
        textAlign: 'left',
        fontSize: 12,
    },
    option: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start'
    },
    inputContainer: {
        borderRadius: 9999,
        backgroundColor: '#f1f1f1',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
    button: {
        borderRadius: 9999,
        padding: 8,
        width: 35,
        height: 35,
        alignItems: 'center',
        alignContent: 'center',
    }
}
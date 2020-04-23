import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { useDispatch, useSelector } from 'react-redux';

import NavHeader from '../../components/NavHeader';
import PrimaryButton from '../../components/PrimaryButton';
import PopupConfirm from '../../components/PopupConfirm';

import api from '../../api/tasks';
import { set_approve_options } from '../../store/actions'
import { set_tasks } from '../../store/actions'

export default Approve = (props) => {
    const [task, setTask] = useState(props.navigation.getParam('task',{}));

    var selection = (new Array(task.sCount)).fill(false);
    var setSelection = (new Array(task.sCount)).fill(null);
    ((new Array(task.sCount)).fill(null)).map((it, index) => {
        [selection[index], setSelection[index]] = useState(false);
    })

    const [newDefinition, setNewDefinition] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false);


    const auth = useSelector(state => state.main.auth);
    const options = useSelector(state => state.main.data.approveOptions);
    
    const dispatch = useDispatch();
    
    var deviceHeight = Platform.OS === "ios"
        ? Dimensions.get("window").height
        : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

    const getTerm = () => {
        api.getApproveOptions(task.termId, auth.expertId).then(result=>{
            console.log(result);
            dispatch(set_approve_options(result.data));
        });
    }
    
    useEffect(() => {
        getTerm();
    }, []);
    
    const setDefinition = (definitionId) => {
        const sentenceIds = options.sentence.filter((it, index) => selection[index]).map(it => it.id);
        // api.setDefinition(auth.expertId, sentenceIds, definitionId).then(result => {
        //     console.log(result);
        //     dispatch(set_approve_options(result.data));
        // });
        let tmp = options;
        console.log(sentenceIds);
        sentenceIds.map(sId => {
            if (!tmp.approveData.find(it => it.sentenceId == sId && it.definitionId == definitionId)) {
                console.log('abc');
                tmp.approveData.push({sentenceId: sId, definitionId});
            }
        })
        console.log(tmp);
        dispatch(set_approve_options(tmp));
        selection.map((sel, index) => {
            if (sel) {
                setSelection[index](false);
            }
        })
    }
    const addDefinition = () => {
        api.addDefinition(task.termId, auth.expertId, newDefinition).then(result => {
            console.log(result);
            dispatch(set_approve_options({...options,...result.data}));
            setNewDefinition('');
        })
    }

    const onSubmit = () => {
        setConfirmModal(true);
    }

    const onConfirmSubmit = () => {
        api.setDefinition(auth.expertId, options.approveData.map(item => item.sentenceId), options.approveData.map(item => item.definitionId)).then(result => {
            console.log(result);
            api.getTasks(auth.expertId).then(result=>{
                dispatch(set_tasks(result.data.task_data));
                props.navigation.goBack();
            });
        })
    }

    return (
        <ScrollView contentContainerStyle={{backgroundColor: "#fff", flexDirection: 'column', justifyContent: 'space-between'}}>
            <NavHeader
                headerText={task.term}
                size={22}
                bold={true}
                letterSpacing={1.6}
                navigation={props.navigation}
                onBackFunc={()=>{
                    api.getTasks(auth.expertId).then(result=>{
                        dispatch(set_tasks(result.data.task_data));
                        props.navigation.goBack();
                    });
                }}
            />
            <View style={{ flexDirection: 'row',alignContent: 'flex-start', alignItems: 'flex-start', width: '100%', padding: 10}}>
                <Text style={{...styles.sentence}}>Approve definition for: </Text>
                <Text style={{...styles.sentence, color: 'red', fontWeight: '800'}}>{task.term}</Text>
                <Text style={{...styles.sentence, textDecorationLine: 'underline'}}>({task.data})</Text>
            </View>
            <ScrollView contentContainerStyle={{padding: 10}} style={{height: deviceHeight - 260}}>
                <Text style={{...styles.sentence, color: '#003458'}}>
                    Example sentences:
                </Text>
                {
                    options && options.sentence &&
                    options.sentence.map((item, index) => (
                        <View key={'sentence'+index} style={{flexDirection: 'row', alignItems: 'center'}}>
                            {selection[index] ?
                                <CheckBox
                                    value = {true}
                                    onValueChange = {(val)=>{
                                        setSelection[index](false);
                                    }}
                                />
                                :
                                <CheckBox
                                    value = {false}
                                    onValueChange = {(val)=>{
                                        setSelection[index](true);
                                    }}
                                />
                            }
                            <Text>{index+1}. {item.sentence}</Text>
                        </View>
                    ))
                }
                <Text style={{...styles.sentence, color: '#003458'}}>
                    Proposed definitions:
                </Text>
                {
                    options && options.definition &&
                    options.definition.map((item, index) => {
                        // const checkColor = selection.find( (sel, index) => sel && !options.approveData.find(it => it.sentenceId == options.sentence[index].id)) ? 'lightpink' : 'lightblue';
                        // const color = options.approveData.find( it => (it.definitionId == item.id && selection[options.sentence.findIndex(sen => sen.id == it.sentenceId)])) ? checkColor :'white';
                        // console.log(color);
                        return (
                            <View key={'sentence'+index} style={{flexDirection: 'column', marginBottom: 10/*, backgroundColor: color*/}}>
                                <Text>{index+1}. {item.definition}</Text>
                                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                    <View>
                                        <Text style={styles.sentence}>
                                            {
                                                options.approveData.filter(it => it.definitionId == item.id).map(item => '#' + (options.sentence.findIndex(sen => sen.id == item.sentenceId) + 1) + ' ')
                                            }
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={{borderWidth: 1, borderRadius: 5, padding: 3}} onPress={() => {setDefinition(item.id)}}>
                                        <Text style={{...styles.sentence}}>
                                            This fits for selected sentences
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={styles.noneOfAbove}>
                    {
                        options && options.definition &&
                        <Text>
                            {options.definition.length+1}. None of above.
                            Please add a new definition:
                        </Text>
                    }
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Enter or record newDefinition" style={{color: '#003458', width: '75%', marginLeft: 5}} onChangeText={txt => {setNewDefinition(txt)}}>{newDefinition}</TextInput>
                        {/*
                            <TouchableOpacity style={{...styles.button, backgroundColor: 'green'}}>
                                <FontAwesomeIcon name="microphone" size={20} color="white"/>
                            </TouchableOpacity>
                        */}
                        <TouchableOpacity style={{...styles.button, backgroundColor: '#013458'}} onPress={() => {addDefinition()}}>
                            <Image style={{width: 20, height: 20}} source={require('../../assets/images/send-icon.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <PrimaryButton 
              buttonText={'Submit'} 
              onPressFunc={onSubmit} 
              marginLeft={20} 
              marginRight={20} 
              marginBottom={20}
            />
            
            <PopupConfirm
                popupTitle="Are you sure to submit?"
                message={"You will not be able to change this decision after submit."}
                isVisible={confirmModal}
                handleYes={()=> {
                    setConfirmModal(false);
                    onConfirmSubmit();
                }}
                handleCancel={()=>{setConfirmModal(false)}}
            />
        </ScrollView>
    )
}
const styles = {
    sentence: {
        textAlign: 'left',
        fontSize: 14,
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
    noneOfAbove: {
        width: '100%',
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
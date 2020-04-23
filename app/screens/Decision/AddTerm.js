import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import Modal from "react-native-modal";
import {Picker} from '@react-native-community/picker';

import { useDispatch, useSelector } from 'react-redux';


import NavHeader from '../../components/NavHeader';
import PrimaryButton from '../../components/PrimaryButton';
import PopupConfirm from '../../components/PopupConfirm';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SearchableDropdown from 'react-native-searchable-dropdown';

import api from '../../api/tasks';
import { set_addTerm_options } from '../../store/actions'
import { set_tasks } from '../../store/actions'

export default Category = (props) => {
    const [task, setTask] = useState(props.navigation.getParam('task',{}));
    const [confirmModal, setConfirmModal] = useState(false);
    const [termType, setTermType] = useState('Character');
    const [group, setGroup] = useState('age');
    const [structureTreeVisible, setStructureTreeVisible] = useState(false);
    const [subPart, setSubPart] = useState('None');
    const [superPart, setSuperPart] = useState('None');
    const [isSuper, setIsSuper] = useState(false);
    const [synonym, setSynonym] = useState('');
    const [synonyms, setSynonyms] = useState([]);

    const auth = useSelector(state => state.main.auth);
    const options = useSelector(state => state.main.data.addTermOptions);
    const quailtyData = useSelector(state => state.main.metaData.quality);
    const structureData = useSelector(state => state.main.metaData.structure);

    const dispatch = useDispatch();

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Platform.OS === "ios"
        ? Dimensions.get("window").height
        : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

    const getTerm = () => {
        api.getAddTermOptions(task.termId, auth.expertId).then(result=>{
            console.log(result);
            dispatch(set_addTerm_options(result.data));
        });
    }
    
    useEffect(() => {
        getTerm();
    }, []);
    
    const onSubmit = () => {
        setConfirmModal(true);
    }

    const onConfirmSubmit = () => {
        api.solveAddTermConflict(task.termId, auth.expertId, termType, termType=='Character' ? group : subPart, termType=='Character' ? '' : subPart, synonyms).then(result=>{
            console.log(result);
            api.getTasks(auth.expertId).then(result=>{
                dispatch(set_tasks(result.data.task_data));
                props.navigation.goBack();
            });
        })
    }
    return (
        <React.Fragment>
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
                    <Text style={{...styles.sentence}}>Add this term to ontology: </Text>
                    <Text style={{...styles.sentence, color: 'red', fontWeight: '800'}}>{task.term}</Text>
                </View>
                <ScrollView contentContainerStyle={{padding: 10}} style={{height: deviceHeight - 260}} nestedScrollEnabled={true}>
                    <Text style={{...styles.sentence, color: '#003458'}}>
                        Example sentences:
                    </Text>
                    {
                        options && options.sentence &&
                        options.sentence.map((item, index) => (
                            <Text key={'sentence'+index} style={{marginLeft: 15}}>{index+1}. {item.sentence}</Text>
                        ))
                    }
                    <Text style={{...styles.sentence, color: '#003458'}}>
                        Term definition:
                    </Text>
                    <Text style={{marginLeft: 15}}>
                        {task.data}
                    </Text>
                    <Text style={{...styles.sentence, color: 'black', fontSize: 17, borderTopWidth: 1, borderTopColor: 'lightgrey', marginTop: 15, paddingTop: 15}}>
                        Use example senctences and the definition to help answer questions below:
                    </Text>
                    <View style={{padding: 10}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{color: '#003458'}}>
                                Is {task.term} a structure or a character?
                            </Text>
                            <View style={{borderWidth: 1}}>
                                <Picker
                                    style={{height: 30, width: 140}}
                                    selectedValue={termType}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setTermType(itemValue);
                                    }}>
                                    <Picker.Item label="Structure" value="Structure" />
                                    <Picker.Item label="Character" value="Character" />
                                </Picker>
                            </View>
                        </View>
                        {
                            termType == 'Character' &&
                            <View>
                                <Text style={{color: '#003458'}}>Select a group that {task.term} belong:</Text>
                                <View style={{borderWidth: 1}}>
                                    <Picker
                                        style={{height: 30}}
                                        selectedValue={group}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setGroup(itemValue);
                                        }}>
                                        {
                                            quailtyData.sort().map(it => <Picker.Item key={it} label={it} value={it} />)
                                        }
                                    </Picker>
                                </View>
                            </View>
                        }
                        {
                            termType == 'Structure' &&
                            <View>
                                <Text style={{color: '#003458'}}>
                                    Select structures that are part of {task.term} in all circumstances.
                                </Text>
                                <View style={{flexDirection:'row', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => {setIsSuper(false); setStructureTreeVisible(true)}} style={{marginLeft: 10, borderWidth: 1, padding: 5}}>
                                        <Text style={{fontSize: 16}}>
                                            {subPart}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize: 16, marginLeft: 10}}>
                                        is part of {task.term.toUpperCase()}
                                    </Text>
                                </View>
                                <Text style={{color: '#003458'}}>
                                    Select structures that are part of {task.term} in all circumstances.
                                </Text>
                                <View style={{flexDirection:'row', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => {setIsSuper(true); setStructureTreeVisible(true)}} style={{marginLeft: 10, borderWidth: 1, padding: 5}}>
                                        <Text style={{fontSize: 16}}>
                                            {superPart}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize: 16, marginLeft: 10}}>
                                        has part {task.term.toUpperCase()}
                                    </Text>
                                </View>
                            </View>
                        }
                        <Text style={{color: '#003458', marginTop: 5}}>List {task.term}'s synonyms:</Text>
                        <View style={{marginHorizontal: 10, borderWidth: 1, minHeight: 50, paddingHorizontal: 1}}>
                            {synonyms.map((sy, index) => (
                                <View key={"synonym" + index} style={{...styles.synonym, backgroundColor: index % 2 ? 'lightcyan' : 'rgb(200,224,240)'}}>
                                    <Text>{sy}</Text>
                                    <TouchableOpacity style={{...styles.button, width: 26, height: 26, backgroundColor: 'red'}} onPress={() => {
                                        setSynonyms(synonyms.filter(it => it!=sy));
                                    }}>
                                        <FontAwesomeIcon name="remove" size={16} color={"white"}/>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder={"Enter a synonym of " + task.term} style={{color: '#003458', width: '75%', marginLeft: 5}} onChangeText={txt => {setSynonym(txt)}}>{synonym}</TextInput>
                            <TouchableOpacity disabled={synonym=='' || synonyms.includes(synonym)} style={{...styles.button, backgroundColor: (synonym=='' || synonyms.includes(synonym))?'grey':'#003458'}} onPress={() => {
                                setSynonyms([...synonyms, synonym]);
                                setSynonym('');
                            }}>
                                <FontAwesomeIcon name="plus" size={25} color={"white"}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                
                <PrimaryButton
                    enable={termType == 'Character' && group != '' || termType == 'Structure' && subPart != 'None' && superPart != 'None'}
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
            <Modal isVisible={structureTreeVisible}
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}>
                <View style={styles.modalContainer} >
                    <View style={styles.modalContent}>
                        <SearchableDropdown
                            onItemSelect={(item) => {
                                setStructureTreeVisible(false);
                                if (isSuper){
                                    setSuperPart(item.name);
                                }
                                else {
                                    setSubPart(item.name);
                                }
                            }}
                            containerStyle={{ padding: 5, width: '100%' }}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#ddd',
                                borderColor: '#bbb',
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                            itemTextStyle={{ color: '#222' }}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={structureData}
                            defaultIndex={0}
                            resetValue={false}
                            textInputProps={
                                {
                                    placeholder: "Enter a subpart of " + task.term,
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                    },
                                }
                            }
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                    </View>
                </View>
            </Modal>
        </React.Fragment>
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
        padding: 5,
        width: 35,
        height: 35,
        alignItems: 'center',
        alignContent: 'center',
    },
    modalContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
    }, 
    modalContent: {
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(239, 239, 239, 1)',
        textAlign: 'center',
        elevation: 10,
        fontSize: 24,
    },
    synonym: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        width: '100%',
        padding: 5,
        marginRight: 5,
    }
}
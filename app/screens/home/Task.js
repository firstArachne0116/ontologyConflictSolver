import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import api from '../../api/tasks';
import { set_tasks } from '../../store/actions'

export default Tasks = (props) => {
    const auth = useSelector(state => state.main.auth);
    const tasks = useSelector(state => state.main.data.tasks);
    
    const [isUnCategory, setIsUnCategory] = useState(true);
    const dispatch = useDispatch();

    const getTasks = () => {
        api.getTasks(auth.expertId).then(result=>{
            console.log(result);
            dispatch(set_tasks(result.data.task_data));
        });
    }

    const onTask = (index) => {
        console.log(tasks[index]);
        if (!tasks[index].isSolved){
            props.navigation.navigate('Decision', {task: tasks[index]});
        }
    }
    getTasks();
    return (
        <ScrollView style={{backgroundColor:'#ffffff'}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{fontSize: 18}}>
                        Find right category
                    </Text>
                    <TouchableOpacity onPress={()=>{setIsUnCategory(!isUnCategory)}}>
                        {
                            isUnCategory?
                            <AntDesignIcon name="caretup" size={25}/>
                            :<AntDesignIcon name="caretdown" size={25}/>
                        }
                    </TouchableOpacity>
                </View>
                {
                    isUnCategory && (
                        <View style={{flexDirection: 'row',flexWrap: 'wrap',}}>
                        {
                            tasks.map((item, index)=>(
                                <TouchableOpacity key={'task_' + index} style={{width: '50%', alignContent: 'center', alignItems: 'center'}} onPress={()=>onTask(index)}>
                                    <Text style={{color: item.isSolved?'green':'red'}}>
                                        {item.term}({item.count})
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                        </View>
                    )
                }
                <View style={styles.header}>
                    <Text style={{fontSize: 18}}>
                        Approve Definitions
                    </Text>
                    <TouchableOpacity onPress={()=>{}}>
                        {
                            false?
                            <AntDesignIcon name="caretup" size={25}/>
                            :<AntDesignIcon name="caretdown" size={25}/>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <Text style={{fontSize: 18}}>
                        Add a term
                    </Text>
                    <TouchableOpacity onPress={()=>{}}>
                        {
                            false?
                            <AntDesignIcon name="caretup" size={25}/>
                            :<AntDesignIcon name="caretdown" size={25}/>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <Text style={{fontSize: 18}}>
                        Miscellaneous
                    </Text>
                    <TouchableOpacity onPress={()=>{}}>
                        {
                            false?
                            <AntDesignIcon name="caretup" size={25}/>
                            :<AntDesignIcon name="caretdown" size={25}/>
                        }
                    </TouchableOpacity>
                </View>
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
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    unsolvedPanel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    text: {
        fontSize: 24,
        color: '#003458',
        fontStyle: 'italic',
    },
}
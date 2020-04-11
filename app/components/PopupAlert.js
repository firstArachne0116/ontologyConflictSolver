import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import {Dimensions} from 'react-native';
import PropTypes from 'prop-types'


export default PopupAlert = (props) => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        },
        text: {
            letterSpacing: 0.65,
            textAlign: "center",
            color: "#003458",
        },
        modalContainer: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
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
        button: {
            width: '100%',
            padding: 10
        }
    };
    var popupTitle = (props.popupTitle ? props.popupTitle : 'Popup Title');
    var message = (props.message ? props.message : 'Here is a message where we can put absolutely anything we want.');
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");
    return (
        <Modal isVisible={props.isVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}>
            <View style={styles.modalContainer} >
                <View style={styles.modalContent}>
                    <Text style={{...styles.text, fontSize:19, lineHeight:24, marginTop:20, paddingHorizontal: 10, fontWeight:'bold'}}>{popupTitle}</Text>
                    <Text style={{...styles.text, fontSize:15, lineHeight:20, marginLeft:10, marginRight:10, marginBottom:20}}>{message}</Text>
                    <View style={{flexDirection:'row', width:'100%'}}>
                        <View style={{width:'100%', alignItems:'center', justifyContent:'center', height: 48, borderColor:'#BCC0C3', borderTopWidth:1,}}>
                            <TouchableOpacity style={styles.button} onPress={() => { if (props.handleOK) props.handleOK(); }}>
                                <Text style={{...styles.text, fontSize:19, lineHeight:24}}>
                                    OK
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    );
}


PopupAlert.propTypes = {
    handleOK : PropTypes.func.isRequired,
}
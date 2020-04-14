import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

import NavHeader from './NavHeader';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

export default class NavTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.active,
      badgeData: {
        give: 0,
        get: 0,
        dms: 1,
      },
    };
    this.styleNavTabs = this.styleNavTabs.bind(this);
  }

  tabChanged (id) {
    this.setState({selected: id});
    if(this.props.changeFunc)
      this.props.changeFunc(id);
  }

  styleNavTabs(s) {
    if (this.state.selected == s) return {...styles.section, ...styles.selected}
    else return styles.section;
  }

  renderBadage(cnt) {
    if (cnt <= 0)
      return;
    var badgeWidth=37;
    return (
      <View style={{...styles.badgeBack, width: badgeWidth}}>
        <Text style={styles.badgeText}>{cnt}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Header headerText={'METADALLION'} bold={true} size={18} marginTop={30} marginBottom={4}/> */}
        <NavHeader
          headerText={'Home'}
          size={22}
          bold={true}
          letterSpacing={1.6}
          navigation={this.props.navigation}
          onBackFunc={()=>{this.props.navigation.goBack()}}
          bSetting = {true}
        />
        <View style={styles.tabContainer}>
          <TouchableOpacity style={this.styleNavTabs(0)} onPress={() => this.tabChanged(0)}>
            <View style={{alignItems: 'center'}}>
              <FontAwesomeIcon name="home" size={23} color={this.state.selected == 0 ? "#003458" :"grey"}/>
              <Text style={{...styles.text, color: this.state.selected == 0 ? "#003458" :"grey"}}>
                {'Home'}
              </Text>
            </View>
            { this.renderBadage(this.state.badgeData.give) }
          </TouchableOpacity>
          <TouchableOpacity style={this.styleNavTabs(1)} onPress={() => this.tabChanged(1)}>
            <View style={{alignItems: 'center'}}>
              <FontAwesomeIcon name="bell" size={20} color={this.state.selected == 1 ? "#003458" :"grey"}/>
              <Text style={{...styles.text, color: this.state.selected == 1 ? "#003458" :"grey"}}>
                {'Tasks'}
              </Text>
            </View>
            { this.renderBadage(this.state.badgeData.get) }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
    paddingTop: 25,
    margin: 0
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 90,
  },
  text: {
    height: 18,
    fontSize: 13,
    fontStyle: 'normal',
    color: '#003458',
  },
  section: {
    width: '50%',
    height: 80,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    marginBottom: 4
  },
  selected: {
    elevation: 2,
    borderWidth: 1,
    borderTopWidth: 0,
    height: 90,
  },
  badgeBack: {
    width: 37,
    height: 24,
    backgroundColor: '#e94c36',
    borderRadius: 50,
    position: 'absolute',
    right: 10,
    top: 10,
    flex: 1,
    justifyContent:'center'
  },
  badgeText: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,   
    textAlign: "center",
    letterSpacing: 0.552,
    
    color: "white",
  }
});
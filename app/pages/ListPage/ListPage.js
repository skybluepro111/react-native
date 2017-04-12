import React from 'react';
import { Container, Content, Header, InputGroup, Input, Icon, Button, Text, View } from 'native-base';
import {Image, ScrollView,TouchableHighlight} from 'react-native';
export default class ListPage extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          data:[{url:require('../../images/img1.png')},{url:require('../../images/img2.jpg')},
                {url:require('../../images/img3.png')},{url:require('../../images/img4.png')},
                {url:require('../../images/img5.png')},{url:require('../../images/img6.jpg')},
                {url:require('../../images/img3.png')},{url:require('../../images/img4.png')},
                {url:require('../../images/img5.png')},{url:require('../../images/img6.jpg')}]
        }
        
    } 

  render = () => {
    return(
    <View style={styles.view}>
          <View style={styles.header}>
            <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
              <Image  source={ require( '../../images/logo.png' )} style={styles.logo}/>
            </View>

            <Icon name='person'/>
          </View>
          <View style={{padding:5, width:'100%'}}>
            <View style={{justifyContent:'center', alignSelf:'center', alignItems: 'center', width:'100%', padding:5, borderWidth:1, borderRadius:5, borderColor:'#d3d3d3',margin:5}}>
              <Icon name='search'/>
            </View>
          </View>
          <ScrollView style={{width:'100%'}}>
            {
              this.state.data.map( (item,index) => {
                if( index % 2 == 0){
                  return(<View key={index} style={styles.list}>
                    <TouchableHighlight style={styles.image_wrapper} onPress={(e)=>this.props.navigator.push({title:'videorecord'})}>
                      <Image source={  this.state.data[index].url} style={styles.img} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.image_wrapper} onPress={(e)=>this.props.navigator.push({title:'videorecord'})}>
                      <Image source={  this.state.data[index+1].url} style={styles.img}/>
                    </TouchableHighlight>
                  </View>)
                }
              })
            }
          </ScrollView>
     </View>
    )
  }
}

const styles={
    view:{
        flex: 1, 
        alignSelf: 'center', 
        alignItems: 'center',
        width:'100%',
        height:'100%', 
        backgroundColor:'#ffffff',
         padding:10
    },
    header:{
      padding: 5,
      flexDirection: 'row',
      justifyContent:'center',
      alignSelf:'center', 
      alignItems:'center',
      borderWidth:1, 
      borderColor:"#d3d3d3", 
    },
    list:{
      flexDirection:'row',
      justifyContent:'space-around'
    },
    image_wrapper:{
      flex:1,alignItems:'stretch',
      height:100, 
      padding:5
    },
    img:{
      width:'100%', 
      height:'100%', 
      resizeMode:'cover',
      borderRadius:10},
    
    btn:{
        borderRadius:9,
        marginTop:30
    },
    logo:{
        width: 100,
        height:30,
        resizeMode:'cover',
    },

    label:{
        textAlign:"center"
    },
    locationDropdown:{
        textAlign:"center",
        fontSize:17       
    }

    
}


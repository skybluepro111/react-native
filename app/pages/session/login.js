import React from 'react';
import { Container, Content, Text, Button , View  } from 'native-base';
import {Image,TouchableHighlight,Alert} from 'react-native';
import {Grid} from 'react-native-easy-grid'
import * as simpleAuthProviders from 'react-native-simple-auth';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secrets : {
                google: {
                    appId: '1076312574117-0ccvfhq5522va4jmu50gcheknncn0icv.apps.googleusercontent.com',
                    callback: 'https://askmeproject-f1bd2.firebaseapp.com/__/auth/handler',
                },
                facebook: {
                    appId: '1234567890',
                    callback: 'https://askmeproject-f1bd2.firebaseapp.com/__/auth/handler',
                },
                twitter: {
                    appId: '1234567890abc',
                    appSecret: '1234567890abc',
                    callback: 'https://askmeproject-f1bd2.firebaseapp.com/__/auth/handler',
                },
                tumblr: {
                    appId: '1234567890abc',
                    appSecret: '1234567890abc',
                    callback: 'reactnativesimpleauth://authorize',
                },
            }
        }
    } 

    onBtnPressed = (provider, opts) => {
        const _this = this;
        this.setState({
            loading: true
        });

        simpleAuthProviders[provider](opts)
        .then((info) => {
            _this.setState({
                loading: false
            });
            _this.props.navigator.push({
                title: provider,
                provider,
                info,
                index: 1
                });
        })
        .catch((error) => {
            
            Alert.alert(
            'Authorize Error',
            error.message
            );
        });
    }

    render() {    
        return (
            
            <View style={styles.view} >
                    <Image  source={ require( '../../images/logo.png' )} style={styles.logo}/>
                    <Button block style={styles.btn} onPress={(e)=>this.onBtnPressed( 'facebook', this.state.secrets['facebook'])} ><Text>Sign in with Facebook</Text></Button>
                    <Button info block style={styles.btn} onPress={(e)=>this.onBtnPressed( 'twitter', this.state.secrets['twitter'])} ><Text>Sign in with Twitter</Text></Button>
                    <Button dark block style={styles.btn} onPress={(e)=>this.onBtnPressed( 'instagram', this.state.secrets['instagram'])} ><Text>Sign in with Instagram</Text></Button>
                    <Button danger block style={styles.btn} onPress={(e)=>this.onBtnPressed( 'google', this.state.secrets['google'])} ><Text>Sign in with Google+</Text></Button>
                    <Button dark bordered block style={styles.btn} onPress={(e)=>this.props.navigator.push({title:'signup'})}>
                        <Text>Sign up with </Text>
                        <Text style={{fontWeight:'bold'}}>Email</Text>
                    </Button>
                    <Button transparent dark block>
                        <Text>Already have an account? </Text>
                        <Text style={{fontWeight:'bold'}} onPress={(e)=>this.props.navigator.push({title:'signin'})}>Sign in</Text>
                    </Button>
            </View>
            
        );
    }
}

const styles={
    view:{
        flex: 1, 
        justifyContent: 'center', 
        alignSelf: 'center', 
        alignItems:'center',
        width:'100%',
        height:'100%', 
        backgroundColor:'#ffffff',
         padding:20

    },
    btn:{
        borderRadius:9,
        margin:10
    },
    logo:{
        marginBottom:30
    },

    
}

import React from 'react';
import { Container, Content, Text, Button , View ,Form, Item, Input,Label } from 'native-base';
import {Image} from 'react-native';
import firebaseApp from '../../../app/firebaseConfig.js';

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: ''
      }
    } 

    static navigationOptions = {
        header: () => ({
            visible: false,
        })
    };

    login = () =>{
    this.setState({
      loading: true
    });
    this.props.navigator.push({title:'listpage'});
    // Log in and display an alert to tell the user what happened.
    // firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
    // ).then((userData) =>
    //   {
    //     this.setState({
    //             loading: false
    //           });
    //     this.props.navigator.push({title:'listpage'});
    //   }
    // ).catch((error) =>
    //     {
    //           this.setState({
    //             loading: false
    //           });
    //     alert('Login Failed. Please try again');
    // });
  }


    render() {    
        return (
            <View style={styles.view} >
                <Image  source={ require( '../../images/logo.png' )} style={styles.logo}/>
                <Container>
                    <Content>
                        <Form>
                            <Item floatingLabel last>
                                <Label style={styles.label}>Email</Label>
                                <Input onChangeText={(text) => this.setState({email: text})}/>
                            </Item >
                            <Item floatingLabel last>
                                <Label style={styles.label}>Password</Label>
                                <Input secureTextEntry onChangeText={(text) => this.setState({password: text})}></Input>
                            </Item>
                        </Form>
                        <Button dark bordered block style={styles.btn} onPress={(e)=>this.login()}>
                            <Text>Sign in</Text>
                        </Button>
                        <Button style={styles.btn} transparent dark block>
                        <Text onPress={(e)=>alert("Forgot")}>Forgot Password?</Text>
                    </Button>
                    </Content>
                </Container>
            </View>
        );
    }
}

const styles={
    view:{
        flex: 1, 
        justifyContent: 'center', 
        alignSelf: 'center', 
        width:'100%',
        height:'100%', 
        backgroundColor:'#ffffff',
         padding:20

    },
    btn:{
        borderRadius:9,
        marginTop:30
    },
    logo:{
        margin:30
    },
    label:{
        textAlign:"center"
    },
    locationDropdown:{
        textAlign:"center",
        fontSize:17       
    }

    
}

import React from 'react';
import { Container, Content, Text, Button , View ,Form, Item, Input,Label,Toast } from 'native-base';
import {Image,AppRegistry} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import firebaseApp from '../../firebaseConfig.js';
import Login from './login';
export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationList:["Us","Uk","Germany"],
            selectedLocation: "Location",
          // used to display a progress indicator if waiting for a network response.
            loading: false,
         // entered credentials
            email: '',
            password: ''
        }

    }

   signup = () => {
    this.setState({
      // When waiting for the firebase server show the loading indicator.
      loading: true
    });
    // Make a call to firebase to create a new user.
    firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password).then(() => {
        // then and catch are methods that we call on the Promise returned from
        // createUserWithEmailAndPassword
        // alert('Your account was created!');
        Toast.show({
              text: 'Your account was created!',
              position: 'bottom',
              duration: 1500
            })
        this.setState({
          // Clear out the fields when the user logs in and hide the progress indicator.
          email: '',
          password: '',
          loading: false
        });
        this.props.navigator.push({title:'login'});
     
      }).catch((error) => {
      // Leave the fields filled when an error occurs and hide the progress indicator.
      this.setState({
        loading: false
      });
       alert("Account creation failed: " + error.message );
    });
  }
 

    static navigationOptions = {
        header: () => ({
            visible: false,
        })
    };

    onLocationChange = (index,value) => {
        this.setState({
            selectedLocation : value
        });

    }

    render() {    

        return (
            <View style={styles.view} >
                <Image  source={ require( '../../images/logo.png' )} style={styles.logo}/>
                <Container>
                    <Content>
                        <Form>
                            <Item floatingLabel last>
                                <Label style={styles.label}>Name</Label>
                                <Input  />
                            </Item>
                            <Item floatingLabel last>
                                <Label style={styles.label}>Email</Label>
                                <Input value={this.state.email} onChangeText={(e)=>this.setState({email:e})} />
                            </Item >
                            <Item floatingLabel last>
                                <Label style={styles.label}>Location</Label>
                                <Input />
                            </Item >
                            {/*<Item last style={{paddingBottom: 10,marginTop: 35, alignSelf:'center'}} >
                                <ModalDropdown style={{width:'90%', alignItems:'center'}}
                                    textStyle={styles.locationDropdown}
                                    onSelect={this.onLocationChange} 
                                    options={this.state.locationList}
                                    defaultValue={this.state.selectedLocation}
                                />    
                                <Input/>
                            </Item>                 */}
                            <Item floatingLabel last>
                                <Label style={styles.label}>Password</Label>
                                <Input secureTextEntry value={this.state.password} onChangeText={(e)=>this.setState({password:e})}></Input>
                            </Item>
                        </Form>
                        <Button dark bordered block style={styles.btn} onPress={(e)=>this.signup()}>
                            <Text>Sign up</Text>
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
AppRegistry.registerComponent('Signup', () => Signup);

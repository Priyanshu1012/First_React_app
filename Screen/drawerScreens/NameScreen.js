import React from 'react';  
import { StyleSheet, View, Text, Button,FlatList,Image,ScrollView} from 'react-native';  
import Icon from 'react-native-vector-icons/MaterialIcons';
import call from 'react-native-phone-call';
  
export default class NameScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            dataSource: []
        }
        this.call = this.call.bind(this);
    } 
    call (txt) {
        //handler to make a call
        console.log(txt);
        const args = {
          number: txt,
          prompt: false,
        };
        call(args).catch(console.error);
      }; 
    componentDidMount(){
        const { navigation } = this.props;
        const name = navigation.getParam('userName', 'NO-User');
        fetch('http://192.168.43.34:8000/seva/profile_name/', {
            method: 'POST',
            body: name,
            headers: {
              //Header Defination
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          })
            .then(response => response.json())
            .then(responseJson => {
              console.log(responseJson);
              this.setState({
                  isLoading: false,
                  dataSource: responseJson
              })
              // If server response message same as Data Matched
            })
            .catch(error => {
              //Hide Loader
              setLoading(false);
              console.error(error);
            });

    }
    static navigationOptions = {  
        title: 'Name',  
    };  
    _renderItem = ({item,index}) => {
        return(
            <View style={styles.box}>
                <Icon style={styles.icon} name="phone" size={30} color="green" onPress={() => this.call(item.contactno)}/>
                <Text style={styles.textStyle}>Name : {item.name}</Text>
                <Text style={styles.textStyle}>Occupation : {item.occupation}</Text>
                <Text style={styles.textStyle}>Experience In Years : {item.Experience}</Text>
                <Text style={styles.textStyle}>Contact Number : {item.contactno}</Text>
                <Text style={styles.textStyle}>Description : {item.description}</Text>
            </View>
        )
    }
    render() {  
        {/*Using the navigation prop we can get the 
              value passed from the previous screen*/}  
        const { navigation } = this.props;  
        const name = navigation.getParam('userName', 'NO-User'); 
        const uri = 'https://as2.ftcdn.net/jpg/01/08/26/33/500_F_108263380_74hOE3V5HHVDDJjo6vEAoiAiEEqwT3iR.jpg';  
        let {dataSource, isLoading} = this.state 
        return (  
            <View style={styles.container}>
                <FlatList
                  data={dataSource}
                  renderItem={this._renderItem}
                  keyExtractor={(item,index) => index.toString()}
                  /> 
            </View>  
        );  
    }  
}  
const styles = StyleSheet.create({  
    textStyle: {  
        fontSize: 16,   
        color: '#000000',
        fontWeight: "bold",  
    },  
    box: {
        backgroundColor: '#E5CCFF',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        margin: 20,
    },
    icon: {
        marginLeft: 260,
    },
});  
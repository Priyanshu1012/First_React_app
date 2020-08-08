import React from 'react';  
//import react in our code.  
import { StyleSheet, View, Button, TextInput,TouchableOpacity,Text,ScrollView,Image} from 'react-native';
import { BlurView } from 'expo-blur';  
  
export default class HomeScreen extends React.Component {  
  
    constructor(props) {  
        //constructor to set default state  
        super(props);  
    }  
    static navigationOptions = {  
        title: 'Home',  
    };  
  
    render() {
      const uri = 'https://as2.ftcdn.net/jpg/01/08/26/33/500_F_108263380_74hOE3V5HHVDDJjo6vEAoiAiEEqwT3iR.jpg';  
        const { navigate } = this.props.navigation;  
        return (  
            //View to hold our multiple components  
            <View style={styles.container}>
              <Image style={styles.blurredImage} source={{ uri }} />

<BlurView intensity={230} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}>
              <ScrollView style={styles.button}>
              <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() =>  
                this.props.navigation.navigate('Profile', {  
                    userName: 'Furniture',  
                })  
            }  >
              <Text style={styles.buttonTextStyle}>Furniture</Text>
            </TouchableOpacity>  
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() =>  
                this.props.navigation.navigate('Profile', {  
                    userName: 'Painter',  
                })  
            }  >
              <Text style={styles.buttonTextStyle}>Painter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() =>  
                this.props.navigation.navigate('Profile', {  
                    userName: 'Plumber',  
                })  
            }  >
              <Text style={styles.buttonTextStyle}>Plumber</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() =>  
                this.props.navigation.navigate('Profile', {  
                    userName: 'Interior Designer',  
                })  
            }  >
              <Text style={styles.buttonTextStyle}>Interior Designer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() =>  
                this.props.navigation.navigate('Profile', {  
                    userName: 'Electrician',  
                })  
            }  >
              <Text style={styles.buttonTextStyle}>Electrician</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() =>  
                this.props.navigation.navigate('Profile', {  
                    userName: 'Cleaner',  
                })  
            }  >
              <Text style={styles.buttonTextStyle}>Cleaner</Text>
            </TouchableOpacity>
            </ScrollView>
            </BlurView>
        </View>  
    );  
    }  
}  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: '#fff',  
        alignItems: 'center',  
        padding: 1,  
    },    
    buttonStyle:{  
      backgroundColor: '#CC99FF',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#CC99FF',
      height: 60,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 10,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 50,
      width: "95%",
    },
    buttonTextStyle: {
      color: '#000000',
      paddingVertical: 10,
      fontSize: 25,
    }, 
    button: {
      width: "100%",
    } ,
    blurredImage: {
      flex: 1,
      width: '100%',
      height: 192,
    },
});
import React, { useState } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Picker,
} from 'react-native';
import Loader from '../Components/loader';
import { BlurView } from 'expo-blur';  

const ProfileScreen = props => {
  let [userName, setUserName] = useState('');
  let [userExperience, setUserExperience] = useState('');
  let [userOccupation, setUserOccupation] = useState('');
  let [userContactno ,setUserContactno ] = useState('');
  let [userDescription, setUserDescription] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const uri = 'https://as2.ftcdn.net/jpg/01/08/26/33/500_F_108263380_74hOE3V5HHVDDJjo6vEAoiAiEEqwT3iR.jpg'; 
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userExperience) {
      alert('Please fill Email');
      return;
    }
    if (!userContactno) {
      alert('Please fill Age');
      return;
    }
    if (!userOccupation) {
      alert('Please fill Address');
      return;
    }
    if (!userDescription) {
      alert('Please fill Address');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      user_name: userName,
      user_experience: userExperience,
      user_occupation: userOccupation,
      user_contactno: userContactno,
      user_description: userDescription,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://192.168.43.34:8000/seva/Profileapi/', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 1) {
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext('Registration Unsuccessful');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#E5CCFF',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../Image/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#E5CCFF' }}>
      <Loader loading={loading} />
      <Image style={styles.blurredImage} source={{ uri }} />

        <BlurView intensity={230} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../Image/old_logo.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              placeholder="Enter Name"
              placeholderTextColor="#000000"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._experienceinput && this._experienceinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <Picker style={styles.pickerStyle}  
                    selectedValue={userOccupation}  
                    onValueChange={UserOccupation =>  setUserOccupation(UserOccupation)}  
                    >
                    <Picker.Item label="Select Occupation" value="Null" />   
                    <Picker.Item label="Furniture" value="Furniture" />  
                    <Picker.Item label="Painter" value="Painter" />  
                    <Picker.Item label="Plumber" value="Plumber" />
                    <Picker.Item label="Interior Designer" value="Interior Designer" />  
                    <Picker.Item label="Electrician" value="Electrician" />  
                    <Picker.Item label="Cleaner" value="Cleaner" />    
          </Picker>
          </View>  
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserExperience => setUserExperience(UserExperience)}
              placeholder="Enter Experience"
              placeholderTextColor="#000000"
              keyboardType="numeric"
              ref={ref => {
                this._experienceinput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._contactnoinput && this._contactnoinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserContactno=>setUserContactno (UserContactno)}
              placeholder="Enter Contact Number"
              placeholderTextColor="#000000"
              keyboardType="numeric"
              ref={ref => {
                this._contactnoinput = ref;
              }}
              onSubmitEditing={() =>
                this._descriptioninput && this._descriptioninput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserDescription => setUserDescription(UserDescription)}
              placeholder="Enter Description"
              placeholderTextColor="#000000"
              autoCapitalize="sentences"
              ref={ref => {
                this._descriptioninput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
      </BlurView>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#CC99FF',
    borderWidth: 0,
    color: '#000000',
    borderColor: '#CC99FF',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#000000',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  pickerStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
  },
  blurredImage: {
    flex: 1,
    width: '100%',
    height: 192,
  },
});
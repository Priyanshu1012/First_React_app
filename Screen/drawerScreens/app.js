import React from 'react';  
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; 
import HomeScreen from './HomeScreen';  
import NameScreen from './NameScreen';  
  
const AppNavigator = createStackNavigator(  
    {  
        Home: HomeScreen,  
        Profile: NameScreen  
    },  
    {  
        initialRouteName: "Home"  
    }  
);  
export default createAppContainer(AppNavigator); 
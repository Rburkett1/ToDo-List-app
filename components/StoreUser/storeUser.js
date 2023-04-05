import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const users = [
  {
    username: "test",
    password: "Test1@"
  },
  {
    username: 'test2',
    password: 'test2'
  }
];
  
  export const storeUser = async () => {
    
    try {
      await AsyncStorage.setItem("loginData", JSON.stringify(users));
    } catch (error) {
      
    }
  };
  
  export const getUser = async (user) => {
    try {
      const savedUser = await AsyncStorage.getItem("loginData");
      const currentUsers = JSON.parse(savedUser);
      const userFound = currentUsers.find((registeredUser) => 
      registeredUser.username === user.username && 
      registeredUser.password === user.password)
      
      
      return userFound
     
    } catch (error) {
     return undefined 
    }
  };

  

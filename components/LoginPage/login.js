import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button,  } from 'react-native';
import { storeUser, getUser } from '../StoreUser/storeUser';


export default function Login( {navigation}) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
useEffect(() => {
  storeUser()
}, [])

  const handleLogin = async () =>{
    const user = {
      username,
      password
    }
    const userFound = await getUser(user)
    

   if(userFound){
     navigation.navigate('Todo');
   }else if (!username  && !password ) {
     alert("please enter something")
   }
   else {
     alert("incorrect username and password combination");
     
   }
  }
  

  return (
    <View style={styles.container}>
     <View style={styles.inputfield}>
      <TextInput 
        style={styles.input} 
        placeholder='username' 
        autoCapitalize='none'
        testID='login-username'
        onChangeText={setUsername}
         />       
      <TextInput 
        style={styles.input} 
        placeholder='password' 
        autoCapitalize='none'
        testID='login-password' 
        onChangeText={setPassword} 
        />         
      </View> 
      <View style={styles.button}>
      <Button
        title="Login"
        onPress={handleLogin}       
        color={'white'}
        testID='login-button'
      /> 
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
        color={'white'}
        testID='login-register'
      /> 
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'lightgray',
    //borderColor: 'black',
    //borderWidth: 1,
    borderRadius: 25,
    width: 350,
    marginTop: 10,
    marginBottom: 10,
    
  },
  inputfield: {
    alignItems: 'center',
     marginTop: 10,
     marginBottom: 10
     
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

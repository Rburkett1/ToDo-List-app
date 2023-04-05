import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Input } from '@rneui/themed';
import { storeUser } from "../StoreUser/storeUser";




//regex for diffrient input fields
const fnameRE = /^[a-zA-Z]+$/;
const lnameRE = /^[a-zA-Z]+$/;
const numRE = /^(\(\d{3}\)$\d{7})|^(\d\(\d{3}\)\d{7})$|^\d{10,11}$/;
const mailRE = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const passRE = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/;
const zipRE = /^[0-9]{5}$/;


// utility function to validate input fields 
const validateInput = (name, value) => {
  // switch statement to check the name of the input field and return the error message in case of an error.
  // if there is no error, return an empty string
  switch (name) {
    case "firstname":
      return fnameRE.test(value) ? "" : "Errors Invalid First Name \n";
    case "lastname":
      return lnameRE.test(value) ? "" : "Error: Invalid Last Name \n";
    case "phonenum":
      return numRE.test(value) ? "" : "Error: Phone Number must be in this format (xxx)xxx-xxxx \n";
    case "mail":
      return mailRE.test(value) ? "" : "Error: Email must have @ symbol \n";
    case "password":
      return passRE.test(value) ? "" : "Error: password invalid \n";   
    case "zipcode":
      return zipRE.test(value) ? "" : "Error: zipcode invlid \n";
    default:
      return "";
  }
};

export default function Register({ navigation }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [phonenum, setPhoneNum] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [errorlist, setErrorList] = useState("");

  const validateAll = useCallback(() => {
    let errors = [];
    // validate each input field and push the error message to the errors array in case of an error
    errors.push(validateInput("firstname", firstname));
    errors.push(validateInput("lastname", lastname));
    errors.push(validateInput("phonenum", phonenum));
    errors.push(validateInput("mail", mail));
   

   if (password === confirmpassword) {
    errors.push(validateInput("password", password));
    errors.push(validateInput("confirmpassword", confirmpassword));
   }
   else {
    errors.push("Error: passwords do not match\n");
   }
   errors.push(validateInput("zipcode", zipcode));
   
    // filter the errors array to remove the empty strings (the ones that don't have errors)
    errors = errors.filter((error) => error !== "");

    // if the filtered errors array is not empty, it means that there are errors and we want to view them in an alert
    if (errors.length) {
      // return all the errors
     // alert(errors.join(""));
     setErrorList(errors.join(""));
     
      return;
    }
    else{
      setErrorList("");
    }
    
    alert("Registration Successful");
 

    navigation.navigate("Todo");
  }, [firstname, lastname, phonenum, mail, password, zipcode]);

  return (
    
      <View style={styles.container}>
        <View>
        <Text style={styles.error}>{errorlist}</Text>
        </View>
        <View style={styles.inputfield}>
          <TextInput
            style={styles.input}
            placeholder="firstname"
            testID="firstname"
            onChangeText={setFirstName}
            returnKeyType= "done"
          />
          <TextInput
            style={styles.input}
            placeholder="lastname"
            testID="lastname"
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            testID="username"
            onChangeText={setUserName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            testID="phonenumber"
            onChangeText={setPhoneNum}
            //keyboardType= "numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            testID="password"
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            testID="confirmpassword"
            onChangeText={setConfirmPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            testID="email"
            onChangeText={setMail}
            keyboardType= "email-address"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Zip Code" 
            testID="zip"
            onChangeText={setZipCode} 
          />
         <View style = {styles.button}>
         <Button 
          title="Register" 
          color={"white"} 
          onPress={validateAll} 
          />
         </View>
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkgray",
    alignItems: "center",
    justifyContent: "center",
  },
  error:{
    color: 'darkred',
    fontSize: 14
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "lightgray",
    //borderColor: 'black',
    //borderWidth: 1,
    borderRadius: 25,
    width: 350,
    marginTop: 10,
    marginBottom: 10,
  },
  inputfield: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'teal',
    width: 300,
    marginTop: 10,
    borderRadius: 15,
  }
});
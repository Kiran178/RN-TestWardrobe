import {Text, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import CustomInput from '../../components/CustomInput';
import ButtonOutline from '../../components/ButtonOutline';
import GoogleLoginBtn from '../../components/GoogleLoginBtn';
import {AuthStyles} from './authStyle';
import {useMutation} from '@apollo/client';
import {MyContext} from '../../context/AuthContext';
import {CREATE_USER} from '../../graphql/authSchema';
import * as Keychain from 'react-native-keychain';
import {getUniqueId} from 'react-native-device-info';
import {useToast} from 'react-native-toast-notifications';

const LogoImage = require('../../assets/images/logo.png');

const Signup = ({navigation}) => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(true);
  const [signupDetails, setSignupDetails] = useState({
    username: '',
    email: '',
    password: '',
    deviceId: '',
  });

  const handleShowPassword = () => setShowPassword(!showPassword);
  const {setIsLoggedIn} = useContext(MyContext);

  useEffect(() => {
    getUniqueId().then(uniqueId => {
      setSignupDetails(prev => ({...prev, deviceId: uniqueId}));
    });
  }, []);

  const [createUser, {loading}] = useMutation(CREATE_USER);
  const handleCreateUser = async () => {
    let username = signupDetails.username;
    let password = signupDetails.password;

    try {
      const {data} = await createUser({
        variables: {
          userInput: {
            username: signupDetails.username,
            password: signupDetails.password,
            email: signupDetails.email,
            deviceId: signupDetails.deviceId,
          },
        },
      });
      // Handle success, access the returned data
      setIsLoggedIn(data.createUser.token);
      await Keychain.setGenericPassword(username, password);
    } catch (error) {
      // Handle error
      setSignupDetails({
        email: '',
        password: '',
        username: '',
      });
      toast.show(error.message, {
        type: 'danger',
        placement: 'bottom',
        duration: 2000,
        offset: 50,
        animationType: 'slide-in',
      });
    }
  };

  console.log(signupDetails, loading, 'loading');

  return (
    <View style={AuthStyles.container}>
      <SafeAreaView>
        <Image source={LogoImage} style={AuthStyles.logoImage} />
        <CustomInput
          placeholder="User Name"
          value={signupDetails.username}
          onChangeText={val =>
            setSignupDetails(prevState => ({...prevState, username: val}))
          }
          style={AuthStyles.inputHelper}
        />
        <CustomInput
          placeholder="Email"
          value={signupDetails.email}
          keyboardType="email-address"
          onChangeText={val =>
            setSignupDetails(prevState => ({...prevState, email: val}))
          }
          style={AuthStyles.inputHelper}
        />
        <CustomInput
          placeholder="Password"
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
          value={signupDetails.password}
          secureTextEntry
          onChangeText={val =>
            setSignupDetails(prevState => ({...prevState, password: val}))
          }
        />
        <View>
          <View style={AuthStyles.textWrapper}>
            <Text style={AuthStyles.text}>Already a Member?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={AuthStyles.textLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ButtonOutline
            title="Sign Up"
            style={AuthStyles.buttonHelper}
            onPress={handleCreateUser}
            disabled={
              signupDetails.email === '' ||
              signupDetails.password === '' ||
              signupDetails.username === ''
                ? true
                : false
            }
          />
          <Text style={AuthStyles.orText}>OR</Text>
          <GoogleLoginBtn />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Signup;

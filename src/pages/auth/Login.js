import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';

import {AuthStyles} from './authStyle';
import CustomInput from '../../components/CustomInput';
import ButtonOutline from '../../components/ButtonOutline';
import GoogleLoginBtn from '../../components/GoogleLoginBtn';
import {MyContext} from '../../context/AuthContext';
import {useMutation} from '@apollo/client';
import {LOGIN_USER} from '../../graphql/authSchema';
import * as Keychain from 'react-native-keychain';
import {getUniqueId} from 'react-native-device-info';
import {useToast} from 'react-native-toast-notifications';
import useKeyboardActive from '../../hooks/useKeyboardActive';
import {IOS} from '../../utils/Platform';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import Loader from '../../components/Loader';

const LogoImage = require('../../assets/images/logo.png');

const Login = ({navigation}) => {
  const toast = useToast();
  const keyboard = useKeyboardActive();
  const rnBiometrics = new ReactNativeBiometrics();
  const [showPassword, setShowPassword] = useState(true);
  const [userCredentials, setUserCredentials] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    deviceId: '',
  });

  const {setIsLoggedIn} = useContext(MyContext);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [loginUser, {loading}] = useMutation(LOGIN_USER);

  const handleUserCredentials = async () => {
    const credentials = await Keychain.getGenericPassword();
    setUserCredentials(credentials);
  };

  useEffect(() => {
    if (loginDetails.deviceId !== '' && userCredentials) {
      handleBiometrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginDetails.deviceId]);

  useEffect(() => {
    handleUserCredentials();
    getUniqueId().then(uniqueId => {
      setLoginDetails({...loginDetails, deviceId: uniqueId});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //For Biometrics
  const handleBiometrics = async () => {
    try {
      const {biometryType} = await rnBiometrics.isSensorAvailable();
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate using biometrics',
      });

      if (success) {
        // Biometric authentication succeeded
        handleLoginUser(userCredentials.username, userCredentials.password);
        return;
      }

      if (
        biometryType === BiometryTypes.FaceID ||
        biometryType === BiometryTypes.TouchID
      ) {
        handleLoginUser(userCredentials.username, userCredentials.password);
        return;
      }
      // Biometrics is not available or authentication failed, proceed with regular login
      console.log(
        'Biometrics not available or authentication failed, proceed with regular login',
      );
      // Proceed with login logic
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleLoginUser = async (user, pwd) => {
    let username = loginDetails.email || user;
    let password = loginDetails.password || pwd;

    await Keychain.setGenericPassword(username, password);
    try {
      const {data} = await loginUser({
        variables: {
          userInput: {
            email: username,
            password: password,
            deviceId: loginDetails.deviceId,
          },
        },
      });
      // Handle success, access the returned data
      setIsLoggedIn(data.loginUser.token);
    } catch (err) {
      // Handle error
      setLoginDetails({
        email: '',
        password: '',
      });
      toast.show(err.message, {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 50,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading ? <Loader /> : null}
      <View
        style={[
          AuthStyles.container,
          IOS ? {paddingBottom: keyboard.keyboardHeight} : null,
        ]}>
        <SafeAreaView>
          <Image source={LogoImage} style={AuthStyles.logoImage} />
          <CustomInput
            placeholder="User Name"
            keyboardType="email-address"
            value={loginDetails.email}
            onChangeText={val =>
              setLoginDetails(prevState => ({...prevState, email: val}))
            }
            style={AuthStyles.inputHelper}
          />
          <CustomInput
            placeholder="Password"
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            value={loginDetails.password}
            secureTextEntry
            onChangeText={val =>
              setLoginDetails(prevState => ({...prevState, password: val}))
            }
          />
          <View>
            <View style={AuthStyles.textWrapper}>
              <Text style={AuthStyles.text}>Not A Member?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={AuthStyles.textLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={AuthStyles.linkWrapper}>
              <Text style={AuthStyles.textLink}>Forgot your Password?</Text>
            </TouchableOpacity>
          </View>
          <View>
            <ButtonOutline
              disabled={
                loginDetails.email === '' || loginDetails.password === ''
                  ? true
                  : false
              }
              title="Log in"
              style={AuthStyles.buttonHelper}
              onPress={handleLoginUser}
            />
            <Text style={AuthStyles.orText}>OR</Text>
            <GoogleLoginBtn />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default Login;

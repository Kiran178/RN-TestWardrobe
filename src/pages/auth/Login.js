import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {windowWidth} from '../../utils/Dimensions';

import CustomInput from '../../components/CustomInput';
import Colors from '../../assets/colors/Colors';
import ButtonOutline from '../../components/ButtonOutline';
import GoogleLoginBtn from '../../components/GoogleLoginBtn';
import {MyContext} from '../../context/AuthContext';
import {useMutation} from '@apollo/client';
import {LOGIN_USER} from '../../graphql/authSchema';
import * as Keychain from 'react-native-keychain';
import {getUniqueId} from 'react-native-device-info';
import {useToast} from 'react-native-toast-notifications';

const LogoImage = require('../../assets/images/logo.png');

const Login = ({navigation}) => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    deviceId: '',
  });

  const {setIsLoggedIn} = useContext(MyContext);
  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    getCredentials();
  }, []);

  const getCredentials = async () => {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
        credentials.password,
      );
    } else {
      console.log('No credentials stored');
    }
    // await Keychain.resetGenericPassword();
  };

  const [loginUser, {loading}] = useMutation(LOGIN_USER);
  const handleLoginUser = async () => {
    let username = loginDetails.email;
    let password = loginDetails.password;
    try {
      const {data} = await loginUser({
        variables: {
          userInput: {
            email: loginDetails.email,
            password: loginDetails.password,
            deviceId: loginDetails.deviceId,
          },
        },
      });
      // Handle success, access the returned data
      await Keychain.setGenericPassword(username, password);
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

  useEffect(() => {
    getUniqueId().then(uniqueId => {
      setLoginDetails(prev => ({...prev, deviceId: uniqueId}));
    });
  }, []);

  console.log(loading, 'loading');
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image source={LogoImage} style={styles.logoImage} />
        <CustomInput
          placeholder="User Name"
          value={loginDetails.email}
          onChangeText={val =>
            setLoginDetails(prevState => ({...prevState, email: val}))
          }
          style={styles.inputHelper}
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
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Not A Member?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.textLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.linkWrapper}>
            <Text style={styles.textLink}>Forgot your Password?</Text>
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
            style={styles.buttonHelper}
            onPress={handleLoginUser}
          />
          <Text style={styles.orText}>OR</Text>
          <GoogleLoginBtn />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50,
    justifyContent: 'center',
  },
  logoImage: {
    width: windowWidth - 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  inputHelper: {
    marginBottom: 30,
  },
  buttonHelper: {
    marginVertical: 30,
  },
  orText: {
    textAlign: 'center',
    color: Colors.white,
  },
  textWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
  textLink: {
    color: Colors.white,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  linkWrapper: {
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    color: Colors.white,
    paddingRight: 10,
  },
});

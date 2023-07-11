import React, {useState, useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {BASE_URL} from '@env';

import TabNavigation from './src/navigation/TabNavigation';
import AuthStack from './src/navigation/AuthStack';
import AuthContext from './src/context/AuthContext';
import {ToastProvider} from 'react-native-toast-notifications';
import SplashScreen from 'react-native-splash-screen';

const navTheme = DefaultTheme;
navTheme.colors.background = 'white'; //Global App backgroundColor

// Initialize Apollo Client
const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthContext setIsLoggedIn={data => setIsLoggedIn(data)}>
        <ToastProvider>
          <NavigationContainer theme={navTheme}>
            {isLoggedIn ? (
              <AuthStack setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <TabNavigation />
            )}
          </NavigationContainer>
        </ToastProvider>
      </AuthContext>
    </ApolloProvider>
  );
};

export default App;

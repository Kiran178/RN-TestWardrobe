import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardActive = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const keyboardDidShow = event => {
    setKeyboardOpen(true);
    setKeyboardHeight(event.endCoordinates.height);
  };

  const keyboardDidHide = () => {
    setKeyboardOpen(false);
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return {keyboardOpen, keyboardHeight};
};

export default useKeyboardActive;

import React, {createContext} from 'react';

export const MyContext = createContext({
  setIsLoggedIn: () => {
    console.log(first);
  },
});

export default function AuthContext(props) {
  const {setIsLoggedIn} = props;
  const context = {
    setIsLoggedIn: setIsLoggedIn,
  };

  return (
    <>
      <MyContext.Provider value={context}>{props.children}</MyContext.Provider>
    </>
  );
}

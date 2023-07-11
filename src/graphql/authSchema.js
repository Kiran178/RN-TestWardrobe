import {gql} from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation($userInput: createUserInput) {
    createUser(userInput: $userInput) {
      email
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($userInput: loginUserInput) {
    loginUser(userInput: $userInput) {
      email
      token
    }
  }
`;

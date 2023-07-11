import {gql} from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($userInput: CreateUserInput) {
    createUser(userInput: $userInput) {
      email
      message
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($userInput: LoginUserInput) {
    loginUser(userInput: $userInput) {
      token
      email
    }
  }
`;

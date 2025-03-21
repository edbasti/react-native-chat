import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!) {
    createUser(username: $username) {
      id
      username
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($sender_id: Int!, $receiver_id: Int!, $message: String!) {
    createMessage(sender_id: $sender_id, receiver_id: $receiver_id, message: $message) {
      id
      sender_id
      receiver_id
      message
      created_at
    }
  }
`;
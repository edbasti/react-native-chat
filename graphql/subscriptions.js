import { gql } from '@apollo/client';

export const NEW_MESSAGE_SUB = gql`
  subscription NewMessage($receiver_id: Int!) {
    newMessage(receiver_id: $receiver_id) {
      id
      sender_id
      receiver_id
      message
      created_at
    }
  }
`;
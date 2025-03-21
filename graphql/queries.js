import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query Messages($sender_id: Int!, $receiver_id: Int!) {
    messages(sender_id: $sender_id, receiver_id: $receiver_id) {
      id
      sender_id
      receiver_id
      message
      created_at
    }
  }
`;
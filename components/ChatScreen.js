import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import { SEND_MESSAGE } from '../graphql/mutations';
import { NEW_MESSAGE_SUB } from '../graphql/subscriptions';

const ChatScreen = () => {
  const [senderId, setSenderId] = useState(1);
  const [receiverId, setReceiverId] = useState(2);
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);

  const { data } = useQuery(GET_MESSAGES, {
    variables: { sender_id: senderId, receiver_id: receiverId },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { data: newMessageData } = useSubscription(NEW_MESSAGE_SUB, {
    variables: { receiver_id: senderId },
  });

  useEffect(() => {
    if (data?.messages) {
      setMessagesList(data.messages);
    }
  }, [data]);

  useEffect(() => {
    if (newMessageData?.newMessage) {
      setMessagesList((prev) => [...prev, newMessageData.newMessage]);
    }
  }, [newMessageData]);

  const handleSend = async () => {
    if (!message) return;
    await sendMessage({
      variables: { sender_id: senderId, receiver_id: receiverId, message },
    });
    setMessage('');
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <FlatList
        data={messagesList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.sender_id === senderId ? 'Me: ' : 'Them: '}
            {item.message}
          </Text>
        )}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default ChatScreen;
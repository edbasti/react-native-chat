import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import ChatScreen from '../../components/ChatScreen';

const httpLink = new HttpLink({
  uri: 'https://178.128.61.160.nip.io/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://178.128.61.160.nip.io/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ChatScreen />
    </ApolloProvider>
  );
}
// App.js
import React, { useState } from 'react';
import MessageInput from './components/MessageInput';
import MessageList from './components/MessageList';
import UserSelector from './components/UserSelector';

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [receiver, setReceiver] = useState(null);

  return (
    <div>
      <h1>GraphQL Chat</h1>

      {!selectedUser ? (
        <UserSelector selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      ) : (
        <>
          <h3>Logged in as: {selectedUser.username}</h3>
          <div>
            <label>Select Receiver: </label>
            <select
              value={receiver?.id || ""}
              onChange={(e) => {
                const id = e.target.value;
                const name = id === "1" ? "John" : "Paul";
                setReceiver({ id, username: name });
              }}
            >
              <option value="">-- Select --</option>
              <option value="1">John</option>
              <option value="2">Paul</option>
            </select>
          </div>

          {receiver && (
            <>
              <MessageList senderId={selectedUser.id} receiverId={receiver.id} />
              <MessageInput senderId={selectedUser.id} receiverId={receiver.id} />
            </>
          )}
        </>
      )}
    </div>
  );
}
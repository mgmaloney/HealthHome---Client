import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MessageInfo from '../components/cards/messageInfoCard';
import Conversation from '../components/conversation';
import { getUserMessages } from '../utils/messageData';
import MessageBox from '../components/cards/messageBox';

export default function ViewMessages() {
  const [messages, setMessages] = useState([]);
  const [activeConversation, setActiveConversation] = useState({});

  useEffect(() => {
    getUserMessages({ userId: user.id }).then(setMessages);
  }, [user.id]);

  return (
    <div className="messages-page">
      <div className="message-previews-container">
        <div className="new-message-btn">
          <Button variant="primary" size="sm">
            New
          </Button>
        </div>
        <div className="message-previews">
          {messages.map((message) => (
            <MessageInfo key={message.id} message={message} setActiveConversation={setActiveConversation} />
          ))}
        </div>
      </div>
      <Conversation activeConversation={activeConversation} />
      <MessageBox recipientId={activeConversation[0].recipient} setMessages={setMessages} setActiveConversation={setActiveConversation} />
    </div>
  );
}

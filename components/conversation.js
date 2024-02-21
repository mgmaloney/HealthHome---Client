import React from 'react';
import MessageCard from './cards/messageCard';

export default function Conversation({ activeConversation }) {
  return <div className="conversation">{activeConversation && activeConversation.map((message) => <MessageCard message={message} key={message.id} />)}</div>;
}

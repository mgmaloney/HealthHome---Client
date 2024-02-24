import React from 'react';
import MessageCard from './cards/messageCard';

export default function Conversation({ activeConversation }) {
  return <div className="conversation">{activeConversation && activeConversation?.conversation_messages?.length > 0 && activeConversation.conversation_messages.map((message) => <MessageCard message={message} key={message.id} />)}</div>;
}

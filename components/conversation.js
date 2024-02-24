import React from 'react';
import MessageCard from './cards/messageCard';

export default function Conversation({ activeConversation }) {
  return <div className="conversation">
    <p><em>{conversation[0].sender.id === user.id || conversation[1].recipient.id ? `${conversation[0].recipient.first_name}`: `${conversation[1].recipient.first_name} ${conversation[1].recipient.last_name}`}</em></p>
    {activeConversation && activeConversation?.conversation_messages?.length > 0 && activeConversation.conversation_messages.map((message) => <MessageCard message={message} key={message.id} />)}</div>;
}

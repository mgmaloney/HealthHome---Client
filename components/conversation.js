import React from 'react';
import MessageCard from './cards/messageCard';

export default function Conversation({ activeConversation }) {
  return (
    <div className="conversation">
      {activeConversation && activeConversation.length > 0 && (
        <>
          <p>
            <em>{activeConversation[0].sender.id === user.id || activeConversation[1].recipient.id ? `${activeConversation[0].recipient.first_name}` : `${activeConversation[1].recipient.first_name} ${activeConversation[1].recipient.last_name}`}</em>
          </p>
          {activeConversation && activeConversation?.conversation_messages?.length > 0 && activeConversation.conversation_messages.map((message) => <MessageCard message={message} key={message.id} />)}
        </>
      )}
    </div>
  );
}

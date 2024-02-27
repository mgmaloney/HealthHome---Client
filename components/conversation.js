import React, { useEffect, useState } from 'react';
import MessageCard from './cards/messageCard';
import { getUserName } from '../utils/userData';

export default function Conversation({ activeConversation, recipientId }) {
  const [conversationPartner, setConversationPartner] = useState({});

  useEffect(() => {
    getUserName(recipientId).then(setConversationPartner);
  }, [recipientId]);

  return (
    <div className="conversation">
      {activeConversation && activeConversation.conversation_messages?.length > 0 && (
        <>
          <p>
            Conversation with:{' '}
            <strong>
              <em>{conversationPartner.userName}</em>
            </strong>
          </p>
          {activeConversation && activeConversation.conversation_messages.length > 0 && activeConversation.conversation_messages.map((message) => <MessageCard message={message} key={message.id} />)}
        </>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

Conversation.propTypes = {
  recipientId: PropTypes.string.isRequired,
  activeConversation: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        datetime: PropTypes.string,
        sender: PropTypes.string,
        recipient: PropTypes.string,
        read: PropTypes.bool,
        conversation: PropTypes.string,
      })
    )
  ).isRequired,
};

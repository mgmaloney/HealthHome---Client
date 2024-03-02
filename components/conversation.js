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
  recipientId: PropTypes.number.isRequired,
  activeConversation: PropTypes.shape({
    conversation_messages: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        datetime: PropTypes.string,
        sender: PropTypes.shape({
          id: PropTypes.string,
          first_name: PropTypes.string,
          last_name: PropTypes.string,
          address: PropTypes.string,
          email: PropTypes.string,
          phone_number: PropTypes.string,
          birthdate: PropTypes.string,
          ssn: PropTypes.string,
          sex: PropTypes.string,
          gender: PropTypes.string,
        }),
        recipient: PropTypes.string,
        read: PropTypes.bool,
        conversation: PropTypes.string,
      })
    ),
  }).isRequired,
};

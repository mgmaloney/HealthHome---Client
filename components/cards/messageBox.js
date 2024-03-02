import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createMessage, getSingleConversation, getUserRecentMessages } from '../../utils/messageData';
import { useAuth } from '../../utils/context/authContext';

export default function MessageBox({ recipientId, setRecentMessages, activeConversation, setActiveConversation }) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipientId !== 0) {
      if (activeConversation.conversation_messages) {
        await createMessage({ content: message, senderId: user.id, recipientId, conversationId: activeConversation.id });
      } else {
        await createMessage({ content: message, senderId: user.id, recipientId });
      }
      const updatedMessages = await getUserRecentMessages({ userId: user.id });
      setRecentMessages(updatedMessages);
      const updatedConversation = await getSingleConversation({ userId: user.id, recipientId });
      setActiveConversation(updatedConversation);
      setMessage('');
    }
  };

  return (
    <div className="message-box">
      <form onSubmit={handleSubmit}>
        <div className="textbox-container">
          <textarea className="message-textbox" cols="40" rows="5" wrap="hard" onChange={handleTextChange} value={message} />
          <button className="send-btn" type="submit">
            Send &#10148;
          </button>
        </div>
      </form>
    </div>
  );
}

MessageBox.propTypes = {
  recipientId: PropTypes.number,
  setRecentMessages: PropTypes.func.isRequired,
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
  }),
  setActiveConversation: PropTypes.func.isRequired,
};

MessageBox.defaultProps = {
  recipientId: '',
  activeConversation: [],
};

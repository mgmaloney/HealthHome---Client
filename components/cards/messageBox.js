import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createMessage, getSingleConversation, getUserRecentMessages } from '../../utils/messageData';
import { useAuth } from '../../utils/context/authContext';

export default function MessageBox({ recipient_id, setRecentMessages, activeConversation, setActiveConversation }) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipient_id !== 0) {
      if (activeConversation.conversation_messages) {
        await createMessage({ content: message, sender_id: user.id, recipient_id, conversation_id: activeConversation.id });
      } else {
        await createMessage({ content: message, sender_id: user.id, recipient_id });
      }
      const updatedMessages = await getUserRecentMessages({ user_id: user.id });
      setRecentMessages(updatedMessages);
      const updatedConversation = await getSingleConversation({ user_id: user.id, recipient_id });
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
  recipient_id: PropTypes.number,
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
  recipient_id: '',
  activeConversation: [],
};

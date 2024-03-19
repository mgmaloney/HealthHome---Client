import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';

export default function MessageCard({ message }) {
  const { user } = useAuth();

  const isSenderUser = () => {
    if (message.sender.id === user.id) {
      return 'sender';
    }
    return 'recipient';
  };

  return (
    <div className={`message-container-${isSenderUser()}`}>
      <div className={`message-${isSenderUser()}`}>
        <p className="message-content">{message.content}</p>
      </div>
    </div>
  );
}

MessageCard.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    datetime: PropTypes.string,
    sender: PropTypes.string,
    recipient: PropTypes.string,
    read: PropTypes.bool,
    conversation: PropTypes.string,
  }).isRequired,
};

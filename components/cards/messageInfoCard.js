/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleConversation, readMessage } from '../../utils/messageData';
import { useAuth } from '../../utils/context/authContext';

export default function MessageInfo({ message, activeConversation, setActiveConversation }) {
  const [preview, setPreview] = useState('');
  const { user } = useAuth();
  const [recipient_id, setrecipient_id] = useState('');

  useEffect(() => {
    if (message.content) {
      const slice = `${message.content.slice(0, 20)}...`;
      setPreview(slice);
    }
  }, [message.content]);

  const handleConversationSelect = async () => {
    let selectedrecipient_id = message.recipient.id;
    if (message.recipient.id === user.id) {
      selectedrecipient_id = message.sender.id;
    }
    setrecipient_id(selectedrecipient_id);
    const conversation = await getSingleConversation({ user_id: user.id, recipient_id: selectedrecipient_id });
    conversation.conversation_messages?.forEach(async (messageToCheck) => {
      if (messageToCheck.sender.id !== user.id && !messageToCheck.read) {
        await readMessage({ messageId: messageToCheck.id });
      }
    });
    await setActiveConversation(conversation);
  };

  const handleCredentialDisplay = () => {
    if (user.credential) {
      return `, ${user.credential}`;
    }
    return '';
  };

  return (
    <div className={(activeConversation.conversation_messages && activeConversation.conversation_messages[0].recipient.id === recipient_id) || (activeConversation.conversation_messages && activeConversation.conversation_messages[0].sender.id === recipient_id) ? 'message-info-selected' : 'message-info'} onClick={handleConversationSelect}>
      <p className="message-info-contact">{user.id === message.sender?.id ? `${message.recipient?.first_name} ${message.recipient?.last_name}${handleCredentialDisplay()}` : `${message.sender?.first_name} ${message.sender?.last_name}${handleCredentialDisplay()}`}</p>
      <p className="message-info-preview">{preview}</p>
    </div>
  );
}

MessageInfo.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    datetime: PropTypes.string,
    sender: PropTypes.shape({
      id: PropTypes.number,
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
    recipient: PropTypes.shape({
      id: PropTypes.number,
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
    read: PropTypes.bool,
    conversation: PropTypes.number,
  }).isRequired,
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
  setActiveConversation: PropTypes.func.isRequired,
};

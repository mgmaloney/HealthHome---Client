import React, { useEffect, useState } from 'react';
import { getConversation, readMessage } from '../../utils/messageData';
import { useAuth } from '../../utils/context/authContext';

export default function MessageInfo({ message, setActiveConversation }) {
  const [preview, setPreview] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (message.content) {
      const slice = `${message.content.slice(0, 20)}...`;
      setPreview(slice);
    }
  }, [message.content]);

  const handleConversationSelect = async () => {
    let recipientId = message.recipient.id;
    if (message.recipient.id === user.id) {
      recipientId = message.sender.id;
    }
    const conversation = await getConversation({ userId: user.id, recipientId });
    conversation.forEach(async (messageToCheck) => {
      if (messageToCheck.sender.id !== user.id && !messageToCheck.read) {
        await readMessage({ messageId: messageToCheck.id });
      }
    });
    setActiveConversation(conversation);
  };

  const handleCredentialDisplay = () => {
    if (message.recipient.credential && message.recipient.id !== user.id) {
      return `, ${message.recipient.credential}`;
    }
    if (message.sender.credential && message.sender.id === user.id) {
      return `, ${message.sender.credential}`;
    }
    return '';
  };

  return (
    <div className="message-info" onClick={handleConversationSelect}>
      <p className="message-info-contact">{user.id === message.sender.id ? `${message.recipient.first_name} ${message.recipient.last_name}${handleCredentialDisplay()}` : `${message.sender.first_name} ${message.sender.last_name}${handleCredentialDisplay()}`}</p>
      <p className="message-info-preview">{preview}</p>
    </div>
  );
}

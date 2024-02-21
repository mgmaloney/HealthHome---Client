import React, { useEffect, useState } from 'react';
import { getConversation } from '../../utils/messageData';
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

  const handleConversationSelect = () => {
    getConversation({ userId: user.id, recipientId: message.recipient }).then(setActiveConversation);
  };

  return (
    <div className="message-info" onClick={handleConversationSelect}>
      <p className="message-info-sender">{message.sender}</p>
      <p className="message-info-preview">{preview}</p>
    </div>
  );
}

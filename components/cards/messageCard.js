import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';

export default function MessageCard({ message }) {
  const { user } = useAuth();

  const isSenderUser = () => {
    if (message.senderId === user.id) {
      return 'sender';
    }
    return 'recipient';
  };

  return (
    <div className={`message-${isSenderUser()}`}>
      <p className="message-content">{message.content}</p>
    </div>
  );
}

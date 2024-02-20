import React, { useEffect, useState } from 'react';

export default function MessageInfo({ message }) {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (message.content) {
      const slice = `${message.content.slice(0, 20)}...`;
      setPreview(slice);
    }
  }, [message.content]);

  return (
    <div className="message-info">
      <p className="message-info-sender">{message.sender}</p>
      <p className="message-info-preview">{preview}</p>
    </div>
  );
}

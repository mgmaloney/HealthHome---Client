import React, { useState } from 'react';
import { createMessage, getSingleConversation, getUserMessages } from '../../utils/messageData';
import { useAuth } from '../../utils/context/authContext';

export default function MessageBox({ recipientId, setMessages, setActiveConversation }) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipientId !== 0) {
      await createMessage({ content: message, senderId: user.id, recipientId });
      const updatedMessages = await getUserMessages({ userId: user.id });
      setMessages(updatedMessages);
      const updatedConversation = await getSingleConversation({ userId: user.id, recipientId });
      setActiveConversation(updatedConversation);
      setMessage('');
    }
  };

  return (
    <div className="message-box">
      <form onSubmit={handleSubmit}>
        <input className="message-textbox" type="textbox" onChange={handleTextChange} value={message} />
        <button className="send-btn" type="submit">
          Send &#10148;
        </button>
      </form>
    </div>
  );
}

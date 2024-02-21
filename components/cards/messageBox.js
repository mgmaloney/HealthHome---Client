import React, { useState } from 'react';
import { createMessage, getConversation, getUserMessages } from '../../utils/messageData';

export default function MessageBox({ recipientId, setMessages, setActiveConversation }) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const handleTextChange = (e) => {
    setMessage(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMessage({ content: message, senderId: user.id, recipientId });
    const updatedMessages = await getUserMessages({ userId: user.id });
    setMessages(updatedMessages);
    const updatedConversation = await getConversation({ userId: user.id, recipientId });
    setActiveConversation(updatedConversation);
    setMessage('');
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

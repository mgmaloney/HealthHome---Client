import React, { useEffect, useState } from 'react';
import { getConversation } from '../utils/messageData';
import MessageCard from './cards/messageCard';

export default function Conversation({ recipientId, activeConversation }) {
  return <div className="conversation">{activeConversation && activeConversation.map((message) => <MessageCard message={message} key={message.id} />)}</div>;
}

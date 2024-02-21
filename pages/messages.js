import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MessageInfo from '../components/cards/messageInfoCard';
import Conversation from '../components/conversation';
import { getProvidersAndAdmins, getUserMessages } from '../utils/messageData';
import MessageBox from '../components/cards/messageBox';

export default function ViewMessages() {
  const [messages, setMessages] = useState([]);
  const [providersAndAdmins, setProvidersAndAdmins] = useState([]);
  const [activeConversation, setActiveConversation] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getUserMessages({ userId: user.id }).then(setMessages);
  }, [user.id]);

  useEffect(() => {
    getProvidersAndAdmins().then(setProvidersAndAdmins);
  }, []);

  const handleDialog = () => {
    if (openDialog) {
      setOpenDialog(false);
    }
    setOpenDialog(true);
  };

  return (
    <div className="messages-page">
      <div className="select-recipient-dialog">
        <dialog open={openDialog} className="select-recipient-dialog">
          <datalist>
            {providersAndAdmins.map((recipient) => (
              <option value={recipient.id}>
                {recipient.firstName} {recipient.lastName}
              </option>
            ))}
          </datalist>
        </dialog>
      </div>
      <div className="message-previews-container">
        <div className="new-message-btn">
          <Button variant="primary" size="sm" onClick={handleDialog}>
            New
          </Button>
        </div>
        <div className="message-previews">
          {messages.map((message) => (
            <MessageInfo key={message.id} message={message} setActiveConversation={setActiveConversation} />
          ))}
        </div>
      </div>
      <Conversation activeConversation={activeConversation} />
      <MessageBox recipientId={activeConversation[0].recipient} setMessages={setMessages} setActiveConversation={setActiveConversation} />
    </div>
  );
}

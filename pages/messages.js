/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MessageInfo from '../components/cards/messageInfoCard';
import Conversation from '../components/conversation';
import { getPatients, getProvidersAndAdmins, getSingleConversation, getUserRecentMessages } from '../utils/messageData';
import MessageBox from '../components/cards/messageBox';
import { useAuth } from '../utils/context/authContext';

export default function ViewMessages() {
  const { user } = useAuth();
  const [recentMessages, setRecentMessages] = useState([]);
  const [providersAndAdmins, setProvidersAndAdmins] = useState([]);
  const [patients, setPatients] = useState([]);
  const [activeConversation, setActiveConversation] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(0);

  useEffect(() => {
    getUserRecentMessages({ userId: user.id }).then(setRecentMessages);
  }, [user.id]);

  useEffect(() => {
    if (user.admin || user.provider) {
      getPatients().then(setPatients);
    }
    getProvidersAndAdmins().then(setProvidersAndAdmins);
  }, [user.admin, user.provider]);

  useEffect(() => {
    if (activeConversation && activeConversation.conversation_messages && activeConversation.conversation_messages.length > 0) {
      if (activeConversation.conversation_messages[0].sender.id === user.id) {
        setSelectedRecipient(activeConversation.conversation_messages[0].recipient.id);
      } else {
        setSelectedRecipient(activeConversation.conversation_messages[0].sender.id);
      }
    }
  }, [activeConversation, activeConversation.conversation_messages, user.id]);

  const handleDialog = () => {
    if (openDialog) {
      setOpenDialog(false);
    }
    if (!openDialog) {
      setOpenDialog(true);
    }
  };

  const handleSelectedRecipient = (e) => {
    const [first_name, last_name, credential] = e.target.value.split(' ');
    if (user.admin || user.provider) {
      const recipient = patients.find((patient) => patient.first_name === first_name && patient.last_name === last_name);
      if (recipient) {
        setSelectedRecipient(recipient.id);
      }
    } else {
      const recipient = providersAndAdmins.find((providerOrAdmin) => providerOrAdmin.first_name === first_name && providerOrAdmin.last_name === last_name && providerOrAdmin.credential === credential);
      if (recipient) {
        setSelectedRecipient(recipient.id);
      }
    }
  };

  const handleCompose = () => {
    if (Number(selectedRecipient) !== 0) {
      getSingleConversation({ userId: user.id, recipientId: selectedRecipient }).then(setActiveConversation);
      setOpenDialog(false);
    }
  };

  return (
    <div className="messages-page">
      <div className="select-recipient-dialog">
        <dialog open={openDialog} className="select-recipient-dialog">
          <div className="close-dialog-x-container">
            <button type="button" onClick={handleDialog} className="close-dialog-x">
              X
            </button>
          </div>
          <div className="select-recipient-container">
            <label className="select-recipient-label">
              Choose a recipient:
              <input list="recipients" onChange={handleSelectedRecipient} />
            </label>
            <datalist id="recipients">{user.provider || user.admin ? <>{patients && patients.length > 0 && patients.map((patient) => <option key={patient.id} id={patient.id} value={`${patient.first_name} ${patient.last_name}`} />)}</> : <>{providersAndAdmins && providersAndAdmins.length > 0 && providersAndAdmins.map((recipient) => <option id={recipient.id} value={`${recipient.first_name} ${recipient.last_name} ${recipient.credential}`} />)}</>}</datalist>
            <Button variant="primary" size="sm" onClick={handleCompose}>
              Compose Message
            </Button>
          </div>
        </dialog>
      </div>
      <div className="btn-and-messages">
        <div className="message-btn-wrapper">
          <div className="new-message-btn">
            <Button variant="primary" onClick={handleDialog}>
              New
            </Button>
          </div>
        </div>
        <div className="everything-but-btn">
          <div className="messages-wrapper">
            <div className="message-previews-container">
              <div className="message-previews">{recentMessages && recentMessages.map((message) => <MessageInfo key={message.id} message={message} activeConversation={activeConversation} setActiveConversation={setActiveConversation} />)}</div>
            </div>
            <div className="conversations-and-message-box">
              <Conversation activeConversation={activeConversation} recipientId={selectedRecipient} />

              <MessageBox recipientId={selectedRecipient} setRecentMessages={setRecentMessages} activeConversation={activeConversation} setActiveConversation={setActiveConversation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

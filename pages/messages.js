import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MessageInfo from '../components/cards/messageInfoCard';
import Conversation from '../components/conversation';
import { getPatients, getProvidersAndAdmins, getSingleConversation, getUserMessages } from '../utils/messageData';
import MessageBox from '../components/cards/messageBox';
import { useAuth } from '../utils/context/authContext';

export default function ViewMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [providersAndAdmins, setProvidersAndAdmins] = useState([]);
  const [patients, setPatients] = useState([]);
  const [activeConversation, setActiveConversation] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(0);

  useEffect(() => {
    getUserMessages({ userId: user.id }).then(setMessages);
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
  }, [activeConversation, activeConversation.conversation_messages]);

  const handleDialog = () => {
    if (openDialog) {
      setOpenDialog(false);
    }
    setOpenDialog(true);
  };

  const handleSelectedRecipient = (e) => {
    const [firstName, lastName, credential] = e.target.value.split(' ');
    if (user.admin || user.provider) {
      const recipient = patients.find((patient) => patient.first_name === firstName && patient.last_name === lastName);
      setSelectedRecipient(recipient.id);
    } else {
      const recipient = providersAndAdmins.find((providerOrAdmin) => providerOrAdmin.first_name === firstName && providerOrAdmin.last_name === lastName && providerOrAdmin.credential === credential);
      setSelectedRecipient(recipient.id);
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
          <label>
            Choose a recipient:
            <input list="recipients" onChange={handleSelectedRecipient} />
          </label>
          <datalist id="recipients">{user.provider || user.admin ? <>{patients && patients.length > 0 && patients.map((patient) => <option id={patient.id} value={`${patient.first_name} ${patient.last_name}`} />)}</> : <>{providersAndAdmins && providersAndAdmins.length > 0 && providersAndAdmins.map((recipient) => <option id={recipient.id} value={`${recipient.first_name} ${recipient.last_name} ${recipient.credential}`} />)}</>}</datalist>
          <Button variant="primary" size="sm" onClick={handleCompose}>
            Compose Message
          </Button>
        </dialog>
      </div>
      <div className="message-previews-container">
        <div className="new-message-btn">
          <Button variant="primary" size="sm" onClick={handleDialog}>
            New
          </Button>
        </div>
        <div className="message-previews">{messages && messages.map((message) => <MessageInfo key={message.id} message={message} setActiveConversation={setActiveConversation} />)}</div>
      </div>
      <Conversation activeConversation={activeConversation} />
      <MessageBox recipientId={selectedRecipient} setMessages={setMessages} activeConversation={activeConversation} setActiveConversation={setActiveConversation} />
    </div>
  );
}

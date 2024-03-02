import axios from 'axios';
import { clientCredentials } from './client';

const databaseUrl = clientCredentials.databaseURL;

const getUserMessages = async (payload) => {
  try {
    const { data } = await axios.put(`${databaseUrl}/messages/user_messages`, payload);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return e;
  }
};
const getUserRecentMessages = async (payload) => {
  try {
    const { data } = await axios.put(`${databaseUrl}/conversations/get_conversations`, payload);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const getSingleConversation = async (payload) => {
  try {
    const { data } = await axios.put(`${databaseUrl}/conversations/get_single_conversation`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const createMessage = async (payload) => {
  try {
    const { data } = await axios.post(`${databaseUrl}/messages`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const readMessage = async (payload) => {
  try {
    const { data } = await axios.put(`${databaseUrl}/messages/read_message`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const getProvidersAndAdmins = async () => {
  try {
    const { data } = await axios.put(`${databaseUrl}/users/get_providers_and_admins`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const getPatients = async () => {
  try {
    const { data } = await axios.get(`${databaseUrl}/patients`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return e;
  }
};

export { getUserMessages, getUserRecentMessages, createMessage, readMessage, getSingleConversation, getProvidersAndAdmins, getPatients };

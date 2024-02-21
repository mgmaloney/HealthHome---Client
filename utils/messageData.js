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

const getConversation = async (payload) => {
  try {
    const { data } = await axios.get(`${databaseUrl}/messages/get_conversation`, payload);
    if (data.length > 0) {
      return data;
    }
    return [];
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

export { getUserMessages, createMessage, getConversation, getProvidersAndAdmins };

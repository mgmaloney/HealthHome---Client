import axios from 'axios';
import { clientCredentials } from './client';

const databaseUrl = clientCredentials.databaseURL;

const getUserMessages = async (payload) => {
  try {
    const { data } = await axios.get(`${databaseUrl}/messages`, payload);
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

export { getUserMessages, createMessage };

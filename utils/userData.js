import axios from 'axios';
import { clientCredentials } from './client';

const databaseURL = clientCredentials.databaseURL;

const getUserName = async (user_id) => {
  try {
    const { data } = await axios.put(`${databaseURL}/users/get_user_name`, { user_id });
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

export { getUserName };

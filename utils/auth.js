import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { clientCredentials } from './client';

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/checkuser`, {
      method: 'POST',
      body: JSON.stringify({
        uid,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

const firstLoginAccountCheck = async (payload) => {
  const { data } = await axios.post(`${clientCredentials.databaseURL}/first_login_check`, payload);
  return data;
};

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  firstLoginAccountCheck,
};

import axios from 'axios';
import { clientCredentials } from './client';

const { databaseURL } = clientCredentials;

const getSinglePatient = async (patientId) => {
  try {
    const { data } = await axios.get(`${databaseURL}/patients`, { patientId });
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const getPatientAllergies = async (patientId) => {
  try {
    const { data } = await axios.get(`${databaseURL}/allergies/patient_allergies`, { patientId });
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const deletePatientAllergy = async (id) => {
  try {
    await axios.delete(`${databaseURL}/allergies/${id}`);
    return true;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

export { getSinglePatient, getPatientAllergies, deletePatientAllergy };
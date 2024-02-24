import axios from 'axios';
import { clientCredentials } from './client';

const { databaseURL } = clientCredentials;

const getPatients = async () => {
  try {
    const { data } = await axios.get(`${databaseURL}/patients`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const getSinglePatient = async (patientId) => {
  try {
    const { data } = await axios.get(`${databaseURL}/patients`, { patientId });
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const createPatient = async (payload) => {
  try {
    const { data } = await axios.post(`${databaseURL}/patients`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const updatePatient = async (payload) => {
  try {
    const { data } = await axios.put(`${databaseURL}/patients`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const getPatientAllergies = async (patientId) => {
  try {
    const { data } = await axios.put(`${databaseURL}/allergies/patient_allergies`, { patientId });
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

const createPatientAllergy = async (payload) => {
  try {
    const { data } = await axios.post(`${databaseURL}/allergies`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const updatePatientAllergy = async (payload) => {
  try {
    const { data } = await axios.put(`${databaseURL}/allergies/${payload.id}`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

export { getPatients, getSinglePatient, createPatient, updatePatient, getPatientAllergies, deletePatientAllergy, createPatientAllergy, updatePatientAllergy };

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

const getSinglePatient = async (patient_id) => {
  try {
    const { data } = await axios.put(`${databaseURL}/patients/get_single_patient`, { patient_id });
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
    const { data } = await axios.put(`${databaseURL}/patients/update_patient`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const getPatientAllergies = async (patient_id) => {
  try {
    const { data } = await axios.put(`${databaseURL}/allergies/patient_allergies`, { patient_id });
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

const createPatientMedication = async (payload) => {
  try {
    const { data } = await axios.post(`${databaseURL}/patientmeds`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const updatePatientMedication = async (payload) => {
  try {
    const { data } = await axios.put(`${databaseURL}/patientmeds/${payload.id}`, payload);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const deletePatientMedication = async (id) => {
  try {
    const { data } = await axios.delete(`${databaseURL}/patientmeds/${id}`);
    return data;
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const getPatientMedications = async (payload) => {
  try {
    const { data } = await axios.put(`${databaseURL}/patientmeds/get_all_patient_meds`, payload);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return e;
  }
};

const getDBMedications = async (searchTerm) => {
  try {
    const { data } = await axios.get(`${databaseURL}/dbmeds/filter_meds?search=${searchTerm}`);
    if (data.length > 0) {
      return data;
    }
    return [];
  } catch (e) {
    console.warn(e);
    return e;
  }
};

export { getPatients, getSinglePatient, createPatient, updatePatient, getPatientAllergies, deletePatientAllergy, createPatientAllergy, updatePatientAllergy, getPatientMedications, createPatientMedication, updatePatientMedication, deletePatientMedication, getDBMedications };

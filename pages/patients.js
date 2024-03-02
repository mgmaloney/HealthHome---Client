import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPatients } from '../utils/patientData';
import PatientCard from '../components/cards/patientCard';

export default function ViewPatients() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (user.admin || user.provider) {
      getPatients().then(setPatients);
    }
  }, [user]);

  return <>{!user.admin && !user.provider ? <h1>Page Not Found</h1> : <>{patients && patients.length > 0 && patients.map((patient) => <PatientCard key={patient.id} patient={patient} />)}</>}</>;
}

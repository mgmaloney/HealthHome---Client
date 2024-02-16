import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { useRouter } from 'next/router';
import { getPatientAllergies, getSinglePatient } from '../../../utils/patientData';

export default function AllergyForm() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [patient, setPatient] = useState({});
  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    if (!user.admin && !user.provider) {
      setPatient(user);
    }
    getSinglePatient.then(setPatient);
  }, [user.admin, user.provider]);

  useEffect(() => {
    getPatientAllergies(id).then(setAllergies);
  }, [id]);

  return <>{user.id === patient.id || user.admin || user.provider ? <></> : <h1>Page not found</h1>}</>;
}

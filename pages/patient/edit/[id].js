import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePatient } from '../../../utils/patientData';
import PatientForm from '../../../components/addPatientForm';

export default function EditPatient() {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = useState({});
  useEffect(() => {
    getSinglePatient(id).then(setPatient);
  }, [id]);

  return <PatientForm patient={patient} />;
}

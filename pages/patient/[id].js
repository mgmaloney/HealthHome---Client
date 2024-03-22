import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getPatientAllergies, getPatientMedications, getSinglePatient } from '../../utils/patientData';

export default function ViewPatient() {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = useState({});
  const [patientAllergies, setPatientAllergies] = useState([]);
  const [patientMedications, setPatientMedications] = useState([]);

  useEffect(() => {
    getSinglePatient(id).then(setPatient);
  }, [id]);

  useEffect(() => {
    getPatientAllergies(id).then(setPatientAllergies);
  }, [id]);

  useEffect(() => {
    getPatientMedications({ patient_id: id }).then(setPatientMedications);
  }, [id]);

  return (
    <Card style={{ width: '100vh', margin: '10px' }}>
      {/* <Card.Img variant="top" src={user.image} alt={user.username} style={{ height: '400px' }} /> */}
      <Card.Body>
        <Card.Title className="patient-allergy-medication">{`${patient.first_name} ${patient.last_name}`}</Card.Title>
        <div className="patient-details">
          <Card.Text className="patient-allergy-medication">DOB: {patient.birthdate}</Card.Text>
          <Card.Text className="patient-allergy-medication">Phone: Number {patient.phone_number}</Card.Text>
          <Card.Text className="patient-allergy-medication">Email: {patient.email}</Card.Text>
        </div>
        <div className="allergy-medications">
          <Card.Header>Allergies</Card.Header>
          <div className="patient-allergies-container">
            {patientAllergies &&
              patientAllergies.map((allergy) => (
                <p className="patient-allergy-medication">
                  <strong>{allergy.name}</strong> {allergy.severity}
                </p>
              ))}
          </div>

          <Card.Header>Medications</Card.Header>
          <div className="patient-medications-container">
            {patientMedications &&
              patientMedications.map((medication) => (
                <>
                  <p className="patient-allergy-medication">
                    <strong>{medication.name}</strong>
                    {medication.severity} {medication.dose}
                  </p>
                </>
              ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

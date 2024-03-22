import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { deletePatientMedication, getPatientMedications } from '../../utils/patientData';

export default function MedicationCard({ patient_id, medication, setMedications, setFormData }) {
  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${medication.name} medication?`)) {
      deletePatientMedication(medication.id).then(async () => {
        const response = await getPatientMedications({ patient_id });
        setMedications(response);
        setFormData({
          name: '',
          dose: '',
          route: '',
          patient_id: Number(patient_id),
        });
      });
    }
  };

  const handleEdit = () => {
    setFormData({
      id: medication.id,
      name: medication.name,
      route: medication.route,
      dose: medication.dose,
      patient_id: medication.patient,
    });
  };

  return (
    <>
      <Card className="medication-card">
        <Card.Body>{medication.name}</Card.Body>
        <div className="card-btns">
          <Button variant="primary" onClick={handleEdit} size="sm" className="medication-btn">
            Edit
          </Button>
          <Button variant="danger" onClick={handleRemove} size="sm" className="medication-btn">
            Remove
          </Button>
        </div>
      </Card>
    </>
  );
}

MedicationCard.propTypes = {
  patient_id: PropTypes.string.isRequired,
  medication: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    route: PropTypes.string,
    dose: PropTypes.string,
    patient: PropTypes.number,
  }).isRequired,
  setMedications: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

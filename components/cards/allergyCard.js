import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { deletePatientAllergy, getPatientAllergies } from '../../utils/patientData';

export default function AllergyCard({ patient_id, allergy, setAllergies, setFormData }) {
  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${allergy.name} allergy?`)) {
      deletePatientAllergy(allergy.id).then(async () => {
        const response = await getPatientAllergies(patient_id);
        setAllergies(response);
        setFormData({
          name: '',
          severity: '',
          reaction: '',
          patient_id: Number(patient_id),
        });
      });
    }
  };

  const handleEdit = () => {
    setFormData({
      id: allergy.id,
      name: allergy.name,
      severity: allergy.severity,
      reaction: allergy.reaction,
      patient_id: allergy.patient,
    });
  };

  return (
    <>
      <Card className="allergy-card">
        <Card.Body>{allergy.name} Allergy</Card.Body>
        <div className="card-btns">
          <Button variant="primary" size="sm" onClick={handleEdit} className="allergy-btn">
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={handleRemove} className="allergy-btn">
            Remove
          </Button>
        </div>
      </Card>
    </>
  );
}

AllergyCard.propTypes = {
  patient_id: PropTypes.string.isRequired,
  allergy: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    severity: PropTypes.string,
    reaction: PropTypes.string,
    patient: PropTypes.number,
  }).isRequired,
  setAllergies: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

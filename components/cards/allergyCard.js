import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { deletePatientAllergy, getPatientAllergies } from '../../utils/patientData';

export default function AllergyCard({ patientId, allergy, setAllergies, setFormData }) {
  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete ${allergy.name} allergy?`)) {
      deletePatientAllergy(allergy.id).then(async () => {
        const response = await getPatientAllergies(patientId);
        setAllergies(response);
      });
    }
  };

  const handleEdit = () => {
    setFormData({
      id: allergy.id,
      name: allergy.name,
      severity: allergy.severity,
      reaction: allergy.reaction,
      patientId: allergy.patient,
    });
  };

  return (
    <>
      <Card>
        <Card.Body>{allergy.name} Allergy</Card.Body>
        <Button variant="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          Remove
        </Button>
      </Card>
    </>
  );
}

AllergyCard.propTypes = {
  patientId: PropTypes.string.isRequired,
  allergy: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    severity: PropTypes.string,
    reaction: PropTypes.string,
    patient: PropTypes.string,
  }).isRequired,
  setAllergies: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { deletePatientAllergy, getPatientAllergies } from '../../utils/patientData';

export default function AllergyCard({ allergy, setAllergies, setFormData }) {
  const handleRemove = async () => {
    if (window.confirm(`Are you sure you want to delete ${allergy.name} allergy?`)) {
      await deletePatientAllergy(allergy.id).then(getPatientAllergies(allergy.patient)).then(setAllergies);
    }
  };

  const handleEdit = () => {
    setFormData({ id: allergy.id, name: allergy.name, severity: allergy.severity, patientId: allergy.patient });
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

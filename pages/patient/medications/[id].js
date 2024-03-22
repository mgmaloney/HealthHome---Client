/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { createPatientMedication, getPatientMedications, updatePatientMedication } from '../../../utils/patientData';
import MedicationCard from '../../../components/cards/medicationCard';

export default function MedicationForm() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [medications, setMedications] = useState([]);

  const initialState = {
    name: '',
    dose: '',
    route: '',
    patient_id: Number(id),
  };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    getPatientMedications({ patient_id: id }).then(setMedications);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updatePatientMedication(formData)
        .then(() => getPatientMedications({ patient_id: id }))
        .then(setMedications)
        .then(() => setFormData(initialState));
    } else {
      createPatientMedication({ ...formData })
        .then(() => getPatientMedications({ patient_id: id }))
        .then(setMedications)
        .then(() => setFormData(initialState));
    }
  };

  return (
    <>
      {user.id === Number(id) || user.admin || user.provider ? (
        <>
          <div className="header-div">
            <h1>Add Medication</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput1" label="Name of Medication" className="mb-3">
              <Form.Control type="text" placeholder="Name of Medication" name="name" value={formData.name} onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput1" label="Dose" className="mb-3">
              <Form.Control type="text" placeholder="50 mg" name="dose" value={formData.dose} onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput1" label="Route of Administration" className="mb-3">
              <Form.Select name="route" value={formData.route} onChange={handleChange}>
                <option value="oral">Oral</option>
                <option value="sublingual">Sublingual</option>
                <option value="rectal">Rectal</option>
                <option value="intraveneous">Intravenous</option>
                <option value="intramuscular">Intramuscular</option>
                <option value="subcutaneous">Subcutaneous</option>
                <option value="intranasal">Intranasal</option>
                <option value="inhaled">Inhaled</option>
                <option value="transdermal">Transdermal</option>
              </Form.Select>
            </FloatingLabel>
            <div className="submit-btn-wrapper">
              <Button type="submit">{formData.id ? 'Save Medication' : 'Add Medication'}</Button>
            </div>
          </Form>
          <div className="medication-form-medications">
            <h2>Your Medications:</h2>
            <div className="medications">{medications && medications.map && medications?.map((medication) => <MedicationCard key={medication.id} patient_id={id} medication={medication} setMedications={setMedications} setFormData={setFormData} />)}</div>
          </div>
          <div className="submit-btn-wrapper">
            <Button className="finish-btn" variant="primary" size="lg" onClick={() => router.push('/')}>
              Finish
            </Button>
          </div>
        </>
      ) : (
        <h1>Page not found</h1>
      )}
    </>
  );
}

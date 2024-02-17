import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { createPatientAllergy, getPatientAllergies, getSinglePatient, updatePatientAllergy } from '../../../utils/patientData';
import AllergyCard from '../../../components/cards/allergyCard';

export default function AllergyForm() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [patient, setPatient] = useState({});
  const [allergies, setAllergies] = useState([]);

  const initialState = {
    name: '',
    severity: '',
    reaction: '',
    patientId: patient.id,
  };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!user.admin && !user.provider) {
      setPatient(user);
    }
    getSinglePatient.then(setPatient);
  }, [user.admin, user.provider]);

  useEffect(() => {
    getPatientAllergies(id).then(setAllergies);
  }, [id]);

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
      updatePatientAllergy(formData).then(getPatientAllergies(id)).then(setAllergies);
    }
    createPatientAllergy({ ...formData })
      .then(getPatientAllergies)
      .then(setAllergies);
  };

  return (
    <>
      {user.id === patient.id || user.admin || user.provider ? (
        <>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput1" label="Allergen" className="mb-3">
              <Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingSelect" label="Severity">
              <Form.Select
                aria-label="Severity"
                name="severity"
                onChange={handleChange}
                className="mb-3"
                value={formData.severity}
                // required
              >
                <option value="" disabled>
                  Choose Severity
                </option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput1" label="Describe reaction" className="mb-3">
              <Form.Control type="text" placeholder="Hives on chest..." name="reaction" value={formData.reaction} onChange={handleChange} required />
            </FloatingLabel>
            <Button type="submit">Add Allergy</Button>
          </Form>
          <div className="allergy-form-allergies">{allergies && allergies.map((allergy) => <AllergyCard allergy={allergy} setAllergies={setAllergies} setFormData={setFormData} />)}</div>
          <Button variant="primary" onClick={() => router.push('/')}>
            Finish
          </Button>
        </>
      ) : (
        <h1>Page not found</h1>
      )}
    </>
  );
}

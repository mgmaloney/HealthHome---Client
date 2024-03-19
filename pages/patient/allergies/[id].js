import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { createPatientAllergy, getPatientAllergies, updatePatientAllergy } from '../../../utils/patientData';
import AllergyCard from '../../../components/cards/allergyCard';

export default function AllergyForm() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [allergies, setAllergies] = useState([]);

  const initialState = {
    name: '',
    severity: '',
    reaction: '',
    patient_id: Number(id),
  };
  const [formData, setFormData] = useState(initialState);

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
      updatePatientAllergy(formData)
        .then(() => getPatientAllergies(id))
        .then(setAllergies)
        .then(() => setFormData(initialState));
    } else {
      createPatientAllergy({ ...formData })
        .then(() => getPatientAllergies(id))
        .then(setAllergies)
        .then(() => setFormData(initialState));
    }
  };

  return (
    <>
      {user.id === Number(id) || user.admin || user.provider ? (
        <>
          <div className="header-div">
            <h1>Add Allergy</h1>
          </div>
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
            <div className="submit-btn-wrapper">
              <Button type="submit">{formData.id ? 'Save Allergy' : 'Add Allergy'}</Button>
            </div>
          </Form>
          <div className="allergy-form-allergies">
            <h2>Your Allergies:</h2>
            <div className="allergies">{allergies && allergies.map && allergies?.map((allergy) => <AllergyCard key={allergy.id} patient_id={id} allergy={allergy} setAllergies={setAllergies} setFormData={setFormData} />)}</div>
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

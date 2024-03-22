import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createPatient, updatePatient } from '../utils/patientData';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  address: '',
  birthdate: '',
  ssn: '',
  sex: '',
  gender: '',
};

function PatientForm({ patient }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (patient && patient.id) {
      setFormData({ ...patient, user_id: patient.id, first_name: patient.first_name, last_name: patient.last_name, phone_number: patient.phone_number, ssn: '' });
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (patient && patient.id) {
      updatePatient({ ...formData, patient_id: patient.id }).then(router.push('/patients'));
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        birthdate: '',
        ssn: '',
        sex: '',
        gender: '',
      });
    } else {
      createPatient(formData).then(router.push('/patients'));
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        birthdate: '',
        ssn: '',
        sex: '',
        gender: '',
      });
    }
  };

  return (
    <>
      <h1 className="page-header">Add Patient</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name:</Form.Label>
          <Form.Control as="textarea" name="first_name" required placeholder="First Name" value={formData.first_name} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Label>Last Name:</Form.Label>
          <Form.Control as="textarea" name="last_name" required placeholder="Last Name" value={formData.last_name} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Label>Email:</Form.Label>
          <Form.Control as="textarea" name="email" required placeholder="Email" value={formData.email} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control as="textarea" name="phone_number" required placeholder="Phone Number" value={formData.phone_number} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Label>Address:</Form.Label>
          <Form.Control as="textarea" name="address" required placeholder="address" value={formData.address} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <div className="dob-container">
            <label className="form-label dob">
              Date of Birth:
              <input className="dob-input" type="date" name="birthdate" min="1900-01-01" value={formData.birthdate} max={new Date().toLocaleDateString('en-us')} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </label>
            <Form.Label>SSN:</Form.Label>
          </div>
          <Form.Control as="textarea" name="ssn" required placeholder="SSN" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Text className="text-muted" />
          <Form.Label>Sex:</Form.Label>
          <Form.Select name="sex" value={formData.sex} required onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}>
            {/* <option disabled selected={!formData.sex}>
              Select an option
            </option> */}
            <option value="female">Female</option>
            <option value="male">Male</option>
          </Form.Select>
          <Form.Label>Gender:</Form.Label>
          <Form.Select name="gender" value={formData.gender} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}>
            {/* <option disabled selected={!formData?.gender}>
              Select an option
            </option> */}
            <option value="she/her">she/her</option>
            <option value="he/him">he/him</option>
            <option value="they/them">they/them</option>
            <option value="other">Other</option>
            <option value="prefer not to answer">Prefer not to Answer</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

PatientForm.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    address: PropTypes.string,
    emaile: PropTypes.string,
    phone_number: PropTypes.string,
    birthdate: PropTypes.string,
    ssn: PropTypes.string,
    sex: PropTypes.string,
    gender: PropTypes.string,
  }),
};

PatientForm.defaultProps = {
  patient: initialState,
};

export default PatientForm;

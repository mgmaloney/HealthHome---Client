import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createPatient, updatePatient } from '../utils/patientData';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
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
      setFormData({ ...patient, userId: patient.id, firstName: patient.first_name, lastName: patient.last_name, phoneNumber: patient.phone_number, ssn: '' });
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (patient && patient.id) {
      updatePatient({ formData }).then(router.push('/patients'));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthdate: '',
        ssn: '',
        sex: '',
        gender: '',
      });
    }
    createPatient(formData).then(router.push('/patients'));
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      birthdate: '',
      ssn: '',
      sex: '',
      gender: '',
    });
  };

  return (
    <>
      <h1 className="page-header">Add Patient</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name:</Form.Label>
          <Form.Control as="textarea" name="firstName" required placeholder="First Name" value={formData.firstName} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Label>Last Name:</Form.Label>
          <Form.Control as="textarea" name="lastName" required placeholder="Last Name" value={formData.lastName} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Label>Email:</Form.Label>
          <Form.Control as="textarea" name="email" required placeholder="Email" value={formData.email} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control as="textarea" name="phoneNumber" required placeholder="Phone Number" value={formData.phoneNumber} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
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

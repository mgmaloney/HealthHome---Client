import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { firstLoginAccountCheck } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    uid: user.uid,
    firstName: '',
    lastName: '',
    birthdate: '',
    ssn: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    firstLoginAccountCheck(formData)
      .then(() => updateUser(user.uid))
      .then(router.push(`/`));
  };

  return (
    <>
      <h1 className="page-header">Please Enter Some Information to Confirm Your Account</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name:</Form.Label>
          <Form.Control as="textarea" name="firstName" required placeholder="First Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Text className="text-muted">Last Name:</Form.Text>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control as="textarea" name="lastName" required placeholder="Last Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <div className="dob-container">
            <label className="form-label dob">
              Date of Birth:
              <input className="dob-input" type="date" name="birthdate" min="1900-01-01" max={new Date().toLocaleDateString('en-us')} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </label>
            <Form.Label>Last 4 Digits of SSN:</Form.Label>
          </div>
          <Form.Control as="textarea" name="ssn" required placeholder="Last 4 Digits of SSN" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;

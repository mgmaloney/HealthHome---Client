/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { firstLoginAccountCheck } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function RegisterForm({ updateUser }) {
  const router = useRouter();
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    uid: user.uid,
    first_name: '',
    last_name: '',
    birthdate: '',
    ssn: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await firstLoginAccountCheck(formData);
    if ('valid' in response) {
      setErrorMessage('Account not found. Please try again or contact the clinic');
    }
    await updateUser(user.uid);
  };

  useEffect(() => {
    if (user.uid) {
      if (user.provider || user.admin) {
        router.push('/');
      } else if (!user.admin && !user.provider && user.id) {
        router.push(`/patient/allergies/${user.id}`);
      }
    }
  }, [user.uid, user.id]);

  return (
    <>
      <h1 className="page-header">Please Enter Some Information to Confirm Your Account</h1>
      <h2 className="error-message">{errorMessage}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name:</Form.Label>
          <Form.Control as="textarea" name="first_name" required placeholder="First Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Label>Last Name:</Form.Label>
          <Form.Control as="textarea" name="last_name" required placeholder="Last Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <div className="dob-container">
            <label className="form-label dob">
              Date of Birth:
              <input className="dob-input" type="date" name="birthdate" min="1900-01-01" max={new Date().toLocaleDateString('en-us')} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </label>
            <Form.Label>Last 4 Digits of SSN:</Form.Label>
          </div>
          <Form.Control as="textarea" name="ssn" required placeholder="Last 4 Digits of SSN" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          <Form.Text className="text-muted" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

RegisterForm.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;

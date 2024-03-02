import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function PatientCard({ patient }) {
  const router = useRouter();
  return (
    <>
      <div className="patient-card">
        <Link passHref href={`/patient/${patient.id}`} className="patient-name">
          <p className="patient-name">
            {patient.first_name} {patient.last_name}
          </p>
        </Link>
        <button
          type="button"
          className="patient-nav-link edit-patients-page"
          onClick={() => {
            router.push(`/patient/edit/${patient.id}`);
          }}
        >
          Edit
        </button>

        <div>
          <p className="c-and-c-item">Phone: {patient.phone_number}</p>
          <p className="c-and-c-item">
            Email:{' '}
            <a href={`mailto:${patient.email}`} className="c-and-c-item email">
              {patient.email}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

PatientCard.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    birthdate: PropTypes.string,
    ssn: PropTypes.string,
    sex: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
};

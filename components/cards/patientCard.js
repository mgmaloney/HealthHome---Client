import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

export default function PatientCard({ patient }) {
  const router = useRouter();
  return (
    <>
      <div>
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
      </div>

      <div>
        <p className="c-and-c-item">Phone: {patient.phone_number}</p>
        <p>
          Email:{' '}
          <a href={`mailto:${patient.email}`} className="c-and-c-item email">
            {patient.email}
          </a>
        </p>
      </div>
    </>
  );
}

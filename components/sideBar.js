import React from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

export default function SideBar() {
  const { user } = useAuth();

  return (
    <>
      <div className="sidebar-main">
        <Link passHref href="/messages">
          Messages
        </Link>
        {user.admin || user.provider ? (
          <>
            <Link passHref href="/patients">
              Patients
            </Link>
            <Link passHref href="/addPatient">
              Add Patient
            </Link>
          </>
        ) : (
          <>
            <Link passHref href={`/patient/allergies/${user.id}`}>
              Allergies
            </Link>
            {/* <Link passHref href={`/patient/medications/${user.id}`}>
              Medications
            </Link> */}
          </>
        )}
      </div>
    </>
  );
}

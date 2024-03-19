import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="sign-in-wrapper">
      {/* <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          margin: '0 auto',
          zIndex: 1,
          minHeight: '25rem',
          width: '100%',
          minWidth: '30rem',
          paddingBlock: '0 5rem',
        }}
      > */}
      <div className="sign-in-container">
        <div className="sign-in-header">
          <h1 className="sign-in-text">Welcome to HealthHome</h1>
        </div>
        <p className="sign-in-text">Click the button below to login!</p>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
    // </div>
  );
}

export default Signin;

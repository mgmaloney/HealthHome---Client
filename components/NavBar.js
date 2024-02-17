/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <nav className="navbar">
      {/* <div className="nav-container"> */}
      <Link className="navlink" passHref href="/">
        <p className="nav-header">HealthHome</p>
      </Link>
      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"> */}
      <button type="button" className="signout-btn" onClick={signOut}>
        Sign Out
      </button>
      {/* </div> */}
      {/* </Navbar.Collapse> */}
    </nav>
  );
}

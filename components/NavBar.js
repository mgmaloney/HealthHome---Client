/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const router = useRouter();
  const resetRouteAndSignOut = () => {
    signOut();
    router.push('/');
  };
  return (
    <nav className="navbar">
      {/* <div className="nav-container"> */}
      <Link className="navlink" passHref href="/">
        <p className="nav-header">HealthHome</p>
      </Link>
      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"> */}
      <button type="button" className="signout-btn" onClick={resetRouteAndSignOut}>
        Sign Out
      </button>
      {/* </div> */}
      {/* </Navbar.Collapse> */}
    </nav>
  );
}

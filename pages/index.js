import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>
        Welcome {user.firstName} {user.lastName}!{' '}
      </h1>
      <Link passHref href="/messages">
        <p>View Your Messages</p>
      </Link>
    </div>
  );
}

export default Home;

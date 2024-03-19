import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUnreadMessagesCount } from '../utils/messageData';

function Home() {
  const { user } = useAuth();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    getUnreadMessagesCount({ userId: user.id }).then(setUnreadMessagesCount);
  }, [user.id]);

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
        Welcome {user.first_name} {user.last_name}!{' '}
      </h1>
      <Link passHref href="/messages">
        <p className="unread-messages">
          You have {unreadMessagesCount} Unread Message{unreadMessagesCount === 1 ? '' : 's'}
        </p>
      </Link>
    </div>
  );
}

export default Home;

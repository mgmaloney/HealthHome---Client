import React, { useEffect, useState } from 'react';

export default function MessageBox({ recipient }) {
  const [message, setMessage] = useState({ recipientId: recipient });

  const handleTextChange = (e) => {
    setMessage(e);
  };

  return (
    <div className="message-box">
      <form>
        <input type="textbox" onChange={handleTextChange} />
        <div>
          <button type="submit">Send &#10148;</button>
        </div>
      </form>
    </div>
  );
}

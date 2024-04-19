import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const Popup = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const sendMessageHandler = () => {
    const message = { action: 'sendWhatsApp', payload: phoneNumber };

    chrome.runtime.sendMessage(message);
  }
  const changePhoneNumberHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(ev.target.value);
  };

  return (
    <>
      <h3>How to use</h3>
      <ul style={{ minWidth: '500px' }}>
        <li>Select a valid phone number</li>
        <li>Press right click to call a context menu</li>
        <li>Choose 'Send WhatsApp message'</li>
      </ul>
      <hr />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        <input
          style={{ minWidth: '250px' }}
          placeholder='E.g. +1 (343) 123 441 442'
          value={phoneNumber}
          onChange={changePhoneNumberHandler}
        />
        <button onClick={sendMessageHandler}>Send message</button>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);


import React, { useEffect } from 'react';

function Success() {

  useEffect(() => {
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
  }, []);

  return (
    <div>
      <div
        style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
      >
        <h1>Success!</h1>
        <h2>Thank you for your donation!</h2>
        <h2>You will now be redirected to the home page</h2>
        </div>
    </div>
  );
}

export default Success;
 
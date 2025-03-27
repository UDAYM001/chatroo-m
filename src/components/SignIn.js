import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '@mui/material';

function SignIn() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User Info:", result.user);
      })
      .catch((error) => {
        console.error("Sign In Error:", error);
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Button variant="contained" onClick={signInWithGoogle}>
        Sign In with Google
      </Button>
    </div>
  );
}

export default SignIn;

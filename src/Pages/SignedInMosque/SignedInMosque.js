import React from 'react';
import Update from '../Update/UpdateMosque';
import { useParams } from 'react-router-dom';

const SignedInMosque = () => {
  const { email } = useParams();
  return (
    <div>
      <Update email={email}></Update>
    </div>
  );
};

export default SignedInMosque;
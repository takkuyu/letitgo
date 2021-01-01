import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './WithSpinner.styles';

const Spinner = ({ loadingText, filled }) => (
  <SpinnerOverlay>
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;

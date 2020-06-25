import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// const WithSpinner = WrappedComponent => {
//   const Spinner = ({ isLoading, ...otherProps }) => {
//     // console.log('spinner')
//     // console.log(isLoading)
//     return isLoading ? (
//       <SpinnerOverlay>
//         <SpinnerContainer />
//       </SpinnerOverlay>
//     ) : (
//       <WrappedComponent {...otherProps} />
//     );
//   };
//   return Spinner;
// };

// export default WithSpinner;

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
      <WrappedComponent {...otherProps} />
    );
};

export default WithSpinner;
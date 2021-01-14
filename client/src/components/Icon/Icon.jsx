import React from 'react';
import { StyledIcon } from './Icon.style';

const defaultProps = {
  iconClassCode: undefined,
  size: 16,
  left: 0,
  top: 0,
  mr: 0,
};

const Icon = ({ iconClassCode, ...props }) => (
  <StyledIcon className={iconClassCode} {...props} />
);

Icon.defaultProps = defaultProps;

export default Icon;

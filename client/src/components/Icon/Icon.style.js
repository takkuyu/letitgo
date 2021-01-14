import styled from 'styled-components';

export const StyledIcon = styled.i`
  display: inline-block;
  font-size: ${(props) => `${props.size}px`};
  margin-right: ${(props) => `${props.mr}px`};
  line-height: 1;
  ${(props) =>
    props.left || props.top
      ? `transform: translate(${props.left}px, ${props.top}px);`
      : ''}

  &:before {
    speak: none;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

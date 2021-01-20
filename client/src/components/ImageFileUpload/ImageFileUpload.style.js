import styled from 'styled-components';

export const Container = styled.div`
  input[type='file'] {
    display: none;
  }

  .inner-container {
    position: relative;
  }
`;

export const Label = styled.label`
  color: ${(props) => (props.isLoading ? '#bababa' : '#5E6C84')};
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  border-radius: 0.25rem;
  padding: 10px 12px;
  background: #f5f5f6;
  border: 1px solid #e2e2e2;
  margin-bottom: 0;

  & > i {
    margin-right: 4px;
  }

  &:hover {
    background-color: rgb(240 240 245);
  }
`;

export const Description = styled.p`
  font-weight: 500;
  margin-top: 5px;
  font-size: 12px;
  color: '#8993a4';
`;

export const Spinner = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 14px;

  & > img {
    vertical-align: middle;
  }
`;

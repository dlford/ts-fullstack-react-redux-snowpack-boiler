import styled from '@emotion/styled';

export default styled.button`
  background-color: #61dafb;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    color: #ccc;
    background-color: #23758c;
    cursor: not-allowed;
  }
`;

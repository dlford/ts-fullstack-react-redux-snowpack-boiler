import { css } from '@emotion/react';

export default css`
  body {
    padding: 1rem;
    margin: 0;
    width: 100vw;
    max-width: calc(100% - 2rem);
    min-height: calc(100vh - 2rem);
    height: 100%;
    background-color: #232c34;
    color: #eee;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
  }
`;

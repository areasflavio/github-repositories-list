import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  margin: 64px auto;
  padding: 32px;
  border-radius: 8px;

  background: #f0f6fc;

  h1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: bold;
    color: #0d1117;

    margin-bottom: 16px;

    svg {
      margin-bottom: 8px;
    }
  }
`;

export default Container;

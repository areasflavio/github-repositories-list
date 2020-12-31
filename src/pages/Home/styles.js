import styled from 'styled-components';

export const Container = styled.div`
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

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    flex: 1;
    margin-right: 4px;
    padding: 0 4px;

    height: 32px;
    border: 1px solid #0d1117;
    border-radius: 4px;
  }
`;

export const FormButton = styled.button`
  height: 32px;
  width: 32px;
  border: none;
  background: #0d1117;
  border-radius: 4px;

  transition: background 0.2s;

  &:hover {
    background: #4aec5f;
  }
`;

export const List = styled.ul`
  margin: 16px 0;

  list-style: none;

  li {
    padding: 8px 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #0d1117;
    }

    a {
      text-decoration: none;
      color: #0d1117;
      font-weight: bold;

      transition: all 0.4s;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

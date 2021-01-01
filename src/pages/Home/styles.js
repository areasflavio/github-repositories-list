import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {

    transform: rotate(360deg);
  }
`;

export const FormButton = styled.button`
  height: 32px;
  width: 32px;
  border: none;
  background: #0d1117;
  border-radius: 4px;

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 1s linear infinite;
      }
    `}
`;

export const Input = styled.input`
  flex: 1;
  margin-right: 4px;
  padding: 0 4px;

  height: 32px;
  border: ${(props) => (props.error ? '1px solid red' : '1px solid #0d1117')};
  border-radius: 4px;

  background: #f0f6fc;
`;

export const ErrorLabel = styled.small`
  color: red;
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
      border-top: 1px solid #999;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;

      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      color: #0d1117;

      transition: all 0.2s;

      &:hover {
        color: #4aec5f;
      }

      img {
        height: 24px;
        width: 24px;
        border-radius: 50%;

        margin-right: 8px;
      }
    }

    svg {
      color: #999;

      transition: all 0.2s;

      & :hover {
        color: #ff051588;
        cursor: pointer;
      }
    }
  }
`;

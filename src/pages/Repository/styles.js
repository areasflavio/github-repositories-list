import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 64px auto;

  color: #f0f6fc;

  svg {
    animation: ${rotate} 1s linear infinite;
  }

  h1 {
    margin-top: 16px;
    font-size: 32px;
  }
`;

export const InfoHeader = styled.header`
  padding-bottom: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #0d1117;

  img {
    width: 128px;
    height: 128px;
    border-radius: 50%;

    margin-bottom: 8px;
  }

  a {
    text-decoration: none;
    font-size: 32px;
    font-weight: bold;
    color: #0d1117;

    transition: all 0.2s;

    &:hover {
      color: #4aec5f;
    }
  }

  p {
    color: #0d1117;
    font-size: 14px;

    margin-top: 4px;
  }

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 100%;
    margin-top: 4px;

    span {
      background: #0d1117;
      color: #f0f6fc;

      display: flex;
      justify-content: space-evenly;
      align-items: center;

      height: 24px;
      width: 100%;

      margin: 16px;
      border-radius: 4px;
    }
  }
`;

export const ButtonGroup = styled.div`
  padding: 8px 0;

  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    width: 100%;
    height: 32px;
    border-radius: 4px;

    margin: 0 4px;

    border: none;
    color: #f0f6fc;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background: ${(props) => (props.active ? '#0d1117' : '#999')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};

  cursor: ${(props) => (props.disable ? 'not-allowed' : 'pointer')};
`;

export const IssuesList = styled.ul`
  padding: 8px 0;
  list-style: none;

  li {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 8px;
    margin-bottom: 8px;

    border: 1px solid #0d1117;
    border-radius: 4px;

    transition: all 0.2s;

    &:hover {
      box-shadow: 1px 1px 5px #0d1117;
    }

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;

      margin-right: 8px;
    }

    a {
      text-decoration: none;
      color: #0d1117;

      svg {
        color: #0d1117;

        transition: all 0.2s;

        &:hover {
          color: #4aec5f;
        }
      }
    }
  }
`;

export const IssueInfo = styled.div`
  flex: 1;

  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const LabelsDiv = styled.div`
  display: flex;
  flex-direction: row;
  /* flex: 1; */

  padding-top: 8px;
`;

export const Label = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2px 4px;
  border-radius: 8px;
  margin: 1px;

  font-size: 10px;
  font-weight: bold;
`;

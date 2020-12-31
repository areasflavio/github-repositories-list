import styled from 'styled-components';

export const Loading = styled.div``;

export const InfoHeader = styled.header`
  padding-bottom: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 128px;
    height: 128px;
    border-radius: 50%;

    margin-bottom: 8px;
  }
`;

export const ButtonGroup = styled.div`
  padding: 8px 0;
  border-top: 1px solid #0d1117;
  border-bottom: 1px solid #0d1117;

  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    width: 100%;
    height: 32px;
    border-radius: 4px;

    margin: 0 4px;

    background: #0d1117;
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

export const IssuesList = styled.ul`
  padding: 8px 0;
  list-style: none;

  li {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 8px 0;
    margin-bottom: 8px;

    & + li {
      border-top: 1px solid #0d1117;
    }

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;

      margin-right: 8px;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex: 1;
    }

    a {
      text-decoration: none;
      color: #0d1117;
    }
  }
`;

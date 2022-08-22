import React from 'react';
import styled from 'styled-components';
import TerminalTitleBar from './TerminalTitleBar';
import { StyledTerminal } from './style';
import { Link } from "react-router-dom"

const StyledAuthenticatedUser = styled.div`
  .terminalTitle {
    font-size: 16px;
    font-weight: bold;
    text-align:left;
  }
`;

const AuthenticatedUser = ({ user }) => {
  return (
    <StyledAuthenticatedUser>
      <p className="pageTitle">Welcome <br /><b>{user.displayName}</b></p>
      <StyledTerminal>
        <TerminalTitleBar />
        <div className="cont">
          <pre className="terminalTitle">
            Personal{' '}
            {user.provider[0].toUpperCase() + user.provider.substring(1)}{' '}
            Account Information
          </pre>
          {Object.keys(user).map((key, index) => {
            return (key !== 'image' ?
              <pre key={index}>
                <b>{key}</b>: {user[key]}
              </pre> : null
            );
          })}
          <pre></pre>

        </div>
      </StyledTerminal>
      <h2>Some random scenes</h2>
      <p>these are hard coded, just for a quick showcase</p>
      <Link to='/lulaby-city-scene' style={{ textAlign: 'left', fontWeight: 'bold', textDecoration: 'underline dotted 3px' }}>Lulaby City</Link>
    </StyledAuthenticatedUser>
  );
};

export default AuthenticatedUser;

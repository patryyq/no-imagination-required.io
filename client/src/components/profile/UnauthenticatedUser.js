import React from 'react';
import styled from 'styled-components';
import Link from '@mui/material/Link';
import TerminalTitleBar from './TerminalTitleBar';
import { StyledTerminal } from './style';

const StyledUnauthenticatedUser = styled.div``;

const UnauthenticatedUser = () => {
  return (
    <StyledUnauthenticatedUser>
      <p className="pageTitle"> Error 403: Forbidden</p>
      <StyledTerminal>
        <TerminalTitleBar />
        <div className="content">
          <pre>
            No auth. Try again.
          </pre>
        </div>
      </StyledTerminal>
      <Link txt={'Return Home'} color={'#ffffff'} href={'/'} />
    </StyledUnauthenticatedUser>
  );
};

export default UnauthenticatedUser;

import React, { useContext } from 'react';
import UserProvider from '../contexts/UserProvider';
import styled from 'styled-components';
import AuthenticatedUser from './AuthenticatedUser';
import UnauthenticatedUser from './UnauthenticatedUser';
import Layout from '../Layout'
import SignInButtons from '../utils/SignInButtons'

const StyledDashboard = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  text-align: center;

  .pageTitle {
    font-weight: 400;
    font-size: 35px;
  }
`;

const Profile = () => {
  const userData = useContext(UserProvider.Context);
  return (
    <Layout>
      <StyledDashboard>
        {userData ? (
          <AuthenticatedUser user={userData} />
        ) : (
          <SignInButtons />
        )}
      </StyledDashboard>
    </Layout>
  );
};

export default Profile;

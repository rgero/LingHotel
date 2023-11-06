/* eslint-disable react/prop-types */

import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/hooks/useUser"

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const {isLoading, isAuthenicated, fetchStatus} = useUser();

  useEffect( ()=> {
    if (!isAuthenicated && !isLoading && fetchStatus !== "fetching")
    {
      navigate('/login');
    }
  }, [isAuthenicated, isLoading, fetchStatus, navigate])

  if (isLoading) return (
    <FullPage>
      <Spinner />
    </FullPage>
  );

  if (isAuthenicated) return children;
}

export default ProtectedRoute

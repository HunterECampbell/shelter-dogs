import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useDogsStore } from "../stores/dogs";
import { SearchDogsQueryParams } from "../stores/types/apiTypes";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../components/Header";

const AvailableDogsPage = () => {
  const { api, setDogPagination, setDogs } = useDogsStore();

  const [isLoading, setIsLoading] = useState(false);

  const fetchDogs = useCallback(
    async (searchPayload?: SearchDogsQueryParams) => {
      try {
        setIsLoading(true);

        const paginationResult = await api.searchDogs(searchPayload);
        await setDogPagination(paginationResult);

        const dogsResult = await api.getDogsFromIDs(paginationResult.resultIds);
        await setDogs(dogsResult);
      } finally {
        setIsLoading(false);
      }
    },
    // This function is used outside of the useEffect and must be run only once in useEffect. Disabling next line for that reason.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return (
    <MainWrapper>
      <Header showLogoutButton={true} />

      <Backdrop open={isLoading}>
        <CircularProgress color="pugTan" />
      </Backdrop>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default AvailableDogsPage;

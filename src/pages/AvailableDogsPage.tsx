import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useDogsStore } from "../stores/dogs";
import { SearchDogsQueryParams } from "../stores/types/apiTypes";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DogCard from "../components/DogCard";
import Header from "../components/Header";

const AvailableDogsPage = () => {
  const { api, setDogPagination, setDogs, dogs } = useDogsStore();

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

      <DogsArea>
        {dogs.map((dogData) => (
          <DogCard key={dogData.id} dogData={dogData} />
        ))}
      </DogsArea>

      <Backdrop open={isLoading}>
        <CircularProgress color="pugTan" />
      </Backdrop>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  // display: flex;
  // flex-direction: column;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`;

const DogsArea = styled.div`
  --header-height: 64px;

  margin-top: var(--header-height);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
  overflow-y: auto;
  padding: 24px 0;
`;

export default AvailableDogsPage;

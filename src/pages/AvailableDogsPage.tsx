import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { useDogsStore } from "../stores/dogs";

import Header from "../components/Header";
import { SearchDogsQueryParams } from "../stores/types/apiTypes";

const AvailableDogsPage = () => {
  const { api, setDogPagination, setDogs } = useDogsStore();

  const fetchDogs = useCallback(
    async (searchPayload?: SearchDogsQueryParams) => {
      const paginationResult = await api.searchDogs(searchPayload);
      await setDogPagination(paginationResult);

      const dogsResult = await api.getDogsFromIDs(paginationResult.resultIds);
      await setDogs(dogsResult);
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
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default AvailableDogsPage;

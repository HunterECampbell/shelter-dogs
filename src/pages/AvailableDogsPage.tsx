import styled, { css, keyframes } from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useDogsStore } from "../stores/dogs";
import { SearchDogsQueryParams } from "../stores/types/apiTypes";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DogCard from "../components/DogCard";
import GeneralPugBackground from "../components/GeneralPugBackground";
import Header from "../components/Header";

const AvailableDogsPage = () => {
  const {
    api,
    dogs,
    setAllBreeds,
    setDogLocations,
    setDogPagination,
    setDogs,
  } = useDogsStore();

  const [isLoading, setIsLoading] = useState(false);

  const fetchDogs = useCallback(
    async (searchPayload?: SearchDogsQueryParams) => {
      try {
        setIsLoading(true);

        const paginationResult = await api.searchDogs(searchPayload);
        await setDogPagination(paginationResult);

        const dogsResult = await api.getDogsFromIDs(paginationResult.resultIds);
        await setDogs(dogsResult);

        const dogLocationsResult = await api.getLocationsFromDogZipCodes();
        await setDogLocations(dogLocationsResult);
      } finally {
        setIsLoading(false);
      }
    },
    // This function is used outside of the useEffect and must be run only once in useEffect. Disabling next line for that reason.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getAllBreeds = useCallback(async () => {
    try {
      setIsLoading(true);

      const allBreeds = await api.getAllBreeds();
      setAllBreeds(allBreeds);
    } finally {
      setIsLoading(false);
    }
  }, [api, setAllBreeds]);

  useEffect(() => {
    getAllBreeds();
    fetchDogs();
  }, [getAllBreeds, fetchDogs]);

  const calculateNumCols = () => {
    const dogCardSize = 275;
    const gap = 24;
    const padding = 24 * 2;
    const containerWidth = window.innerWidth - padding;
    const numCols = Math.floor(containerWidth / (dogCardSize + gap));
    return numCols;
  };

  const [numCols, setNumCols] = useState(calculateNumCols());

  useEffect(() => {
    const handleResize = () => setNumCols(calculateNumCols());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MainWrapper>
      <GeneralPugBackground />

      <Header showLogoutButton={true} />

      <DogsArea $numCols={numCols} $numItems={dogs.length}>
        {dogs.map((dogData, index) => {
          const row = Math.floor(index / numCols);
          const col = index % numCols;
          const delayIndex = row + col + 1;
          return (
            <DogCard
              key={dogData.id}
              dogData={dogData}
              className={`d-${delayIndex}`}
            />
          );
        })}
      </DogsArea>

      <Backdrop open={isLoading}>
        <CircularProgress color="pugTan" />
      </Backdrop>
    </MainWrapper>
  );
};

const generateAnimationDelays = ({
  numCols,
  numItems,
}: {
  numCols: number;
  numItems: number;
}) => {
  const rows = Math.ceil(numItems / numCols);
  let styles = "";

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < numCols; col++) {
      const delayIndex = row * numCols + col + 1;
      styles += `
        &.d-${delayIndex} {
          animation-delay: ${delayIndex * 100}ms;
        }
      `;
    }
  }

  return css`
    ${styles}
  `;
};

const mosaicRipple = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  60%, 100% {
    transform: scale(1);
  }
`;

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
`;

const DogsArea = styled.div<{
  $numCols: number;
  $numItems: number;
}>`
  --header-height: 64px;

  margin-top: var(--header-height);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
  overflow-y: auto;
  padding: 24px 0;

  & > div {
    animation: ${mosaicRipple} 1.5s ease;
    ${(props) =>
      generateAnimationDelays({
        numCols: props.$numCols,
        numItems: props.$numItems,
      })}
  }
`;

export default AvailableDogsPage;

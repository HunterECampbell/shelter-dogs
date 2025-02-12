import styled, { css, keyframes } from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useDogsStore } from "../stores/dogs";
import { PageOptions, SearchDogsQueryParams } from "../stores/types/apiTypes";
import { useTranslation } from "react-i18next";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DogCard from "../components/DogCard";
import FindFavoritesDescription from "../components/FindFavoritesDescription";
import GeneralPugBackground from "../components/GeneralPugBackground";
import Header from "../components/Header";
import TablePagination from "@mui/material/TablePagination";

const AvailableDogsPage = () => {
  const {
    api,
    dogPagination,
    dogs,
    setAllBreeds,
    setDogLocations,
    setDogPagination,
    setDogs,
  } = useDogsStore();
  const { t } = useTranslation();

  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [from, setFrom] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const fetchDogs = useCallback(
    async ({
      pageOption,
      queryParams,
    }: {
      pageOption?: PageOptions;
      queryParams?: SearchDogsQueryParams;
    }) => {
      try {
        setIsLoading(true);

        const paginationResult = await api.searchDogs({
          pageOption,
          queryParams,
        });
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
    fetchDogs({});
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

  const handleChangePage = async (_: React.MouseEvent | null, page: number) => {
    const pageOption: PageOptions =
      currentPageNum < page ? PageOptions.Next : PageOptions.Previous;
    const newFrom = getFromWithMinMax(Math.round(page * itemsPerPage));

    setCurrentPageNum(getPageWithMinMax(page));
    setFrom(newFrom);
    await fetchDogs({
      pageOption,
      queryParams: { size: itemsPerPage, from: newFrom },
    });
  };
  const handleChangeItemsPerPage = async (event: React.ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    const newItemsPerPage: number = Number(target.value);
    const newFrom = getFromWithMinMax(
      Math.floor(itemsPerPage * currentPageNum)
    );

    setFrom(newFrom);
    setCurrentPageNum(newFrom / newItemsPerPage);
    setItemsPerPage(newItemsPerPage);
    await fetchDogs({
      queryParams: {
        size: newItemsPerPage,
        from: newFrom,
      },
    });
  };
  const getFromWithMinMax = (newFrom: number): number => {
    if (newFrom > dogPagination.total) return dogPagination.total;
    if (newFrom < 0) return 0;

    return Math.floor(newFrom);
  };
  const getPageWithMinMax = (newPage: number): number => {
    if (newPage > dogPagination.total) return dogPagination.total;
    if (newPage < 0) return 0;

    return Math.floor(newPage);
  };
  const getToWithMinMax = (newTo: number): number => {
    if (newTo > dogPagination.total) return dogPagination.total;
    if (newTo < 0) return 0;
    if (newTo < itemsPerPage) return itemsPerPage;

    return Math.floor(newTo);
  };

  return (
    <MainWrapper>
      <GeneralPugBackground />

      <Header showLogoutButton={true} />

      <DogsArea $numCols={numCols} $numItems={dogs.length}>
        <FindFavoritesDescription />

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

      <PaginationWrapper>
        <TablePagination
          sx={{ backgroundColor: "pugTan.main" }}
          component="div"
          count={dogPagination.total}
          labelDisplayedRows={() =>
            `${from}-${getToWithMinMax(from + itemsPerPage)} ${t(
              "dashboard.pagination.of"
            )} ${dogPagination.total}`
          }
          labelRowsPerPage={t("dashboard.pagination.items_per_page")}
          page={currentPageNum}
          rowsPerPage={itemsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeItemsPerPage}
        />
      </PaginationWrapper>

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
    opacity: 0;
  }
  30% {
    transform: scale(1.05);
    opacity: 1;
  }
  60%, 100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DogsArea = styled.div<{
  $numCols: number;
  $numItems: number;
}>`
  --header-height: 64px;

  flex-grow: 1;
  margin-top: var(--header-height);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
  overflow-y: auto;
  padding: 24px 0;

  & > div:not(:first-child) {
    opacity: 0;
    animation: ${mosaicRipple} 1s ease forwards;
    ${(props) =>
      generateAnimationDelays({
        numCols: props.$numCols,
        numItems: props.$numItems,
      })}
  }
`;

const PaginationWrapper = styled.div`
  display: fixed;
  bottom: 0;
`;

export default AvailableDogsPage;

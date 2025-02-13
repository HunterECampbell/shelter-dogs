import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import React, { useCallback, useEffect, useState } from "react";
import { useDogsStore } from "../../stores/dogs";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AgeRangeSlider from "./AgeRangeSlider";
import Autocomplete from "@mui/material/Autocomplete";
import CustomButton from "../generalComponents/CustomButton";
import DogSorter from "./DogSorter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextField from "@mui/material/TextField";

const DogFilterAccordion = () => {
  const {
    allBreeds,
    api,
    filterQueryParams,
    setAllBreeds,
    setDogLocations,
    setDogPagination,
    setDogs,
    setFilterQueryParams,
  } = useDogsStore();
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBreeds = useCallback(async () => {
    const allBreeds = await api.getAllBreeds();
    setAllBreeds(allBreeds);
  }, [api, setAllBreeds]);

  useEffect(() => {
    getAllBreeds();
  }, [getAllBreeds]);

  const applyFilters = async () => {
    try {
      setIsLoading(true);
      setExpanded(false);

      const paginationResult = await api.searchDogs({
        queryParams: filterQueryParams,
      });
      await setDogPagination(paginationResult);

      const dogsResult = await api.getDogsFromIDs(paginationResult.resultIds);
      await setDogs(dogsResult);

      const dogLocationsResult = await api.getLocationsFromDogZipCodes();
      await setDogLocations(dogLocationsResult);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBreedSelection = (_: React.SyntheticEvent, value: unknown) => {
    if (!value) setFilterQueryParams({ breeds: [] });
    else setFilterQueryParams({ breeds: value as string[] });
  };
  const handleExpansion = (_: React.SyntheticEvent, expanded: boolean) => {
    setExpanded(expanded);
  };
  const handleZipCodeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQueryParams({ zipCodes: [event.target.value] });
  };

  return (
    <StyledAccordion expanded={expanded} onChange={handleExpansion}>
      <StyledAccordionSummary>
        <StyledFilterIcon />
        <FilterText>{t("dashboard.filtering.labels.filter")}</FilterText>
      </StyledAccordionSummary>
      <StyledAccordionDetails $expanded={expanded}>
        <DogSorter />

        <InputWrapper>
          <StyledAutocomplete
            blurOnSelect
            clearOnEscape
            multiple
            options={allBreeds}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("dashboard.filtering.labels.breed")}
              />
            )}
            onChange={handleBreedSelection}
          />
          <StyledTextField
            label={t("dashboard.filtering.labels.zip_code")}
            type="number"
            onChange={handleZipCodeValue}
          />
        </InputWrapper>

        <AgeRangeSlider />
      </StyledAccordionDetails>

      <FooterButtonArea>
        <CustomButton
          label={t("dashboard.filtering.buttons.apply_filters")}
          loading={isLoading}
          onClick={applyFilters}
        />
      </FooterButtonArea>
    </StyledAccordion>
  );
};

const StyledAccordion = muiStyled(Accordion)`
  max-height: 100%;
  width: fit-content;
  padding: 0 8px;
  background: var(--pug-tan);
  overflow: auto;
`;

const StyledAccordionSummary = muiStyled(AccordionSummary)`
  width: inherit;
`;

const StyledAccordionDetailsBefore = muiStyled(AccordionDetails)``;
const StyledAccordionDetails = styled(StyledAccordionDetailsBefore)<{
  $expanded: boolean;
}>`
  width: ${(props) => (props.$expanded ? "100vw" : "0")};
  display: flex;
  gap: 24px;
`;

const StyledFilterIcon = muiStyled(FilterAltIcon)`
  color: var(--pug-nearly-dark);
`;

const FilterText = styled.p`
  font-size: calc(18 / 16 * 1rem);
  font-weight: bold;
  margin-left: 8px;
  margin-top: 3px;
  color: var(--pug-nearly-dark);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: flex-end;
`;

const StyledAutocomplete = muiStyled(Autocomplete)`
  width: 275px;
    border-color: var(--pug-nearly-dark);

  * {
    border-color: var(--pug-nearly-dark);
    color: var(--pug-nearly-dark);
  }
`;

const StyledTextField = muiStyled(TextField)`
  width: 275px;

  * {
    border-color: var(--pug-nearly-dark);
    color: var(--pug-nearly-dark);
  }
`;

const FooterButtonArea = styled.div`
  height: 64px;
  margin-top: 8px;
`;

export default DogFilterAccordion;

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDogsStore } from "../../stores/dogs";
import {
  SearchDogsSortDirection,
  SearchDogsSortField,
} from "../../stores/types/apiTypes";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const DogSorter = () => {
  const { t } = useTranslation();
  const { getSortText, setFilterQueryParams } = useDogsStore();

  const [sortDirection, setSortDirection] = useState<SearchDogsSortDirection>(
    SearchDogsSortDirection.Ascending
  );
  const [sortOption, setSortOption] = useState<SearchDogsSortField>(
    SearchDogsSortField.Breed
  );

  const handleSortDirectionChange = (
    _: React.MouseEvent,
    value: SearchDogsSortDirection
  ) => {
    if (value !== null) {
      setSortDirection(value);
      setFilterQueryParams({
        sort: getSortText({ sortOption, sortDirection: value }),
        from: 0,
      });
    }
  };
  const handleSortOptionChange = (
    _: React.MouseEvent,
    value: SearchDogsSortField
  ) => {
    if (value !== null) {
      setSortOption(value);
      setFilterQueryParams({
        sort: getSortText({ sortOption: value, sortDirection }),
        from: 0,
      });
    }
  };

  return (
    <SortWrapper>
      <SortHeader>{t("dashboard.filtering.labels.sort")}</SortHeader>

      <SortOptionsWrapper>
        <SortOptionsButtonGroup
          exclusive
          fullWidth
          value={sortOption}
          onChange={handleSortOptionChange}
        >
          <StyledToggleButton value={SearchDogsSortField.Breed}>
            {t("dashboard.filtering.labels.breed")}
          </StyledToggleButton>
          <StyledToggleButton value={SearchDogsSortField.Name}>
            {t("dashboard.filtering.labels.name")}
          </StyledToggleButton>
          <StyledToggleButton value={SearchDogsSortField.Age}>
            {t("dashboard.filtering.labels.age")}
          </StyledToggleButton>
        </SortOptionsButtonGroup>

        <SortDirectionButtonGroup
          exclusive
          fullWidth
          value={sortDirection}
          onChange={handleSortDirectionChange}
        >
          <StyledToggleButton value={SearchDogsSortDirection.Ascending}>
            {t("dashboard.filtering.labels.ascending")}
          </StyledToggleButton>
          <StyledToggleButton value={SearchDogsSortDirection.Descending}>
            {t("dashboard.filtering.labels.descending")}
          </StyledToggleButton>
        </SortDirectionButtonGroup>
      </SortOptionsWrapper>
    </SortWrapper>
  );
};

const SortWrapper = styled.div`
  width: 275px;
`;

const SortHeader = styled.p`
  font-size: calc(20 / 16 * 1rem);
  font-weight: bold;
  color: var(--pug-nearly-dark);
  text-align: center;
`;

const SortOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const SortOptionsButtonGroup = muiStyled(ToggleButtonGroup)`
  .Mui-selected {
    background-color: var(--cream) !important;
  }
`;

const SortDirectionButtonGroup = muiStyled(ToggleButtonGroup)`
  margin-top: 8px;

  .Mui-selected {
    background-color: var(--cream) !important;
  }
`;

const StyledToggleButton = muiStyled(ToggleButton)`
  font-weight: bold;
  color: var(--pug-nearly-dark);
  border-color: var(--pug-nearly-dark);
`;

export default DogSorter;

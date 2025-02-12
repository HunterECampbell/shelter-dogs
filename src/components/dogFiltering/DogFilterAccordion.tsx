import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import React, { useCallback, useEffect, useState } from "react";
import { useDogsStore } from "../../stores/dogs";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import DogSorter from "./DogSorter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const DogFilterAccordion = () => {
  const { allBreeds, api, setAllBreeds } = useDogsStore();
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(true);

  const getAllBreeds = useCallback(async () => {
    const allBreeds = await api.getAllBreeds();
    setAllBreeds(allBreeds);
  }, [api, setAllBreeds]);

  useEffect(() => {
    getAllBreeds();
  }, [getAllBreeds]);

  const handleExpansion = (_: React.SyntheticEvent, expanded: boolean) => {
    setExpanded(expanded);
  };

  return (
    <StyledAccordion expanded={expanded} onChange={handleExpansion}>
      <StyledAccordionSummary>
        <StyledFilterIcon />
        <FilterText>{t("dashboard.filtering.labels.filter")}</FilterText>
      </StyledAccordionSummary>
      <StyledAccordionDetails $expanded={expanded}>
        <DogSorter />
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

const StyledAccordion = muiStyled(Accordion)`
  width: fit-content;
  padding: 0 8px;
  background: var(--pug-tan);
`;

const StyledAccordionSummary = muiStyled(AccordionSummary)`
  width: inherit;
`;

const StyledAccordionDetailsBefore = muiStyled(AccordionDetails)``;
const StyledAccordionDetails = styled(StyledAccordionDetailsBefore)<{
  $expanded: boolean;
}>`
  width: ${(props) => (props.$expanded ? "100vw" : "0")};
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

export default DogFilterAccordion;

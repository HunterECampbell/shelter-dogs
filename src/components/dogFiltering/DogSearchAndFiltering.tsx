import styled from "styled-components";

import DogFilterAccordion from "./DogFilterAccordion";

const DogSearchAndFiltering = () => {
  return (
    <FilterAndSearchWrapper>
      <AccordionWrapper>
        <DogFilterAccordion />
      </AccordionWrapper>

      <SearchWrapper>zxcv</SearchWrapper>
    </FilterAndSearchWrapper>
  );
};

const FilterAndSearchWrapper = styled.div`
  --header-height: 64px;

  margin-top: var(--header-height);
`;

const AccordionWrapper = styled.div``;

const SearchWrapper = styled.div``;

export default DogSearchAndFiltering;

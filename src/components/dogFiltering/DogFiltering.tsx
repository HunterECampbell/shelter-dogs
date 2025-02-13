import styled from "styled-components";

import DogFilterAccordion from "./DogFilterAccordion";

const DogFiltering = () => {
  return (
    <FilterAndSearchWrapper>
      <AccordionWrapper>
        <DogFilterAccordion />
      </AccordionWrapper>
    </FilterAndSearchWrapper>
  );
};

const FilterAndSearchWrapper = styled.div`
  --header-height: 64px;

  margin-top: var(--header-height);
`;

const AccordionWrapper = styled.div``;

export default DogFiltering;

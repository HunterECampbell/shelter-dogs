import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDogsStore } from "../../stores/dogs";

import Slider from "@mui/material/Slider";

const AgeRangeSlider = () => {
  const { setFilterQueryParams } = useDogsStore();
  const { t } = useTranslation();

  const [ageRange, setAgeRange] = useState<[number, number]>([0, 20]);

  const handleAgeRangeUpdate = (_: Event, value: number | number[]) => {
    if (!Array.isArray(value)) {
      return;
    }

    setAgeRange(value as [number, number]);
    setFilterQueryParams({ ageMin: value[0], ageMax: value[1] });
  };

  return (
    <SliderWrapper>
      <StyledSlider
        disableSwap
        min={0}
        max={20}
        value={ageRange}
        valueLabelDisplay="on"
        onChange={handleAgeRangeUpdate}
      />
      <SliderHeader>{t("dashboard.filtering.labels.age_range")}</SliderHeader>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  width: 275px;
  align-self: flex-end;

  .MuiSlider-valueLabel {
    background-color: var(--pug-nearly-dark);
  }
`;

const SliderHeader = styled.p`
  font-size: calc(20 / 16 * 1rem);
  font-weight: bold;
  color: var(--pug-nearly-dark);
  text-align: center;
`;

const StyledSlider = muiStyled(Slider)``;

export default AgeRangeSlider;

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import Card from "@mui/material/Card";

const NoItems = () => {
  const { t } = useTranslation();

  return (
    <NoItemsWrapper>
      <CardWrapper>
        <CardText>{t("dashboard.no_items")}</CardText>
      </CardWrapper>
    </NoItemsWrapper>
  );
};

const NoItemsWrapper = styled.div`
  --size: 100%;

  height: var(--size);
  width: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = muiStyled(Card)`
  background-color: var(--pug-tan);
  padding: 16px 32px;
  width: fit-content;
  max-width: 275px;
`;

const CardText = styled.p`
  font-size: calc(28 / 16 * 1rem);
`;

export default NoItems;

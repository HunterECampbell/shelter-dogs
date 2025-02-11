import styled, { css, keyframes } from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dog } from "../globalTypes";
import { useDogsStore } from "../stores/dogs";

import Box from "@mui/material/Box";
import CustomButton from "./generalComponents/CustomButton";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PetsIcon from "@mui/icons-material/Pets";

const DogCard = ({ dogData }: { dogData: Dog }) => {
  const { t } = useTranslation();
  const {
    addFavoriteDog,
    checkIfDogIsFavorite,
    removeFavoriteDog,
    retrieveLocationForZipCode,
  } = useDogsStore();

  const isFavorite = useRef(checkIfDogIsFavorite(dogData.id));

  const getLocationString = (): string => {
    const location = retrieveLocationForZipCode(dogData.zip_code);

    if (typeof location === "string") return location;
    return `${location.city}, ${location.state} ${location.zip_code}`;
  };
  const updateFavorite = () => {
    if (isFavorite.current) removeFavoriteDog(dogData.id);
    else addFavoriteDog(dogData);

    isFavorite.current = checkIfDogIsFavorite(dogData.id);
  };

  const MemoizedCardFront = React.memo(() => (
    <CardFront>
      <DogImage src={dogData.img} alt={dogData.name} />
      <NameArea>
        <DogName>{dogData.name}</DogName>
      </NameArea>
      {isFavorite.current && <StyledFavoriteIcon fontSize="large" />}
    </CardFront>
  ));

  return (
    <DogCardArea $isFavorite={isFavorite.current}>
      <FlipWrapper sx={{ boxShadow: 5 }} $isFavorite={isFavorite.current}>
        <MemoizedCardFront />

        <CardBack>
          <DogNameBack>{dogData.name}</DogNameBack>

          <Divider sx={{ borderBottomWidth: 2 }} />

          <DetailsArea>
            <ItemArea>
              <PetsIcon
                color="secondary"
                sx={{ fontSize: "calc(40 / 16 * 1rem)" }}
              />
              <ItemDetailsArea>
                <ItemDetailLabel>
                  {t("dashboard.dog_card.labels.breed")}
                </ItemDetailLabel>
                <ItemDetailValue>{dogData.breed}</ItemDetailValue>
              </ItemDetailsArea>
            </ItemArea>

            <ItemArea>
              <FmdGoodIcon
                color="secondary"
                sx={{ fontSize: "calc(40 / 16 * 1rem)" }}
              />
              <ItemDetailsArea>
                <ItemDetailLabel>
                  {t("dashboard.dog_card.labels.location")}
                </ItemDetailLabel>
                <ItemDetailValue>{getLocationString()}</ItemDetailValue>
              </ItemDetailsArea>
            </ItemArea>
          </DetailsArea>

          <FavoriteButtonArea>
            <CustomButton
              label={
                isFavorite.current
                  ? t("dashboard.dog_card.buttons.unfavorite")
                  : t("dashboard.dog_card.buttons.favorite")
              }
              onClick={updateFavorite}
            />
          </FavoriteButtonArea>
        </CardBack>
      </FlipWrapper>
    </DogCardArea>
  );
};

const quickGrowShrink = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  80% {
    transform: scale(1);
  }
  90% {
  transform: scale(1.015);
  }
  100% {
    transform: scale(1);
  }
`;

const DogCardAreaBefore = muiStyled(Box)`
  --size: 275px;

  height: var(--size);
  max-height: var(--size);
  width: var(--size);
  max-width: var(--size);
  padding: 0;
  perspective: 1000px;
  background: transparent;
  cursor: pointer;

  &:hover > div {
    transform: rotateY(-180deg);
  }
`;
const DogCardArea = styled(DogCardAreaBefore)<{ $isFavorite: boolean }>`
  ${(props) =>
    props.$isFavorite &&
    css`
      animation: ${quickGrowShrink} 0.3s ease-in-out;
    `}
`;

const FlipWrapperBefore = muiStyled(Box)`
  --size: 100%;

  position: relative;
  width: var(--size);
  height: var(--size);
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 16px;
`;
const FlipWrapper = styled(FlipWrapperBefore)<{ $isFavorite: boolean }>`
  & > div {
    ${(props) =>
      props.$isFavorite
        ? css`
            box-shadow: 0px 0px 16px 4px var(--cream),
              0px 0px 24px 4px rgba(230, 206, 67, 0.9),
              0px 0px 32px 8px rgba(204, 176, 30, 0.9), 0px 0px 32px 24px white;
          `
        : css`
            transition: box-shadow 0.3s ease-in-out;
          `}
  }
`;

const FlipSide = styled.div`
  --size: 100%;

  position: absolute;
  width: var(--size);
  height: var(--size);
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 16px;
`;

const CardFront = styled(FlipSide)`
  --size: 100%;

  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DogImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 16px;
`;

const StyledFavoriteIcon = muiStyled(FavoriteIcon)`
    color: var(--pug-medium-dark);
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--cream);
    border-radius: 50%;
    padding: 3px;
    opacity: 0.9;
`;

const NameArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 75%;
  background: var(--pug-nearly-dark);
  opacity: 0.8;
  padding: 8px 16px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 16px;
`;

const TruncatedText = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const DogName = styled(TruncatedText)`
  font-size: calc(24 / 16 * 1rem);
  color: white;
  font-weight: bold;
`;

const DogNameBack = styled(DogName)`
  color: var(--pug-dark);
  padding: 16px;
`;

const CardBack = styled(FlipSide)`
  transform: rotateY(-180deg);
  background: var(--pug-tan);
  position: relative;
  display: flex;
  flex-direction: column;
`;

const DetailsArea = styled.div`
  flex-grow: 1;
`;

const ItemArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  padding-bottom: 0;
`;

const ItemDetailsArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 16px;
`;

const ItemDetailLabel = styled(TruncatedText)`
  color: var(--pug-medium-dark);
  text-align: left !important;
`;

const ItemDetailValue = styled(TruncatedText)`
  color: var(--pug-dark);
  font-size: calc(20 / 16 * 1rem);
  text-align: left !important;
  text-wrap: wrap;
`;

const FavoriteButtonArea = styled.div`
  height: 64px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  bottom: 0;
`;

export default DogCard;

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Dog } from "../globalTypes";
import { useDogsStore } from "../stores/dogs";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PetsIcon from "@mui/icons-material/Pets";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const DogCard = ({ dogData }: { dogData: Dog }) => {
  const { t } = useTranslation();
  const { retrieveLocationForZipCode } = useDogsStore();

  const getLocationString = (): string => {
    const location = retrieveLocationForZipCode(dogData.zip_code);

    if (typeof location === "string") return location;
    return `${location.city}, ${location.state} ${location.zip_code}`;
  };

  return (
    <DogCardArea>
      <FlipWrapper sx={{ boxShadow: 5 }}>
        <CardFront>
          <DogImage src={dogData.img} alt={dogData.name} />
          <NameArea>
            <DogName>{dogData.name}</DogName>
          </NameArea>
        </CardFront>

        <CardBack>
          <DogNameBack>{dogData.name}</DogNameBack>

          <Divider sx={{ borderBottomWidth: 2 }} />

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
        </CardBack>
      </FlipWrapper>
    </DogCardArea>
  );
};

const DogCardArea = muiStyled(Box)`
  --size: 250px;

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

const FlipWrapper = muiStyled(Box)`
  --size: 100%;

  position: relative;
  width: var(--size);
  height: var(--size);
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 16px;
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

export default DogCard;

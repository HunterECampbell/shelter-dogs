import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useDogsStore } from "../stores/dogs";
import { useNavigate } from "react-router";
import { Dog, RouteOptions } from "../globalTypes";
import { GetDogMatchResult } from "../stores/types/apiTypes";

import Box from "@mui/material/Box";
import CustomButton from "./generalComponents/CustomButton";

const FindFavoritesDescription = () => {
  const { t } = useTranslation();
  const { api, favoriteDogs, setMatchedDog } = useDogsStore();
  const navigate = useNavigate();

  const findMyMatch = async () => {
    const favoriteDogIDs: Dog["id"][] = favoriteDogs.map((dog) => dog.id);

    const matchedDogID: GetDogMatchResult = await api.getDogMatch(
      favoriteDogIDs
    );
    const matchedDog: Dog[] = await api.getDogsFromIDs([matchedDogID.match]);

    if (matchedDog.length) {
      setMatchedDog(matchedDog[0]);
      navigate(`${RouteOptions.MatchedDog}/${matchedDog[0].id}`);
    }
  };

  return (
    <DescriptionWrapper sx={{ boxShadow: 4 }}>
      <DescriptionHeader>{t("dashboard.description.header")}</DescriptionHeader>
      <DescriptionMessage>
        {t("dashboard.description.message")}
      </DescriptionMessage>

      <ButtonArea>
        <FindMyMatchButton
          disabled={favoriteDogs.length < 2}
          label={t("dashboard.description.buttons.find_my_match")}
          onClick={findMyMatch}
        />
      </ButtonArea>
    </DescriptionWrapper>
  );
};

const DescriptionWrapper = muiStyled(Box)`
  width: 90%;
  text-align: center;
  border-radius: 16px;
  background: var(--pug-tan);
  padding: 16px;
  align-self: flex-start;
`;

const DescriptionHeader = styled.h1``;

const DescriptionMessage = styled.p`
  margin-top: 12px;
  font-size: calc(24 / 16 * 1rem);
`;

const ButtonArea = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const FindMyMatchButton = styled(CustomButton)``;

export default FindFavoritesDescription;

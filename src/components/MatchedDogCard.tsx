import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { mediaQueryBreakpoint } from "../consts/DeviceBreakpoints";
import { useDogsStore } from "../stores/dogs";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";

import Box from "@mui/material/Box";
import DogCard from "../components/DogCard";

const MatchedDogCard = () => {
  const { t } = useTranslation();
  const { matchedDog } = useDogsStore();

  const durationInMilliseconds = 1500;
  const animationEnd = Date.now() + durationInMilliseconds;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / durationInMilliseconds);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);

  return (
    <MatchDogWrapper>
      <MatchedDogArea sx={{ boxShadow: 5 }}>
        <Header>{t("match_page.header")}</Header>

        <DogCard dogData={matchedDog} hideFavoriteButton />
      </MatchedDogArea>
    </MatchDogWrapper>
  );
};

const MatchDogWrapper = styled.div`
  --header-height: calc(64 / 16 * 1rem);

  position: fixed;
  height: calc(100% - var(--header-height));
  width: 100vw;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MatchedDogArea = muiStyled(Box)`
  width: 60%;
  height: 60%;
  background: var(--pug-medium-dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  position: relative;

  @media ${mediaQueryBreakpoint.laptopAndDown} {
    height: 70%;
  }

  @media ${mediaQueryBreakpoint.phoneAndDown} {
    width: 80%;
  }
`;

const Header = styled.h1`
  color: var(--cream);
  position: absolute;
  top: 32px;
  font-size: calc(48 / 16 * 1rem);
  text-align: center;

  @media ${mediaQueryBreakpoint.tabletAndDown} {
    font-size: calc(32 / 16 * 1rem);
  }
`;

export default MatchedDogCard;

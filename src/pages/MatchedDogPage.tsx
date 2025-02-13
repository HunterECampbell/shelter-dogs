import styled from "styled-components";
import { useDogsStore } from "../stores/dogs";
import { useParams } from "react-router";
import { useEffect } from "react";

import AnimatedPugBackground from "../components/AnimatedPugBackground";
import Header from "../components/Header";
import MatchedDogCard from "../components/MatchedDogCard";
import { Dog } from "../globalTypes";

const MatchedDogPage = () => {
  const { api, setMatchedDog } = useDogsStore();
  const { dogID } = useParams();

  const getMatch = async () => {
    if (!dogID) return;

    const matchedDog: Dog[] = await api.getDogsFromIDs([dogID]);

    if (matchedDog.length) setMatchedDog(matchedDog[0]);
  };

  useEffect(() => {
    getMatch();
    // Disabling next line because I only want this called once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      <AnimatedPugBackground />

      <Header showLogoutButton />
      <MatchedDogCard />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MatchedDogPage;

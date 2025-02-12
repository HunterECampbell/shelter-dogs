import styled from "styled-components";
import { useDogsStore } from "../stores/dogs";
import { useParams } from "react-router";
import { useCallback, useEffect } from "react";

import AnimatedPugBackground from "../components/AnimatedPugBackground";
import Header from "../components/Header";
import MatchedDogCard from "../components/MatchedDogCard";
import { Dog } from "../globalTypes";

const MatchedDogPage = () => {
  const { api, setMatchedDog } = useDogsStore();
  const { dogID } = useParams();

  const getMatch = useCallback(async () => {
    if (!dogID) return;

    const matchedDog: Dog[] = await api.getDogsFromIDs([dogID]);

    if (matchedDog.length) setMatchedDog(matchedDog[0]);

    // This function is used outside of the useEffect and must be run only once in useEffect. Disabling next line for that reason.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMatch();
  }, [getMatch]);

  return (
    <MainWrapper>
      <AnimatedPugBackground />

      <Header showLogoutButton={true} />
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

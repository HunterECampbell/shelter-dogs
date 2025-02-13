import styled from "styled-components";

import AnimatedPugBackground from "../components/AnimatedPugBackground";
import Header from "../components/Header";
import LoginCard from "../components/LoginCard";

const LoginPage = () => {
  return (
    <MainWrapper>
      <AnimatedPugBackground />

      <Header />
      <LoginCard />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default LoginPage;

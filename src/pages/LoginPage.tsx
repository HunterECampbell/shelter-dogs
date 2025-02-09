import styled from "styled-components";

import PugBackground from "../components/PugBackground";
import Header from "../components/Header";
import LoginCard from "../components/LoginCard";

const LoginPage = () => {
  return (
    <MainWrapper>
      <PugBackground />

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

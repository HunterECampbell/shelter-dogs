import styled from "styled-components";

import Header from "../components/Header";

const AvailableDogsPage = () => {
  return (
    <MainWrapper>
      <Header showLogoutButton={true} />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default AvailableDogsPage;

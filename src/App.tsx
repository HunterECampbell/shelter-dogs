import styled from "styled-components";

import PugBackground from "./components/PugBackground";
import Header from "./components/Header";

const App = () => {
  return (
    <MainWrapper>
      <PugBackground />

      <Header />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;

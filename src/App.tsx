import styled from "styled-components";

import PugBackground from "./components/PugBackground";

function App() {
  return (
    <MainWrapper>
      <PugBackground />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;

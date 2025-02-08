import styled from "styled-components";

import PugBackground from "./components/PugBackground";
import Header from "./components/Header";
// import Card from "./components/generalComponents/Card";

const App = () => {
  return (
    <MainWrapper>
      <PugBackground />

      <Header />
      {/* <Card>
        <p>This is a test.</p>
      </Card> */}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;

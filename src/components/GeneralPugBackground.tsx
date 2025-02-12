import styled from "styled-components";

import PugIcon from "../assets/pug-icon.svg?react";

const GeneralPugBackground = () => {
  return (
    <Background>
      <LeftPugHead />
      <RightPugHead />

      <SmallTopRightPugHead />
      <SmallMiddlePugHead />
      <SmallBottomLeftPugHead />
    </Background>
  );
};

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  z-index: -1;
  background: var(--cream);
`;

const InitialPugHead = styled(PugIcon)`
  position: absolute;
  opacity: 0.75;
`;

const PugHead = styled(InitialPugHead)`
  width: 25%;
`;

const SmallPugHead = styled(InitialPugHead)`
  width: 15%;
`;

const LeftPugHead = styled(PugHead)`
  top: 15%;
  left: 5%;
  transform: rotate(-30deg);
`;

const RightPugHead = styled(PugHead)`
  top: 65%;
  right: 5%;
  transform: rotate(30deg);
`;

const SmallTopRightPugHead = styled(SmallPugHead)`
  top: 15%;
  right: 15%;
  transform: rotate(10deg);
`;

const SmallMiddlePugHead = styled(SmallPugHead)`
  top: 45%;
  left: 45%;
  transform: rotate(-5deg);
`;

const SmallBottomLeftPugHead = styled(SmallPugHead)`
  top: 75%;
  left: 15%;
  transform: rotate(-15deg);
`;

export default GeneralPugBackground;

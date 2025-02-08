import styled from "styled-components";

import AnimatedPugHead from "./AnimatedPugHead";

function PugBackground() {
  const viewportSize: number = window.innerHeight + window.innerWidth;
  const numberOfPugs: number = Math.floor(viewportSize / 200);

  const animatedPugHeads = Array.from({ length: numberOfPugs }).map(
    (_, index) => <AnimatedPugHead key={`pug-head-${index}`} />
  );

  return <Background>{animatedPugHeads}</Background>;
}

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export default PugBackground;

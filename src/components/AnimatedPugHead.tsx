import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import {
  chooseRandomFloatBetween,
  chooseRandomIntegerBetween,
} from "../utilities/RNG";

import PugIcon from "../assets/pug-icon.svg?react";

interface Position {
  x: number;
  y: number;
}
interface WindowSize {
  height: number;
  width: number;
}

const SVG_WIDTH = 125;

const chooseAnimationDurationInMilliseconds = (): number => {
  const randomDuration: number = chooseRandomFloatBetween({ min: 1, max: 7 });

  return randomDuration * 1000;
};
const choosePosition = (windowSize: WindowSize): Position => ({
  x: chooseRandomIntegerBetween({
    min: 0,
    max: windowSize.width - SVG_WIDTH / 1.75,
  }),
  y: chooseRandomIntegerBetween({
    min: 0,
    max: windowSize.height - SVG_WIDTH / 1.75,
  }),
});
const chooseStartingRotation = (): number => {
  const rotations: Record<number, number> = {
    0: 45,
    1: -45,
  };

  const randomRotation: number = chooseRandomIntegerBetween({ min: 0, max: 1 });

  return rotations[randomRotation];
};

const pugAnimation = ($startingRotation: number) => {
  const endingRotation: number = $startingRotation > 0 ? -30 : 30;

  return keyframes`
  0% {
    opacity: 0;
    transform: rotate(${$startingRotation}deg) scale(0.75);
  }
  25% {
    opacity: 0.6;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: rotate(${endingRotation}deg) scale(0.9);
  }
`;
};

const AnimatedPugHead = () => {
  const animationDurationInMilliseconds: number = 7500;

  const [animationDelayInMilliseconds] = useState<number>(
    chooseAnimationDurationInMilliseconds()
  );
  const [togglePositionUpdate, setTogglePositionUpdate] =
    useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: window.innerHeight - SVG_WIDTH / 1.75,
    width: window.innerWidth - SVG_WIDTH / 1.75,
  });
  const [position, setPosition] = useState<Position>(
    choosePosition(windowSize)
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setPosition(choosePosition(windowSize));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  useEffect(() => {
    setTimeout(() => {
      setPosition(choosePosition(windowSize));
      setTogglePositionUpdate(!togglePositionUpdate);
    }, animationDelayInMilliseconds + animationDurationInMilliseconds);
  }, [
    animationDelayInMilliseconds,
    animationDurationInMilliseconds,
    togglePositionUpdate,
    windowSize,
  ]);

  return (
    <AnimatedIcon
      key={`render-toggle-${togglePositionUpdate}`}
      $animationDelayInMilliseconds={animationDelayInMilliseconds}
      $animationDurationInMilliseconds={animationDurationInMilliseconds}
      $position={position}
      $startingRotation={chooseStartingRotation()}
    />
  );
};

const AnimatedIcon = styled(PugIcon)<{
  $animationDelayInMilliseconds: number;
  $animationDurationInMilliseconds: number;
  $startingRotation: number;
  $position: Position;
}>`
  width: ${SVG_WIDTH}px;
  opacity: 0;
  animation: ${(props) => pugAnimation(props.$startingRotation)}
    ${(props) => props.$animationDurationInMilliseconds}ms linear;
  animation-delay: ${(props) => props.$animationDelayInMilliseconds}ms;
  position: absolute;
  top: ${(props) => props.$position.y}px;
  left: ${(props) => props.$position.x}px;
`;

export default AnimatedPugHead;

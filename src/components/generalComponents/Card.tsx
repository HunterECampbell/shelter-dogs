import React from "react";
import styled from "styled-components";
import { Size } from "../../globalTypes";

interface Props {
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  return <CardWrapper>{children}</CardWrapper>;
};

const CardWrapper = styled.div<{ $height?: Size; $width?: Size }>`
  height: ${(props) => props.$height || "fit-content"};
  width: ${(props) => props.$width || "fit-content"};
  background: var(--pug-tan);
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 16px;
`;

export default Card;

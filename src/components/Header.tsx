import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import PugIcon from "../assets/pug-icon.svg?react";

const Header = () => {
  return (
    <HeaderWrapper>
      <IconWrapper>
        <Icon />
      </IconWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = muiStyled(AppBar)`
  background: var(--pug-tan);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
`;

const IconWrapper = styled.div`
  --size: calc(48 / 16 * 1rem);

  height: var(--size);
  width: var(--size);
  background: var(--cream);
  padding: calc(4 / 16 * 1rem);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(PugIcon)`
  width: 90%;
`;

export default Header;

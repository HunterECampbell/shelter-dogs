import styled from "styled-components";

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

const HeaderWrapper = styled.div`
  height: calc(64 / 16 * 1rem);
  width: 100vw;
  background: var(--pug-tan);
  position: fixed;
  top: 0;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08), 0 4px 8px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  --size: calc(48 / 16 * 1rem);

  height: var(--size);
  width: var(--size);
  background: white;
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

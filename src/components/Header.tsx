import { useState } from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../stores/auth";
import { RouteOptions } from "../globalTypes";
import { useNavigate } from "react-router";

import AppBar from "@mui/material/AppBar";
import CustomButton from "./generalComponents/CustomButton";
import PugIcon from "../assets/pug-icon.svg?react";

const Header = ({ showLogoutButton }: { showLogoutButton?: boolean }) => {
  const { t } = useTranslation();
  const { api } = useAuthStore();
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    try {
      await api.logout();
      navigate(RouteOptions.Login, { replace: true });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <HeaderWrapper>
      {showLogoutButton && (
        <ButtonWrapper>
          <CustomButton
            label={t("login.buttons.logout")}
            loading={loggingOut}
            onClick={logout}
          />
        </ButtonWrapper>
      )}

      <CenterArea>
        <IconWrapper>
          <Icon />
        </IconWrapper>
      </CenterArea>
    </HeaderWrapper>
  );
};

const HeaderWrapper = muiStyled(AppBar)`
  background: var(--pug-tan);
  display: flex;
  align-items: center;
  padding: 8px 0;
  height: calc(64 / 16 * 1rem);
`;

const CenterArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ButtonWrapper = styled.div`
  align-self: flex-start;
  margin-left: 16px;
`;

export default Header;

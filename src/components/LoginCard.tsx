import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { mediaQueryBreakpoint } from "../consts/DeviceBreakpoints";
import { isValidEmail } from "../utils/regex/emailRegex";
import { useAuthStore } from "../stores/auth";
import { Email } from "../globalTypes";

import Card from "@mui/material/Card";
import CustomButton from "./generalComponents/CustomButton";
import TextField from "@mui/material/TextField";

const LoginCard = () => {
  const { t } = useTranslation();
  const { api } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState<Email | "">("");
  const [emailError, setEmailError] = useState(false);
  const [emailInputHasBlurred, setEmailInputHasBlurred] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const login = async () => {
    setLoggingIn(true);
    try {
      await api.login({ name, email: email as Email });
    } finally {
      setLoggingIn(false);
    }
  };
  const handleSetName = (event: ChangeEvent<HTMLInputElement>) =>
    setName((event.target.value as Email) || "");
  const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail((event.target.value as Email) || "");
  };
  const handelSetBlur = () => setEmailInputHasBlurred(true);

  useEffect(() => {
    setEmailError(email !== "" && !isValidEmail(email));
  }, [email]);

  return (
    <LoginWrapper>
      <CardWrapper sx={{ boxShadow: 4 }}>
        <CardHeader>{t("login.header")}</CardHeader>

        <CardMessage>{t("login.message")}</CardMessage>

        <InputArea>
          <TextField
            color="secondary"
            fullWidth={true}
            label={t("login.inputs.name")}
            variant="outlined"
            onChange={handleSetName}
          />
          <TextField
            color="secondary"
            error={emailError && emailInputHasBlurred}
            fullWidth={true}
            helperText={
              emailError && emailInputHasBlurred ? t("login.errors.email") : ""
            }
            label={t("login.inputs.email")}
            margin="normal"
            variant="outlined"
            onBlur={handelSetBlur}
            onChange={handleSetEmail}
          />
        </InputArea>

        <CardFooter>
          <CustomButton
            disabled={name === "" || email === "" || emailError}
            label={t("login.buttons.login")}
            loading={loggingIn}
            onClick={login}
          />
        </CardFooter>
      </CardWrapper>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  --header-height: calc(64 / 16 * 1rem);

  position: fixed;
  height: calc(100% - var(--header-height));
  width: 100vw;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = muiStyled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.custom.pugTan,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

const CardHeader = styled.h1`
  text-align: center;
`;

const CardMessage = styled.p`
  text-align: center;
  margin: 20px 0 24px 0;
  font-size: calc(24 / 16 * 1rem);
  max-width: 60%;
`;

const InputArea = styled.div`
  width: 100%;
`;

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: calc(64 / 16 * 1rem);

  @media ${mediaQueryBreakpoint.tabletAndDown} {
    justify-content: center;
    align-items: center;
  }
`;

export default LoginCard;

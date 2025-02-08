import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { mediaQueryBreakpoint } from "../consts/DeviceBreakpoints";

import Button from "./generalComponents/Button";
import Card from "./generalComponents/Card";
import TextField from "@mui/material/TextField";
import { isValidEmail } from "../utils/regex/emailRegex";

const LoginCard = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const login = () => {
    console.log("login", name, email);
  };
  const handleSetName = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value || "");
  const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value || "");
  };

  useEffect(() => {
    setEmailError(email !== "" && !isValidEmail(email));
  }, [email]);

  return (
    <LoginWrapper>
      <CardWrapper>
        <CardHeader>{t("login.header")}</CardHeader>

        <CardMessage>{t("login.message")}</CardMessage>

        <InputArea>
          <TextField
            fullWidth={true}
            label={t("login.inputs.name")}
            variant="outlined"
            onChange={handleSetName}
          />
          <TextField
            error={emailError}
            fullWidth={true}
            helperText={emailError ? t("login.errors.email") : ""}
            label={t("login.inputs.email")}
            margin="normal"
            variant="outlined"
            onChange={handleSetEmail}
          />
        </InputArea>

        <CardFooter>
          <Button
            disabled={name === "" || email === "" || emailError}
            label={t("login.buttons.login")}
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

const CardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

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

import styled from "styled-components";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return <Test>{t("test")}</Test>;
}

const Test = styled.p`
  color: red;
`;

export default App;

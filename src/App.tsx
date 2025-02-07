import styled from "styled-components";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useBearStore } from "./stores/bears";

function App() {
  const { t } = useTranslation();

  const { bears, getPlanets, planets } = useBearStore();

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return (
    <>
      <Test>{t("test")}</Test>
      <Test>{bears}</Test>
      <Test>{JSON.stringify(planets)}</Test>
    </>
  );
}

const Test = styled.p`
  color: red;
`;

export default App;

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useBearStore } from "./stores/test";

function App() {
  const { t } = useTranslation();

  const bears = useBearStore((state): number => state.bears);

  return (
    <>
      <Test>{t("test")}</Test>
      <Test>{bears}</Test>
    </>
  );
}

const Test = styled.p`
  color: red;
`;

export default App;

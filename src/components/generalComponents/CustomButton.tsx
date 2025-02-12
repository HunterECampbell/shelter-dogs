import { styled as muiStyled } from "@mui/material/styles";
import { mediaQueryBreakpoint } from "../../consts/DeviceBreakpoints";

import Button from "@mui/material/Button";

const CustomButton = ({
  className,
  disabled,
  label,
  loading,
  onClick,
}: {
  className?: string;
  disabled?: boolean;
  label?: string;
  loading?: boolean;
  onClick: () => void;
}) => {
  return (
    <ButtonWrapper
      aria-label={label}
      className={className}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {label}
    </ButtonWrapper>
  );
};

const ButtonWrapper = muiStyled(Button)`
  --size: fit-content;

  width: var(--size);
  height: var(--size);
  color: white;
  padding: 8px 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  background: var(--pug-medium-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled) {
    border-bottom: solid 6px var(--pug-nearly-dark);
  }

  &:hover:active {
    border-bottom-width: 3px !important;
  }

  @media ${mediaQueryBreakpoint.tabletAndUp} {
    &:hover:not(:disabled) {
      border-bottom-width: 5px;
    }
  }

  @media ${mediaQueryBreakpoint.tabletAndDown} {
    border-bottom-width: calc(6 / 16 * 1rem);
  }
`;

export default CustomButton;

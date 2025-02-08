import styled from "styled-components";
import { mediaQueryBreakpoint } from "../../consts/DeviceBreakpoints";

const Button = ({
  className,
  disabled,
  label,
  onClick,
}: {
  className?: string;
  disabled?: boolean;
  label?: string;
  onClick: () => void;
}) => {
  return (
    <ButtonWrapper
      aria-label={label}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <p>{label}</p>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  --size: fit-content;

  width: var(--size);
  height: var(--size);
  color: white;
  font-size: calc(20 / 16 * 1rem);
  padding: 8px 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  background: var(--pug-medium-dark);
  display: flex;
  justify-content: center;
  align-items: center;

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

export default Button;

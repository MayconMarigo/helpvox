import { Container, ToogleContainer, ToogleSwitch } from "./Toogle.styles";

export default function F({
  htmlLabel,
  required = true,
  fullWidth,
  active,
  onClick,
  disabled = false,
  colorScheme,
  ...props
}) {
  const handleClick = () => {
    if (disabled) return;

    onClick();
  };
  return (
    <Container fullWidth={fullWidth} onClick={handleClick} {...props}>
      <label htmlFor={htmlLabel}>{`${htmlLabel ?? ""}${
        required ? " *" : ""
      }`}</label>

      <ToogleContainer
        active={active === "1" ? true : false}
        disabled={disabled}
      >
        <ToogleSwitch
          active={active === "1" ? true : false}
          disabled={disabled}
          colorScheme={colorScheme}
        />
      </ToogleContainer>
    </Container>
  );
}

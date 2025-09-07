import { useUser } from "contexts/User/User";
import { Container, SelectContainer } from "./Dropdown.styles";

export default function Dropdown({
  htmlLabel,
  fullWidth,
  onChange,
  value = 3,
  disabled,
  content,
  ...props
}) {
  const { user } = useUser();

  const contentADM = [
    {
      value: "2",
      text: "Empresa",
    },
    {
      value: "3",
      text: "Intérprete",
    },
  ];

  const contentENT = [
    {
      value: "4",
      text: "Funcionário",
    },
  ];

  const dropdownContentByUserType =
    user.type == "company" ? contentENT : contentADM;

  const options = content ?? dropdownContentByUserType;

  return (
    <Container fullWidth={fullWidth} {...props}>
      <label htmlFor={htmlLabel}>{htmlLabel}</label>
      <SelectContainer
        disabled={disabled}
        value={value || null}
        onChange={(e) => onChange(e.target.value)}
        colorScheme={user.colorScheme}
      >
        {options.map((option) => (
          <option value={option.value}>{option.text}</option>
        ))}
      </SelectContainer>
    </Container>
  );
}

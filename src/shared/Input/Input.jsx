import PasswordInvisible from "assets/svgs/PasswordInvisible";
import PasswordVisible from "assets/svgs/PasswordVisible";
import { useState } from "react";
import { IconContainer, InputContainer } from "./Input.styles";
import { useUser } from "contexts/User/User";

export default function StyledInput({
  htmlLabel,
  placeHolder,
  required = true,
  type,
  fullWidth,
  value,
  setValue,
  disabled,
  mask,
  ...props
}) {
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useUser();

  const handleOnblur = (event) => {
    if (!event.target.value)
      return setError(`O campo ${htmlLabel} precisa ser preenchido.`);

    setError("");
  };

  const handleChange = (event) => {
    if (event.target.value || value) setError("");
    setValue(event.target.value);
  };

  const handleVisibility = () => {
    setIsVisible((previous) => !previous);
  };

  return (
    <InputContainer
      error={error}
      disabled={disabled}
      required={required}
      fullWidth={fullWidth}
      {...props}
      colorScheme={user?.colorScheme}
    >
      <label htmlFor={htmlLabel}>{`${htmlLabel}${required ? " *" : ""}`}</label>
      <IconContainer>
        <input
          disabled={disabled}
          onBlur={handleOnblur}
          id={htmlLabel}
          placeholder={placeHolder}
          value={value}
          onChange={handleChange}
          required={required}
          type={isVisible ? "text" : type}
          pattern={mask}
          {...props}
        />
        {type === "password" &&
          (!isVisible ? (
            <PasswordInvisible onClick={handleVisibility} />
          ) : (
            <PasswordVisible onClick={handleVisibility} />
          ))}
      </IconContainer>
      {required && error && <span>{error}</span>}
    </InputContainer>
  );
}

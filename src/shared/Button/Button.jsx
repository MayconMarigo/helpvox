import { useUser } from "contexts/User/User";
import { SyncLoader } from "react-spinners";
import { CustomButton } from "./Button.styles";

export default function StyledButton({
  type = "button",
  text,
  loading = false,
  disabled = false,
  Component,
  ...props
}) {
  const { user } = useUser();

  return (
    <CustomButton
      type={type}
      disabled={loading || disabled}
      colorScheme={user?.colorScheme}
      {...props}
    >
      {loading ? <SyncLoader size={10} color="#fff" /> : text}
      {Component && <Component />}
    </CustomButton>
  );
}

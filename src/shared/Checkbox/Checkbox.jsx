import CheckMark from "../../assets/imgs/checkmark.png";
import { Container } from "./Checkbox.styles";

export default function Checkbox({ checked, setChecked }) {
  const handleClick = () => setChecked(checked);

  return (
    <Container onClick={handleClick}>
      {checked && <img src={CheckMark.src} />}
    </Container>
  );
}

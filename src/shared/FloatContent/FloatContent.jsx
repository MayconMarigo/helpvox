import { Container } from "./FloatContent.styles";

export default function FloatContent({ children, isOpen }) {
  return isOpen && <Container isOpen={isOpen}>{children}</Container>;
}

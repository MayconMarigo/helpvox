import { Container } from "./Badge.styles";

export default function Badge({ name }) {
  const formatName = (name) => {
    const nameArray = name.split(" ");
    const firstLetter = nameArray[0][0]?.toUpperCase();
    const secondLetter = nameArray[1]
      ? nameArray[1][0]?.toUpperCase()
      : nameArray[0][1]?.toUpperCase();
    const initials = `${firstLetter}${secondLetter}`;

    return initials;
  };

  return <Container>{formatName(name)}</Container>;
}

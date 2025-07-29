import ArrowUp from "assets/svgs/ArrowUp";
import { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionDetails,
  AccordionSummary,
  SummaryArrow,
  SummaryContainer,
  SummaryLeftContent,
} from "./Accordion.styles";

export default function Accordion({ title, icon, children, colorScheme }) {
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () => setIsOpened((previous) => !previous);

  return (
    <>
      <AccordionDetails onClick={handleOpen}>
        <AccordionSummary colorScheme={colorScheme}>
          <SummaryContainer>
            <SummaryLeftContent>
              {icon}
              <span>{title}</span>
            </SummaryLeftContent>
            <SummaryArrow open={isOpened} colorScheme={colorScheme}>
              <ArrowUp />
            </SummaryArrow>
          </SummaryContainer>
        </AccordionSummary>
      </AccordionDetails>
      <AccordionContent open={isOpened}>{children}</AccordionContent>
    </>
  );
}

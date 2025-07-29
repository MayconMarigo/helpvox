import { useAlert } from "contexts/Alert/Alert";
import { AlertContainer } from "./AlertDialog.styles";
import { useEffect } from "react";
import { ALERT_DIALOG_CLEANUP_TIMER } from "utils/constants";

export default function AlertDialog({ content, isOpen, colorScheme }) {
  const { setContent } = useAlert();

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setContent({ ...content, isOpen: false });
    }, ALERT_DIALOG_CLEANUP_TIMER);

    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <AlertContainer
      bg={colorScheme?.background}
      textColor={colorScheme?.text}
      isOpen={isOpen}
    >
      {`${colorScheme?.icon} ${content?.message}`}
    </AlertContainer>
  );
}

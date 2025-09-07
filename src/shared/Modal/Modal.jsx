import React from "react";
import {
  CloseIconContainer,
  ModalBackground,
  ModalContainer,
} from "./Modal.styles";

export default function Modal({
  children,
  title,
  handleSubmit,
  handleCloseIconClick,
  fullWidth = true,
  inverseCloseButton = false,
  ...props
}) {
  return (
    <ModalBackground>
      <ModalContainer onSubmit={handleSubmit} fullWidth={fullWidth} {...props}>
        <h3>{title}</h3>
        {children}

        <CloseIconContainer
          inverseCloseButton={inverseCloseButton}
          onClick={handleCloseIconClick}
        >
          X
        </CloseIconContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

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
  ...props
}) {
  return (
    <ModalBackground>
      <ModalContainer onSubmit={handleSubmit} fullWidth={fullWidth}>
        <h3>{title}</h3>
        {children}

        <CloseIconContainer onClick={handleCloseIconClick}>
          X
        </CloseIconContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

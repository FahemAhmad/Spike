import * as React from "react";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./CustomModal.scss";

export default function BasicModal(
  { open, toggleOpen, header, btn, children },
  props
) {
  return (
    <Modal
      open={open}
      onClose={toggleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-container">
        <div className="modal-header">
          <p className="modal-header-heading">{header}</p>
          <AiOutlineCloseCircle
            onClick={() => toggleOpen()}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="modal-children">
          {React.cloneElement(children, { ...props })}
          <button>{btn.heading}</button>
        </div>
      </div>
    </Modal>
  );
}

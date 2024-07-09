import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const MySwal = withReactContent(Swal);

const ModalWarning = ({ show, title, text, onConfirm, onCancel }) => {
  useEffect(() => {
    if (show) {
      MySwal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm();
        } else {
          onCancel();
        }
      });
    }
  }, [show, title, text, onConfirm, onCancel]);

  return null;
};

export default ModalWarning;

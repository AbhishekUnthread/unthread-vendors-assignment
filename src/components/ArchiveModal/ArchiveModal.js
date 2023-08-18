import React from "react";
import AlertDialog from "../AlertDialog/AlertDialog";
import archiveIcon from "../../assets/images/Components/Archived.png";

function ArchiveModal(props) {
  const {
    onConfirm,
    onCancel,
    show,
    isLoading,
    message,
    title,
    products,
    archiveType,
  } = props;
  return (
    <AlertDialog
      onConfirm={onConfirm}
      onCancel={onCancel}
      show={show}
      title={title ? `Archive ${title} ?` : "Archive ?"}
      primaryMessage={`${products} ${
        message
          ? `in <span class='text-blue-1'>${message} ${archiveType}</span>`
          : "<span class='text-blue-1'>selected</span>"
      } will be unassigned from it. Would you like to Archive this ${title} ?`}
      confirmText="Archive"
      isLoading={isLoading}
      icon={archiveIcon}
    />
  );
}

function MultipleArchiveModal(props) {
  const { onConfirm, onCancel, show, isLoading, message, title, pronoun } =
    props;
  return (
    <AlertDialog
      onConfirm={onConfirm}
      onCancel={onCancel}
      show={show}
      title={title ? `Archive ${title} ?` : "Archive?"}
      primaryMessage={`This will Archive ${
        message
          ? ` <span class='text-blue-1'>${message}</span>`
          : "<span class='text-blue-1'>selected</span>"
      } from the dashboard. `}
      secondaryMessage={`Would you like to Archive ${pronoun} ?`}
      confirmText="Archive"
      isLoading={isLoading}
      icon={archiveIcon}
    />
  );
}

const ArchiveModalSecondary = (props) => {
  const { onConfirm, onCancel, show, isLoading, message, title } = props;

  return (
    <AlertDialog
      onConfirm={onConfirm}
      onCancel={onCancel}
      show={show}
      title={title ? `Archive ${title} ?` : "Archive ?"}
      primaryMessage={`This will archive ${
        message
          ? `the <span class='text-blue-1'>${message}</span>`
          : "<span class='text-blue-1'>selected</span>"
      } from the dashboard.`}
      confirmText="Archive"
      isLoading={isLoading}
      icon={archiveIcon}
    />
  );
};

export default ArchiveModal;
export { MultipleArchiveModal, ArchiveModalSecondary };

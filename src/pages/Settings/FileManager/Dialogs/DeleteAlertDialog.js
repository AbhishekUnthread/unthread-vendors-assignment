import AlertDialog from "../../../../components/AlertDialog/AlertDialog";
import deleteIcon from "../../../../assets/icons/newDelete.svg";

export default function DeleteAlertDialog({
  show = false,
  isLoading = false,
  title = "",
  primaryMessage = "",
  secondaryMessage = "",
  confirmText = "",
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <AlertDialog
      show={show}
      isLoading={isLoading}
      title={title}
      primaryMessage={primaryMessage}
      secondaryMessage={secondaryMessage}
      confirmText={confirmText}
      onConfirm={onConfirm}
      onCancel={onCancel}
      icon={deleteIcon}
    />
  );
}

import { MenuItem } from "@mui/material";

export default function IconMenuItem({
  icon,
  text,
  action,
  close,
  isRed = false,
}) {
  const handleClick = () => {
    action?.();
    close?.();
  };

  return (
    <MenuItem className="px-2" onClick={handleClick}>
      <img src={icon} alt="info" width={15} />
      <span className={`${isRed ? "red-menu-item " : ""}ms-2`}>{text}</span>
    </MenuItem>
  );
}

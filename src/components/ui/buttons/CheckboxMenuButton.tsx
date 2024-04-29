import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type CheckboxMenuButtonProps = {
  name: React.ReactNode;
  options: string[];
  active: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (selected: boolean, option: string) => void;
};

const isChecked = (active: string[], option: string): boolean => {
  return active.includes(option);
};

export const CheckboxMenuButton = (props: CheckboxMenuButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="filter-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {props.name}
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "filter-button",
        }}
      >
        {props.options.map((option: string) => (
          <MenuItem key={option} onClick={(e) => e.stopPropagation()}>
            <FormControlLabel
              name={option}
              control={
                <Checkbox
                  checked={isChecked(props.active, option)}
                  onChange={(e) => props.handler?.(e.target.checked, option)}
                />
              }
              label={option}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

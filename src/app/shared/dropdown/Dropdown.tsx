import { IconButton, IconButtonProps, Menu, MenuProps } from '@mui/material';
import { FC, useState } from 'react';

const Dropdown: FC<{
  IconButtonProps: IconButtonProps;
  MenuProps: MenuProps;
}> = ({ IconButtonProps, MenuProps }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton {...IconButtonProps} onClick={handleClick}>
        {IconButtonProps.children}
      </IconButton>
      <Menu
        {...MenuProps}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {MenuProps.children}
      </Menu>
    </>
  );
};

export default Dropdown;

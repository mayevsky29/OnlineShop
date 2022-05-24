import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useValue } from '../../components/context/ContextProvider';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const { dispatch } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={handleCloseUserMenu}
      onClick={handleCloseUserMenu}
    >
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Профіль
      </MenuItem>
      <MenuItem
        onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Вихід
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
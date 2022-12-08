import React from 'react';
import { Button, Box, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBarContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
}));

export type MlNavBarPropsT = {
  icon: React.ReactNode;
  text: string;
  link: string;
};

const NavBar = ({ icon, text, link }: MlNavBarPropsT) => {
  return (
    <NavBarContainer>
      <Link to={link}>
        <Button startIcon={icon} />
      </Link>
      <Typography
        lineHeight="30px"
        variant="h2"
        component="span"
        noWrap={false}
      >
        {text}
      </Typography>
    </NavBarContainer>
  );
};

export default NavBar;

import React from 'react';

import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as MenuIcon } from '../../icons/menu.svg';
import { ReactComponent as CloseIcon } from '../../icons/x.svg';
import { StyledButton } from '../TopMenu/TopMenu.styles';
import { theme } from '../../theme';

const MenuIconComponent = styled(MenuIcon)(({ theme }) => ({
  fill: `${theme.palette.gray.dark}`,
}));

const CloseIconComponent = styled(CloseIcon)(({ theme }) => ({
  fill: `${theme.palette.gray.dark}`,
}));

export type MlActivitySettingsSidebarPropsT = {
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
  isOpen: boolean;
  title: string;
  testId: string;
};

const MenuIconEl = () => <MenuIconComponent theme={theme} />;
const CloseIconEl = () => <CloseIconComponent theme={theme} />;

type ToggleButtonPropsT = {
  isOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
  testId: string;
};

const ToggleButton = ({
  isOpen,
  handleDrawerClose,
  handleDrawerOpen,
  children,
  testId,
}: React.PropsWithChildren<ToggleButtonPropsT>) => (
  <Box sx={{ display: 'flex', padding: '0px' }}>
    <StyledButton
      testid={testId}
      data-testid={testId}
      variant="text"
      label=""
      onClick={isOpen ? handleDrawerClose : handleDrawerOpen}
    >
      {children}
    </StyledButton>
  </Box>
);

type SidebarOpenViewPropsT = {
  title: string;
};

const SidebarOpenView = ({
  title,
  children,
}: React.PropsWithChildren<SidebarOpenViewPropsT>) => (
  <>
    <Box sx={{ display: 'flex' }}>
      <Typography variant="h3">{title}</Typography>
    </Box>
    {children}
  </>
);

export const ActivitySettingsSidebar = ({
  handleDrawerClose,
  handleDrawerOpen,
  isOpen,
  title,
  testId,
  children,
}: React.PropsWithChildren<MlActivitySettingsSidebarPropsT>) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: '10px',
        maxWidth: '20%',
        borderLeft: `1px solid ${theme.palette.gray.light}`,
      }}
      data-testid={testId}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px',
          marginBottom: '16px',
          paddingLeft: '10px',
        }}
      >
        {isOpen ? (
          <SidebarOpenView title={title}>
            <ToggleButton
              testId="toggle-close-button"
              isOpen={isOpen}
              handleDrawerClose={handleDrawerClose}
              handleDrawerOpen={handleDrawerOpen}
            >
              <CloseIconEl />
            </ToggleButton>
          </SidebarOpenView>
        ) : (
          <ToggleButton
            testId="toggle-open-button"
            isOpen={isOpen}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          >
            <MenuIconEl />
          </ToggleButton>
        )}
      </Box>
      {isOpen && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

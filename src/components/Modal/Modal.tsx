import React from 'react';

import { theme } from '../../theme';
import generateUuid from '../../util/uuid';

import {
  StyledModal,
  Backdrop,
  Header,
  Body,
  ActionsBottom,
  style,
} from './Modal.styles';
import { Button, IconButton, Typography, Box } from '@mui/material';
import { ReactComponent as XIcon } from '../../icons/x.svg';

export type VariantT = 'text' | 'contained' | 'outlined' | undefined;
export type ColorT =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | undefined;

export type MlModalPropsT = {
  open: boolean;
  onClose?: () => void;
  title: string;
  children?: React.ReactNode;
  actions: {
    label: string;
    variant: VariantT;
    color: ColorT;
    onClick: () => void;
  }[];
  testId?: string;
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  testId,
}: MlModalPropsT) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      data-testid={testId}
    >
      <Box sx={style}>
        <Header theme={theme}>
          <Typography sx={{ wordBreak: 'break-all' }} variant="h4">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <XIcon />
          </IconButton>
        </Header>
        <Body>{children}</Body>
        {actions && actions.length > 0 && (
          <ActionsBottom>
            {actions.map((ac, index) => (
              <Button
                key={generateUuid()}
                variant={ac.variant}
                color={ac.color}
                onClick={ac.onClick}
                data-testid={`modal-action-button-${index}`}
                sx={{ marginLeft: 2 }}
              >
                {ac.label}
              </Button>
            ))}
          </ActionsBottom>
        )}
      </Box>
    </StyledModal>
  );
};

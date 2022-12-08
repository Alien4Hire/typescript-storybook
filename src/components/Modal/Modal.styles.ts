import { styled } from '@mui/material/styles';
import ModalUnstyled from '@mui/base/ModalUnstyled';

export const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export const Header = styled('div')(({ theme }) => ({
  padding: '12px 12px 12px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.gray.light}`,
}));

export const Body = styled('div')`
  padding: 20px;
  word-break: break-word;
`;

export const ActionsBottom = styled('div')`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const style = {
  width: 400,
  bgcolor: 'background.paper',
  p: 2,
  px: 4,
  pb: 3,
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
};

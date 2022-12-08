import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  margin: '100px 40px 40px 40px',
  padding: '40px',
}));

type SpacerT = {
  size?: number;
};

export const Spacer = styled('div')<SpacerT>(({ size = 10 }) => ({
  width: '100%',
  height: `${size}px`,
}));

export const TwoColumnsDiv = styled('div')({
  display: 'flex',
});

export const ActionButtonsDiv = styled('div')({
  display: 'flex',
  justifyContent: 'right',
});

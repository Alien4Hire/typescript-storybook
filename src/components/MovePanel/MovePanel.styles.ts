import { styled, css } from '@mui/material/styles';

import { ReactComponent as AngleDoubleDown } from '../../icons/angle_double_down.svg';
import { ReactComponent as AngleDoubleUp } from '../../icons/angle_double_up.svg';
import { ReactComponent as AngleUp } from '../../icons/angle_up.svg';
import { ReactComponent as AngleDown } from '../../icons/angle_down.svg';
import { ReactComponent as Arrows } from '../../icons/arrows.svg';

import { theme } from '../../theme';

export const Div = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  button {
    margin-top: 5px;
    padding: 0px;
    width: 40px;
    min-width: 40px;
  }
`;

export const Line = styled('div')`
  border: 1px solid gray;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  left: 5px;
  width: 40px;
`;

const sharedStyle = css`
  width: 24px;
  height: 24px;
  color: ${theme.palette.background.paper};
  fill: ${theme.palette.background.paper};
  background-color: transparent;
`;

export const StyledAngleDoubleDown = styled(AngleDoubleDown)`
  ${sharedStyle}
`;

export const StyledArrows = styled(Arrows)`
  ${sharedStyle}
`;

export const StyledAngleDoubleUp = styled(AngleDoubleUp)`
  ${sharedStyle}
`;

export const StyledAngleUp = styled(AngleUp)`
  ${sharedStyle}
`;

export const StyledAngleDown = styled(AngleDown)`
  ${sharedStyle}
`;

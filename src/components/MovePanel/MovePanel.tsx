import Button from '@mui/material/Button';

import {
  Div,
  Line,
  StyledAngleDoubleDown,
  StyledAngleDoubleUp,
  StyledAngleDown,
  StyledAngleUp,
  StyledArrows,
} from './MovePanel.styles';

export type MlMovePanelPropsT = {
  disabled: boolean;
  onUp: () => void;
  onDown: () => void;
  onDoubleUp: () => void;
  onDoubleDown: () => void;
  onReorganize?: () => void;
};

const MovePanel = ({
  disabled,
  onDoubleUp,
  onUp,
  onDown,
  onDoubleDown,
  onReorganize,
}: MlMovePanelPropsT) => {
  return (
    <Div>
      <Button variant="contained">
        <StyledAngleDoubleUp onClick={onDoubleUp} />
      </Button>
      <Button variant="contained">
        <StyledAngleUp onClick={onUp} />
      </Button>
      <Button variant="contained">
        <StyledAngleDown onClick={onDown} />
      </Button>
      <Button disabled={disabled} variant="contained">
        <StyledAngleDoubleDown onClick={onDoubleDown} />
      </Button>
      <Line />
      <Button disabled={disabled} variant="contained">
        <StyledArrows onClick={onReorganize} />
      </Button>
    </Div>
  );
};

export default MovePanel;

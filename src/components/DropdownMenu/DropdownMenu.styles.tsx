import { ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ListItemTextContainer = styled(ListItemText)(
  ({ option, color }) => ({
    color: `${color} !important`,
    marginLeft: option.icon ? 0 : 36,
    paddingLeft: 16 * (option?.step || 0),
  })
);

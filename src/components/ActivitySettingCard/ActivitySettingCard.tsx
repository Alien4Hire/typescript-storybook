import React from 'react';
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from '@mui/material';
import { SwitchBaseProps } from '@mui/material/internal/SwitchBase';
import {
  InfoWrapper,
  StyledCard,
  TitleWrapper,
} from './ActivitySettingCardStyles';
import { theme } from '../../theme';

import { ReactComponent as TrashIcon } from '../../icons/altTrash.svg';

export type ActivitySettingCardT = {
  id: string;
  title: string;
  gradingPolicy: string;
  recommendedUse: string;
  visibility: string;
};

export type CardPropsT = {
  cardInfo: ActivitySettingCardT;
  checked: boolean;
  onChecked: SwitchBaseProps['onChange'];
  onDelete: (id: string) => void;
};

type RadioNativePropsT = React.InputHTMLAttributes<HTMLInputElement> & {
  'data-testid'?: string;
};
const ActivitySettingCard = ({
  cardInfo,
  checked,
  onChecked,
  onDelete,
}: CardPropsT): JSX.Element => {
  const handleDelete = () => onDelete(cardInfo.id);

  return (
    <StyledCard theme={theme}>
      <Grid container alignItems="center" padding="20px">
        <Grid item xs={5}>
          <TitleWrapper>
            <FormControlLabel
              control={
                <Radio
                  value={cardInfo.id}
                  checked={checked}
                  onChange={onChecked}
                  inputProps={
                    { 'data-testid': 'RadioButton' } as RadioNativePropsT
                  }
                />
              }
              label={<Typography variant="h3">{cardInfo.title}</Typography>}
            />
          </TitleWrapper>
        </Grid>
        <Grid item xs={2.5}>
          <InfoWrapper maxWidth="135px">
            <Typography
              sx={{
                color: theme.palette.gray.veryDark,
                lineHeight: '24px',
              }}
              variant="textBasic"
            >
              Grading Policy:
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              {cardInfo.gradingPolicy}
            </Typography>
          </InfoWrapper>
        </Grid>
        <Grid item xs={2.5}>
          <InfoWrapper>
            <Typography
              variant="textBasic"
              sx={{
                color: theme.palette.gray.veryDark,
                lineHeight: '24px',
              }}
            >
              Recommend Use:
            </Typography>
            <Typography variant="h4">{cardInfo.recommendedUse}</Typography>
          </InfoWrapper>
        </Grid>
        <Grid item xs={1.5}>
          <InfoWrapper>
            <Typography
              variant="textBasic"
              sx={{
                color: theme.palette.gray.veryDark,
                lineHeight: '24px',
              }}
            >
              Visibility:
            </Typography>
            <Typography variant="h4">{cardInfo.visibility}</Typography>
          </InfoWrapper>
        </Grid>
        <Grid item xs={0.5}>
          <Button
            startIcon={<TrashIcon />}
            data-testid="IconButton"
            onClick={handleDelete}
          />
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default ActivitySettingCard;

import React, { useState } from 'react';
import {
  Box,
  OutlinedInput,
  Button,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddActivitySettingBodyParamsT } from '../../../../app/types/activitySettings';
import RadioButtonsGroup from '../RadioButtonsGroup';

export type CreateSettingCardPropsT = {
  visible: boolean;
  setVisible: (visibility: boolean) => void;
  handleClickSave: (newActivitySetting: AddActivitySettingBodyParamsT) => void;
};

const StyledCard = styled(Card)(() => ({
  marginBottom: '25px',
  borderRadius: '5px',
}));

const StyledButton = styled(Button)(() => ({
  textTransform: 'none',
}));

type RadioOptionsT = {
  value: string;
  label: string;
};

type RecommendedUseT = 'none' | 'pre-class' | 'in-class' | 'post-class';

const CustomizedCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CustomizedOutlinedInput = styled(OutlinedInput)(() => ({
  '& .MuiInputBase-input': {
    fontSize: 16,
    padding: '10px 12px',
  },
}));

export const CreateSettingCard = ({
  visible = false,
  setVisible,
  handleClickSave,
}: CreateSettingCardPropsT) => {
  const [recommendedUse, setRecommendedUse] = useState<RecommendedUseT>('none');
  const [hiddenFromStudents, setHiddenFromStudents] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const radioOptions: Array<RadioOptionsT> = [
    { value: 'none', label: 'None' },
    { value: 'pre-class', label: 'Pre-Class' },
    { value: 'in-class', label: 'In-Class' },
    { value: 'post-class', label: 'Post-Class' },
  ];

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSaveActivitySetting = async () => {
    if (name) {
      await handleClickSave({
        name,
        studentVisibility: !hiddenFromStudents,
        recommendedUse,
      });
      setHiddenFromStudents(false);
      setRecommendedUse('none');
      setName('');
      setVisible(false);
    }
  };

  const handleCancelClick = () => {
    setHiddenFromStudents(false);
    setRecommendedUse('none');
    setName('');
    setVisible(false);
  };

  return visible ? (
    <StyledCard variant="outlined">
      <CustomizedCardContent>
        <Typography variant="h2">Name of Activity Setting</Typography>
        <Box display="flex" marginTop={1}>
          <Box flexGrow={2} paddingRight={3}>
            <CustomizedOutlinedInput
              fullWidth
              inputProps={{ maxLength: 50 }}
              value={name}
              onChange={handleChangeName}
            />
          </Box>
          <Box display="flex" gap="11px">
            <StyledButton variant="outlined" onClick={handleCancelClick}>
              Cancel
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={handleSaveActivitySetting}
            >
              Save Activity Setting
            </StyledButton>
          </Box>
        </Box>
        <Box display="flex" width="100%" marginTop={6}>
          <Box>
            <Typography variant="h4">Recommended Use</Typography>
            <Box minWidth="300px">
              <RadioButtonsGroup
                value={recommendedUse}
                options={radioOptions}
                onChange={(e) =>
                  setRecommendedUse(e.target.value as RecommendedUseT)
                }
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="h4">Visibility</Typography>
            <Box minWidth="300px">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hiddenFromStudents}
                    onChange={(e) => setHiddenFromStudents(e.target.checked)}
                  />
                }
                label="Hidden from students"
              />
            </Box>
          </Box>
        </Box>
      </CustomizedCardContent>
    </StyledCard>
  ) : null;
};

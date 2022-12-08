import { Box, Button, Typography } from '@mui/material';

type ActivitySettingsHeaderT = {
  onClickCancel: () => void;
  onClickSave: () => void;
  testId?: string;
};

export function ActivitySettingsHeader({
  onClickCancel,
  onClickSave,
  testId = '',
}: ActivitySettingsHeaderT) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '10px',
        paddingTop: '10px',
      }}
      data-testid={testId}
    >
      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        Activity Settings
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Button
          data-testid="cancel-activity-settings-header-btn"
          variant="outlined"
          onClick={onClickCancel}
          sx={{ textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          data-testid="save-activity-settings-header-btn"
          variant="contained"
          onClick={onClickSave}
          sx={{ marginLeft: 2, textTransform: 'none' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

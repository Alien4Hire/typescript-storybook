import { Box, Button, Radio, Typography } from '@mui/material';
import generateUuid from '../../util/uuid';
import { theme } from '../../theme';
import { ReactComponent as TrashIcon } from '../../icons/trash_hollow.svg';

type RuleContainerT = {
  rule: {
    name: string;
    recommendedUse: string;
    studentVisibility: boolean;
    templateId: string;
  };
  radioChecked: boolean;
  onChangeRadio: () => void;
  onClickDelete: () => void;
  testId?: string;
};

export function RuleContainer({
  rule,
  radioChecked,
  onChangeRadio,
  onClickDelete,
  testId,
}: RuleContainerT) {
  const valuesWithLabel = [
    {
      label: 'Recommended Use:',
      value: rule.recommendedUse,
    },
    {
      label: 'Visibility:',
      value: rule.studentVisibility ? 'Available' : 'Hidden',
    },
  ];
  const renderValueWithFloatingLabel = (label: string, value: string) => {
    return (
      <Box
        key={generateUuid()}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="textBasic"
          style={{ color: theme.palette.gray.dark, lineHeight: '24px' }}
        >
          {label}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        border: `2px solid ${theme.palette.gray.light}`,
        padding: '12px 20px',
        minHeight: '84px',
        marginBottom: '25px',
      }}
      data-testid={testId}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Radio
          checked={radioChecked}
          onChange={onChangeRadio}
          value="a"
          name="radio-button-example"
          inputProps={{ 'aria-label': 'A' }}
        />
        <Typography variant="h3">{rule.name}</Typography>
      </Box>
      {valuesWithLabel.map((vwl) =>
        renderValueWithFloatingLabel(vwl.label, vwl.value)
      )}
      <Button onClick={() => onClickDelete()}>
        <TrashIcon />
      </Button>
    </Box>
  );
}

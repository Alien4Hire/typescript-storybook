import { ChangeEventHandler, KeyboardEvent, useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import { ReactComponent as Search } from '../../icons/search.svg';
import { theme } from '../../theme';

export type MlSearchTextfieldProps = {
  placeholder: string;
  onChange: (text: string) => void;
  onRequestSearch: (text: string) => void;
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '400px',
    height: '34px',
    borderRadius: 0,
    border: `1px solid ${theme.palette.gray.dark}`,
    boxShadow: 'none',
  },
  icon: {
    fill: theme.palette.gray.dark,
  },
  iconButton: {
    width: '34px',
    height: '34px',
    p: '5px',
  },
  textField: {
    ml: 1,
    flex: 1,
  },
};

const SearchTextfield = ({
  placeholder = 'Search for a keyword',
  onChange = () => {},
  onRequestSearch = () => {},
}: MlSearchTextfieldProps) => {
  const { container, icon, iconButton, textField } = styles;
  const [text, setText] = useState('');
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    onChange(value);
    setText(value);
  };

  const preventDefaultForEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <Paper component="form" sx={container}>
      <InputBase
        sx={textField}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={text}
        data-testid="search-input"
        onKeyDown={preventDefaultForEnterKey}
      />
      <IconButton
        sx={iconButton}
        aria-label="search"
        onClick={() => onRequestSearch(text)}
      >
        <Search style={icon} />
      </IconButton>
    </Paper>
  );
};

export default SearchTextfield;

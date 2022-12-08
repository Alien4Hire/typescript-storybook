import React from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';

import {
  Container,
  Section,
  StyledAccordion,
  StyledButton,
  StyledInput,
  SearchBox,
} from './LeftSideNavigation.styles';
import RadioButtonsGroup from '../RadioButtonsGroup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Close, Search } from '@mui/icons-material';
import { theme } from '../../theme';

export type SectionNavT = SectionNavInputT | SectionNavSelectT;

export type SectionNavInputT = {
  searchKey: string;
  type: string;
  title: string;
  placeholder?: string;
  selectedValue: string;
};

export type SectionNavSelectT = {
  searchKey: string;
  type: string;
  title: string;
  options: Array<Record<'value' | 'label', string>>;
  selectedValue: string;
};

export type LeftSideNavigationPropsT = {
  title: string;
  onApply: () => void;
  sections: SectionNavT[];
  onSelect: (idx: number, value: string) => void;
  onClose?: () => void;
  keywordSearch: string;
  setKeywordSearch: (val: string) => void;
};

const LeftSideNavigation = ({
  title,
  sections,
  onApply,
  onSelect,
  onClose,
  keywordSearch,
  setKeywordSearch,
}: LeftSideNavigationPropsT) => {
  const applyHandler = () => {
    onApply();
  };

  const setInput =
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onSelect(idx, e.target.value);
    };

  const onKeywordSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordSearch(e.target.value);
  };

  return (
    <Container>
      <SearchBox>
        <Typography variant="h1" lineHeight="48px">
          {title}
        </Typography>
        {onClose && (
          <IconButton onClick={onClose}>
            <Close color="primary" />
          </IconButton>
        )}
      </SearchBox>
      <Section theme={theme}>
        <Typography mb="18px" variant="h4">
          Keyword Search
        </Typography>
        <StyledInput
          disableUnderline
          endAdornment={
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          }
          value={keywordSearch}
          fullWidth
          onChange={onKeywordSearchChange}
          placeholder={'Search by keyword...'}
          theme={theme}
        />
      </Section>

      {sections.map((section, idx) => {
        switch (section.type) {
          case 'input':
            return (
              <StyledAccordion key={idx} theme={theme}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="primary" />}
                >
                  <Typography variant="h4">{section.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <StyledInput
                    disableUnderline
                    endAdornment={
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    }
                    value={section.selectedValue}
                    fullWidth
                    onChange={setInput(idx)}
                    placeholder={(section as SectionNavInputT).placeholder}
                    theme={theme}
                  />
                </AccordionDetails>
              </StyledAccordion>
            );
          case 'select':
            return (
              <StyledAccordion key={idx} theme={theme}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="primary" />}
                >
                  <Typography variant="h4">{section.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <RadioButtonsGroup
                    value={section.selectedValue}
                    options={(section as SectionNavSelectT).options}
                    onChange={setInput(idx)}
                  />
                </AccordionDetails>
              </StyledAccordion>
            );
          default:
            return null;
        }
      })}

      <StyledButton
        label="Apply"
        color="primary"
        variant="contained"
        onClick={applyHandler}
      >
        Apply
      </StyledButton>
    </Container>
  );
};

export default LeftSideNavigation;

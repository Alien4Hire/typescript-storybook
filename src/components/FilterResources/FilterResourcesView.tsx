import React from 'react';

import { Typography } from '@mui/material';

import { theme } from '../../theme';
import LeftSideNavigation, {
  SectionNavT,
} from '../LeftSideNavigation/LeftSideNavigation';
import ResultList from '../ResultList';
import {
  Container,
  LeftSideNavigationContainer,
  ResultContainer,
  ResultListContainer,
  Section,
} from './FilterResources.styles';
import { useAppSelector } from '../../app/hooks';
import { getSearchResults } from '../../app/reducers/search/searchSlice';
import NoResult from '../NoResult';

export type FilterResourcesViewT = {
  sections: SectionNavT[];
  onSelectHandle: (idx: number, value: string) => void;
  closeHandler: () => void;
  keywordSearch: string;
  keywordSearchHandler: (val: string) => void;
  searchHandle: () => void;
};

const FilterResourcesView = ({
  sections,
  onSelectHandle,
  closeHandler,
  keywordSearch,
  keywordSearchHandler,
  searchHandle,
}: FilterResourcesViewT) => {
  const { resultList } = useAppSelector(getSearchResults);

  return (
    <Container>
      <LeftSideNavigationContainer>
        <LeftSideNavigation
          title="Resource Structure"
          sections={sections}
          onSelect={onSelectHandle}
          onClose={closeHandler}
          keywordSearch={keywordSearch}
          setKeywordSearch={keywordSearchHandler}
          onApply={searchHandle}
        />
      </LeftSideNavigationContainer>
      <ResultContainer>
        <Section theme={theme}>
          <Typography
            fontStyle="italic"
            lineHeight="24px"
            padding="22px"
            variant="textBasic"
          >
            ResultListToolBar
          </Typography>
        </Section>
        {resultList.length ? (
          <ResultListContainer theme={theme}>
            <ResultList result={resultList} />
          </ResultListContainer>
        ) : (
          <NoResult />
        )}
      </ResultContainer>
    </Container>
  );
};

export default FilterResourcesView;

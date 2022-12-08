import AddIcon from '@mui/icons-material/Add';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setToastNotification } from '../../../app/reducers/appSlice/appSlice';
import { addMultipleFolderItems as actionAddMultipleFolderItems } from '../../../app/reducers/lessons/lessonsSlice';
import {
  ActivitiesQueryParam,
  useGetSearchResultsQuery,
} from '../../../app/reducers/search/searchAPI';
import {
  addSelectedResourcesToLibrary,
  getSearchResults,
  getSelectedResults,
  setResultList,
} from '../../../app/reducers/search/searchSlice';
import { useGetTemplateQuery } from '../../../app/reducers/templates/templateAPI';
import { setTemplate } from '../../../app/reducers/templates/templateSlice';
import { theme } from '../../../theme';
import { FolderT } from '../../../util/folderTree';
import FolderDropdown from '../../FolderDropdown/FolderDropdown';
import LeftSideNavigation, {
  SectionNavT,
} from '../../LeftSideNavigation/LeftSideNavigation';
import NoResult from '../../NoResult';
import { generateId } from '../../RecursiveTreeView/utils';
import ResultList from '../../ResultList';
import { sampleSections } from './sampleSections';
import {
  ActionButton,
  ButtonContainer,
  Container,
  LeftSideNavigationContainer,
  Menu,
  ResultContainer,
  ResultListContainer,
  Section,
} from './SearchPage.styles';
import { MlDropdownMenuOptionPropsT } from '../../DropdownMenu/DropdownMenu';

const SearchPage = () => {
  const { templateId, templateVersionId } = useParams();
  const { data } = useGetTemplateQuery({ templateId, templateVersionId });

  const dispatch = useAppDispatch();
  const { resultList: result } = useAppSelector(getSearchResults);
  const selectedResults = useAppSelector(getSelectedResults);
  const [sections, setSections] = useState<SectionNavT[]>(sampleSections);
  const [keywordSearch, setKeywordSearch] = useState<string>('');
  const [skip, setSkip] = useState<boolean>(true);
  const [query, setQuery] = useState<ActivitiesQueryParam>({
    searchString: '',
  });

  useEffect(() => {
    if (data) {
      dispatch(setTemplate(data));
    }
  }, [dispatch, data]);

  const onSelectHandle = (idx: number, value: string) => {
    setSections((prev) => [
      ...prev.slice(0, idx),
      { ...prev[idx], selectedValue: value },
      ...prev.slice(idx + 1),
    ]);
  };

  const searchHandle = () => {
    let searchQuery: ActivitiesQueryParam = {
      searchString: keywordSearch,
      from: 0,
      size: 50,
    };

    for (let index = 0; index < sections.length; index++) {
      const section: SectionNavT = sections[index];
      if (section.selectedValue) {
        searchQuery = {
          ...searchQuery,
          [section.searchKey]: section.selectedValue,
        };
      }
    }
    setSkip(false);
    setQuery(searchQuery);
  };

  const { data: results } = useGetSearchResultsQuery(query, {
    skip,
  });

  useEffect(() => {
    dispatch(setResultList(results || []));
  }, [dispatch, results]);

  const keywordSearchHandler = (val: string) => {
    setKeywordSearch(val);
  };

  const handleAddResources = (folder: MlDropdownMenuOptionPropsT) => {
    dispatch(addSelectedResourcesToLibrary());
    const files = [] as Omit<FolderT, 'children'>[];
    selectedResults.forEach((res) => {
      files.push({
        id: generateId(),
        name: res.activityName,
        type: 'activity' as FolderT['type'],
        parentId: folder.value,
      });
    });
    dispatch(actionAddMultipleFolderItems(files));

    dispatch(
      setToastNotification({
        open: true,
        message: `${selectedResults.length} ${
          selectedResults.length > 1 ? 'activities' : 'activity'
        } added to "${folder.label}".`,
        type: 'success',
      })
    );
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Items = [
    {
      name: 'Add Resources',
      component: <AddIcon />,
      onClick: handleClick,
      disabled: false,
    },
  ];

  const selectedText = `${selectedResults.length} ${
    selectedResults.length > 1 ? 'resources' : 'resource'
  } selected`;

  return (
    <Container theme={theme}>
      <LeftSideNavigationContainer>
        <LeftSideNavigation
          title="Search Content"
          sections={sections}
          onSelect={onSelectHandle}
          keywordSearch={keywordSearch}
          setKeywordSearch={keywordSearchHandler}
          onApply={searchHandle}
        />
      </LeftSideNavigationContainer>
      <ResultContainer>
        <Section theme={theme}>
          {selectedResults.length > 0 ? (
            <Menu theme={theme}>
              <Typography
                variant="textBasic"
                sx={{ color: theme.palette.background.paper }}
              >
                {selectedText}
              </Typography>
              {Items.map((item) => (
                <ActionButton
                  key={item.name}
                  onClick={item.onClick}
                  disabled={item.disabled}
                >
                  {item.component}
                  <Typography
                    mt="3px"
                    variant="textBasic"
                    color={theme.palette.white.main}
                  >
                    {item.name}
                  </Typography>
                  <FolderDropdown
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onItemClick={handleAddResources}
                    onClose={handleClose}
                  />
                </ActionButton>
              ))}
            </Menu>
          ) : (
            <ButtonContainer>
              <Button variant="outlined">Import Content</Button>
            </ButtonContainer>
          )}
        </Section>
        {query.size ? (
          <ResultListContainer theme={theme}>
            <ResultList result={result} />
          </ResultListContainer>
        ) : (
          <NoResult />
        )}
      </ResultContainer>
    </Container>
  );
};

export default SearchPage;

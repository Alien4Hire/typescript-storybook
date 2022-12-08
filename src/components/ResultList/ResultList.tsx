import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addResourceToLibrary,
  getSearchResults,
  ResultItemT,
  setAllChecked,
  setChecked,
} from '../../app/reducers/search/searchSlice';
import { setToastNotification } from '../../app/reducers/appSlice/appSlice';
import { theme } from '../../theme';
import ResultItem from '../ResultItem/ResultItem';
import {
  Container,
  ItemsContainer,
  SelectAllContainer,
  StyledTitle,
} from './ResultList.styles';
import { Checkbox, FormControlLabel } from '@mui/material';
import { generateId } from '../RecursiveTreeView/utils';
import { addFolderItem as actionAddFolderItem } from '../../app/reducers/lessons/lessonsSlice';
import { FolderT } from '../../util/folderTree';
import { MlDropdownMenuOptionPropsT } from '../DropdownMenu/DropdownMenu';
import NoFilterResult from '../NoFilterResult';

export type ResultListPropsT = {
  result: ResultItemT[];
  itemsOnPage?: number;
};

const ResultList = ({ result, itemsOnPage = 100 }: ResultListPropsT) => {
  const dispatch = useAppDispatch();
  const { indeterminateStatus, allCheckedStatus } =
    useAppSelector(getSearchResults);
  const [currentPage] = useState<number>(1);
  const currentElements = itemsOnPage * currentPage;
  const from = currentElements - itemsOnPage;
  const to = currentElements > result.length ? result.length : currentElements;
  const title = result.length ? `Showing ${from + 1}-${to} of ${result.length} results` : 'Showing 0 of 0 results';

  const checkHandler = (id: string) => {
    dispatch(setChecked(id));
  };

  const checkAllHandler = () => {
    dispatch(setAllChecked());
  };

  const handleAddResource = (
    id: string,
    folder: MlDropdownMenuOptionPropsT
  ) => {
    const idx = result.findIndex((el) => el.contentId === id);
    dispatch(addResourceToLibrary(id));
    const file = {
      id: generateId(),
      name: result[idx].activityName,
      type: 'activity' as FolderT['type'],
      parentId: folder.value,
    };
    dispatch(actionAddFolderItem(file));
    dispatch(
      setToastNotification({
        open: true,
        message: `"${result[idx].activityName}" added to "${folder.label}".`,
        type: 'success',
      })
    );
  };

  return (
    <Container>
      <StyledTitle>{title}</StyledTitle>
      {
        result.length ? (
        <Container>
          <SelectAllContainer>
            <FormControlLabel
             control={
              <Checkbox
                value={'SelectAll'}
                checked={allCheckedStatus}
                indeterminate={indeterminateStatus}
                onChange={checkAllHandler}
              />
            }
            sx={{ margin: '0px' }}
            label="Select all"
          />
          </SelectAllContainer>
          <ItemsContainer theme={theme}>
          {result.map((el) => (
            <ResultItem
              key={el.contentId}
              checkedValue={el.checkedValue}
              checked={el.checked}
              onCheck={checkHandler}
              activityName={el.activityName}
              contentId={el.contentId}
              modifiedDate={el.modifiedDate}
              addedToLibrary={el.addedToLibrary}
              onAddResource={handleAddResource}
            />
          ))}
          </ItemsContainer>
        </Container>          
        ): (
          <NoFilterResult />
        )
      }
    </Container>
  );
};

export default ResultList;
